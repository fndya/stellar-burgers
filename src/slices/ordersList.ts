import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '../utils/burger-api';
import type { TOrder } from '../utils/types';

type TOrdersListState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TOrdersListState = {
  orders: [],
  loading: false,
  error: null
};

export const getOrdersList = createAsyncThunk(
  'ordersList/getOrdersList',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersList.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

export default ordersListSlice.reducer;
