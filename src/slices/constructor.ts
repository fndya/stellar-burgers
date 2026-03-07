import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { TConstructorIngredient, TIngredient } from '../utils/types';

export type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

type TMovePayload = { dragIndex: number; hoverIndex: number };

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (
        state,
        action: PayloadAction<TIngredient | TConstructorIngredient>
      ) => {
        const item = action.payload;

        if (item.type === 'bun') {
          state.bun = item;
        } else {
          state.ingredients.push(item as TConstructorIngredient);
        }
      },
      prepare: (item: TIngredient) => ({
        payload: item.type === 'bun' ? item : { ...item, id: uuidv4() }
      })
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    moveIngredient: (state, action: PayloadAction<TMovePayload>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragItem = state.ingredients[dragIndex];
      if (!dragItem) return;
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, dragItem);
    },
    clearAll: () => initialState
  }
});

export const { addItem, removeItem, moveIngredient, clearAll } =
  constructorSlice.actions;

export default constructorSlice.reducer;
