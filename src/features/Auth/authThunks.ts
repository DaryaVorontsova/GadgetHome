import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../shared/api/auth';
import axios from 'axios';
import type {
  RegisterCredentials,
  LoginCredentials,
  RegisterResponse,
  LoginResponse,
} from '../../types/types';

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  { rejectValue: string }
>(
  'auth/register',
  async (
    { first_name, last_name, email, password }: RegisterCredentials,
    { rejectWithValue },
  ) => {
    try {
      const response = await authApi.register(
        first_name,
        last_name,
        email,
        password,
      );

      return response.data as RegisterResponse;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.detail || 'Ошибка регистрации',
        );
      }

      return rejectWithValue('Ошибка регистрации');
    }
  },
);

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (
    { email, password, rememberMe }: LoginCredentials,
    { rejectWithValue },
  ) => {
    try {
      const response = await authApi.login(email, password);

      const data: LoginResponse = response.data;

      if (rememberMe) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('username', response.data.first_name);
      } else {
        sessionStorage.setItem('token', response.data.access_token);
        sessionStorage.setItem('username', response.data.first_name);
      }

      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.detail || 'Ошибка входа');
      }

      return rejectWithValue('Ошибка входа');
    }
  },
);
