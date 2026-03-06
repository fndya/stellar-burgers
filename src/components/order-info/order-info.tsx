import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '../../utils/types';
import { getOrderByNumberApi } from '../../utils/burger-api';

import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  const [orderData, setOrderData] = useState<TOrder | null>(null);

  useEffect(() => {
    const orderNumber = Number(number);
    if (!orderNumber || Number.isNaN(orderNumber)) return;

    let isCancelled = false;

    getOrderByNumberApi(orderNumber)
      .then((data) => {
        const order = data.orders?.[0] || null;
        if (!isCancelled) setOrderData(order);
      })
      .catch(() => {
        if (!isCancelled) setOrderData(null);
      });

    return () => {
      isCancelled = true;
    };
  }, [number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
