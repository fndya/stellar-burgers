import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при unknown action', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        loading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      user: {
        user: null,
        loading: false,
        error: null,
        isAuthChecked: false
      },
      newOrder: {
        order: null,
        loading: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      },
      ordersList: {
        orders: [],
        loading: false,
        error: null
      }
    });
  });
});

