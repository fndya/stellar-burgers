import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersList } from '../../slices/ordersList';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersList.orders);

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
