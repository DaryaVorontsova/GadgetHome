import type { RootState } from '../../app/store';

export const selectAdresses = (state: RootState) => state.adresses.items;
export const selectLoading = (state: RootState) => state.adresses.loading;
export const selectError = (state: RootState) => state.adresses.error;
