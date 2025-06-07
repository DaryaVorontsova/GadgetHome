import type { RootState } from '../../app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectGoods = (state: RootState) => state.goods.items;
export const selectLoading = (state: RootState) => state.goods.loading;
export const selectError = (state: RootState) => state.goods.error;
export const selectGoodById = createSelector(
  [selectGoods, (_: RootState, id: number) => id],
  (goods, id) => goods.find(g => g.id === id),
);
