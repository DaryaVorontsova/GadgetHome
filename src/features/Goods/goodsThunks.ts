import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import axios from 'axios';
import {
  fetchGoods,
  fetchGoodsByCategory,
  fetchSearchGoogs,
} from '../../shared/api/goods';
import type { Good } from '../../types/types';

export const loadGoods = createAsyncThunk<
  Good[],
  void,
  { rejectValue: string }
>('goods/load', async (_, { rejectWithValue }) => {
  try {
    return await fetchGoods();
  } catch (err) {
    const error = err as AxiosError<{ detail?: string }>;

    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.detail || 'Ошибка загрузки товаров',
      );
    }

    return rejectWithValue('Ошибка загрузки товаров');
  }
});

export const loadGoodsByCategory = createAsyncThunk<
  Good[],
  number,
  { rejectValue: string }
>('goods/loadByCategory', async (categoryId, { rejectWithValue }) => {
  try {
    return await fetchGoodsByCategory(categoryId);
  } catch (err) {
    const error = err as AxiosError<{ detail?: string }>;

    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.detail || 'Ошибка загрузки товаров',
      );
    }

    return rejectWithValue('Ошибка загрузки товаров');
  }
});

export const searchGoods = createAsyncThunk<
  Good[],
  string,
  { rejectValue: string }
>('goods/search', async (query, { rejectWithValue }) => {
  try {
    return await fetchSearchGoogs(query);
  } catch (err) {
    const error = err as AxiosError<{ detail?: string }>;

    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.detail || 'Ошибка загрузки товаров',
      );
    }

    return rejectWithValue('Ошибка загрузки товаров');
  }
});
