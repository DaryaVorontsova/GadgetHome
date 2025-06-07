import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { fetchAddresses } from '../../shared/api/goods';
import type { Address } from '../../types/types';

export const loadAddresses = createAsyncThunk<
  Address[],
  void,
  { rejectValue: string }
>('addresses/loadAddresses', async (_, { rejectWithValue }) => {
  try {
    return await fetchAddresses();
  } catch (err) {
    const error = err as AxiosError<{ detail?: string }>;

    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.detail || 'Ошибка загрузки адресов',
      );
    }

    return rejectWithValue('Ошибка загрузки адресов');
  }
});
