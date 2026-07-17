import ordersListReducer, { getOrdersList } from './ordersList';
import type { TOrder } from '../utils/types';

describe('ordersList reducer', () => {
  it('должен обрабатывать pending', () => {
    const state = ordersListReducer(
      undefined,
      getOrdersList.pending('', undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать fulfilled', () => {
    const payload: TOrder[] = [];

    const state = ordersListReducer(
      undefined,
      getOrdersList.fulfilled(payload, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(payload);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать rejected', () => {
    const state = ordersListReducer(
      undefined,
      getOrdersList.rejected(new Error('Ошибка заказов'), '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка заказов');
  });
});
