import { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: Record<string, string> = {
  cancelled: 'Отменён',
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const textStyle = status === 'done' ? '#00CCCC' : '#F2F2F3';
  return (
    <OrderStatusUI textStyle={textStyle} text={statusText[status] || ''} />
  );
};
