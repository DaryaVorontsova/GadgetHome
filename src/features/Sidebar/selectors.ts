import type { RootState } from '../../app/store';

export const selectItems = (state: RootState) => state.categories.items;
export const selectLoading = (state: RootState) => state.categories.loading;
export const selectError = (state: RootState) => state.categories.error;
