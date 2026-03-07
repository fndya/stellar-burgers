import ingredientsReducer, { getIngredientsList } from './ingredients';
import type { TIngredient } from '../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 100,
    image: 'img',
    image_mobile: 'img',
    image_large: 'img'
  }
];

describe('ingredients reducer', () => {
  it('должен обрабатывать pending', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredientsList.pending('', undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredientsList.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать rejected', () => {
    const state = ingredientsReducer(
      undefined,
      getIngredientsList.rejected(new Error('Ошибка'), '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
