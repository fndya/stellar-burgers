import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../utils/burger-api';

export type TNewOrderState = {
  loading: boolean;
  order: { number: number } | null;
  error: string | null;
};

const initialState: TNewOrderState = {
  loading: false,
  order: null,
  error: null
};

export const placeNewOrder = createAsyncThunk(
  'newOrder/placeNewOrder',
  async (ingredientIds: string[]) => await orderBurgerApi(ingredientIds)
);

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeNewOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.order = { number: action.payload.order.number };
      })
      .addCase(placeNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export const { resetOrder } = newOrderSlice.actions;
export default newOrderSlice.reducer;
