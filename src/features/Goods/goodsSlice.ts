import { createSlice } from '@reduxjs/toolkit';
import type { Good } from '../../types/types';
import { loadGoods, loadGoodsByCategory, searchGoods } from './goodsThunks';

interface GoodsState {
  items: Good[];
  loading: boolean;
  error: string | null;
}

const initialState: GoodsState = {
  items: [],
  loading: false,
  error: null,
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadGoods.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadGoods.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadGoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка';
      });

    builder
      .addCase(loadGoodsByCategory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadGoodsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadGoodsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка';
      });

    builder
      .addCase(searchGoods.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchGoods.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchGoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка поиска';
      });
  },
});

export default goodsSlice.reducer;
