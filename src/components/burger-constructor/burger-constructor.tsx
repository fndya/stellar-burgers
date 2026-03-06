import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorItems,
  selectNewOrder,
  selectNewOrderLoading,
  selectUser
} from '../../services/selectors';
import { clearAll } from '../../slices/constructor';
import { placeNewOrder, resetOrder } from '../../slices/newOrder';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectNewOrderLoading);
  const orderModalData = useSelector(selectNewOrder);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const bunId = constructorItems.bun._id;
    const fillingsIds = constructorItems.ingredients.map((i) => i._id);

    const ingredientIds = [bunId, ...fillingsIds, bunId];

    dispatch(placeNewOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearAll());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData as any}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
