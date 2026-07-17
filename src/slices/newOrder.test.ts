import newOrderReducer, { placeNewOrder, resetOrder } from './newOrder';

describe('newOrder reducer', () => {
  it('должен обрабатывать resetOrder', () => {
    const state = newOrderReducer(
      {
        loading: false,
        order: { number: 12345 },
        error: null
      },
      resetOrder()
    );

    expect(state).toEqual({
      loading: false,
      order: null,
      error: null
    });
  });

  it('должен обрабатывать pending', () => {
    const state = newOrderReducer(
      undefined,
      placeNewOrder.pending('', ['1', '2'])
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать fulfilled', () => {
    const payload = {
      success: true,
      name: 'Тестовый бургер',
      order: {
        number: 12345
      }
    };

    const state = newOrderReducer(
      undefined,
      placeNewOrder.fulfilled(payload as any, '', ['1', '2'])
    );

    expect(state.loading).toBe(false);
    expect(state.order).toEqual({ number: 12345 });
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать rejected', () => {
    const state = newOrderReducer(
      undefined,
      placeNewOrder.rejected(new Error('Ошибка создания заказа'), '', ['1', '2'])
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });
});
