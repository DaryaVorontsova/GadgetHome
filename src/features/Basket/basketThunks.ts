import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { fetchBasketItems } from '../../shared/api/basket';
import type { BasketItem } from '../../types/types';

export const loadBasketItems = createAsyncThunk<
  BasketItem[],
  void,
  { rejectValue: string }
>('basket/load', async (_, { rejectWithValue }) => {
  try {
    const items = await fetchBasketItems();

    return items;
  } catch (err) {
    const error = err as AxiosError<{ detail?: string }>;

    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.detail || 'Ошибка при загрузке корзины',
      );
    }

    return rejectWithValue('Ошибка при загрузке корзины');
  }
});
