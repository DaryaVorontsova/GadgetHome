import type { RootState } from '../../app/store';

export const selectBasket = (state: RootState) => state.basket.items;
export const selectLoading = (state: RootState) => state.basket.loading;
export const selectError = (state: RootState) => state.basket.error;
export const selectBasketTotalQuantity = (state: RootState) =>
  state.basket.items.reduce((sum, item) => sum + item.quantity, 0);
