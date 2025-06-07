import { createSlice } from '@reduxjs/toolkit';
import type { Address } from '../../types/types';
import { loadAddresses } from './adressesThunks';

interface AddressesState {
  items: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressesState = {
  items: [],
  loading: false,
  error: null,
};

const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadAddresses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка';
      });
  },
});

export default addressesSlice.reducer;
