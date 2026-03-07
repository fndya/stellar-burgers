import constructorReducer, {
  addItem,
  removeItem,
  clearAll,
  moveIngredient
} from './constructor';
import type { TIngredient } from '../utils/types';

const bun: TIngredient = {
  _id: 'bun-1',
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
};

const main: TIngredient = {
  _id: 'main-1',
  name: 'Котлета',
  type: 'main',
  proteins: 10,
  fat: 20,
  carbohydrates: 30,
  calories: 40,
  price: 200,
  image: 'img',
  image_mobile: 'img',
  image_large: 'img'
};

describe('constructor reducer', () => {
  it('должен добавлять булку', () => {
    const state = constructorReducer(undefined, addItem(bun));

    expect(state.bun?._id).toBe('bun-1');
    expect(state.ingredients).toEqual([]);
  });

  it('должен добавлять начинку', () => {
    const state = constructorReducer(undefined, addItem(main));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main-1');
    expect(state.ingredients[0].id).toBeDefined();
  });

  it('должен удалять начинку по id', () => {
    const stateWithItem = constructorReducer(undefined, addItem(main));
    const itemId = stateWithItem.ingredients[0].id;

    const state = constructorReducer(stateWithItem, removeItem(itemId));

    expect(state.ingredients).toHaveLength(0);
  });

  it('должен очищать конструктор', () => {
    const stateWithItems = constructorReducer(
      constructorReducer(undefined, addItem(bun)),
      addItem(main)
    );

    const state = constructorReducer(stateWithItems, clearAll());

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('должен менять порядок ингредиентов', () => {
    const first: TIngredient = {
      _id: 'main-1',
      name: 'Котлета 1',
      type: 'main',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 40,
      price: 100,
      image: 'img',
      image_mobile: 'img',
      image_large: 'img'
    };

    const second: TIngredient = {
      _id: 'main-2',
      name: 'Котлета 2',
      type: 'main',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 40,
      price: 100,
      image: 'img',
      image_mobile: 'img',
      image_large: 'img'
    };

    const state = constructorReducer(
      constructorReducer(undefined, addItem(second)),
      addItem(first)
    );

    const movedState = constructorReducer(
      state,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );

    expect(movedState.ingredients[0]._id).toBe(state.ingredients[1]._id);
    expect(movedState.ingredients[1]._id).toBe(state.ingredients[0]._id);
  });
});
