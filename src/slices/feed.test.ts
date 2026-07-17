import feedReducer, { getFeed } from './feed';
import type { TOrder } from '../utils/types';

describe('feed reducer', () => {
  it('должен обрабатывать pending', () => {
    const state = feedReducer(undefined, getFeed.pending('', undefined));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать fulfilled', () => {
    const payload = {
      success: true,
      orders: [] as TOrder[],
      total: 10,
      totalToday: 2
    };

    const state = feedReducer(
      undefined,
      getFeed.fulfilled(payload, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать rejected', () => {
    const state = feedReducer(
      undefined,
      getFeed.rejected(new Error('Ошибка ленты'), '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка ленты');
  });
});
