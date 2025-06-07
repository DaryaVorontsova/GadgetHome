import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories } from '../../shared/api/goods';

export const loadCategories = createAsyncThunk(
  'categories/load',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCategories();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.detail || 'Ошибка загрузки категорий',
        );
      }

      return rejectWithValue('Ошибка загрузки категорий');
    }
  },
);
