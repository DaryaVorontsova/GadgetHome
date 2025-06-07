import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { BasketItem } from '../../types/types';
import { loadBasketItems } from './basketThunks';

export interface BasketState {
  items: BasketItem[];
  loading: boolean;
  error: string | null;
}

const initialState: BasketState = {
  items: [],
  loading: false,
  error: null,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket(state, action: PayloadAction<BasketItem>) {
      const newItem = action.payload;
      const existing = state.items.find(
        item =>
          item.product_id === newItem.product_id &&
          item.color === newItem.color,
      );

      if (existing && existing.quantity > 1) {
        existing.quantity--;
      }
    },
    clearBasket(state) {
      state.items = [];
    },
    incrementQuantity: (
      state,
      action: PayloadAction<{ product_id: number; color: string }>,
    ) => {
      const { product_id, color } = action.payload;
      const existing = state.items.find(
        item => item.product_id === product_id && item.color === color,
      );

      if (existing) {
        existing.quantity += 1;
      }
    },
    decrementQuantity: (
      state,
      action: PayloadAction<{ product_id: number; color: string }>,
    ) => {
      const { product_id, color } = action.payload;
      const existing = state.items.find(
        item => item.product_id === product_id && item.color === color,
      );

      if (existing?.quantity) {
        if (existing.quantity >= 2) {
          existing.quantity--;
        }
      }
    },
    removeFromBasket: (
      state,
      action: PayloadAction<{ product_id: number; color: string }>,
    ) => {
      const { product_id, color } = action.payload;

      state.items = state.items.filter(
        item => !(item.product_id === product_id && item.color === color),
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadBasketItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBasketItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(loadBasketItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Не удалось загрузить корзину';
      });
  },
});

export const {
  clearBasket,
  addToBasket,
  incrementQuantity,
  decrementQuantity,
  removeFromBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
