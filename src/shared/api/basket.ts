import axios from 'axios';
import { API_URL } from './link';
import type { AddToBasketPayload } from '../../types/types';
import { store } from '../../app/store';
import type { RootState } from '../../app/store';

function getAuthToken(): string | null {
  const state: RootState = store.getState();

  return state.auth.token;
}

export const postCartItem = async (item: AddToBasketPayload) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error('Unauthorized: token not found');
  }

  const res = await axios.post(`${API_URL}/basket`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const fetchBasketItems = async () => {
  const token = getAuthToken();

  if (!token) {
    throw new Error('Unauthorized: token not found');
  }

  const res = await axios.get(`${API_URL}/basket`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateCartItem = async (item: AddToBasketPayload) => {
  const token = getAuthToken();
  const res = await axios.put(`${API_URL}/basket`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

export const deleteCartItem = async (payload: {
  good_id: number;
  color: string;
}) => {
  const token = getAuthToken();
  const res = await axios.delete(`${API_URL}/basket/item`, {
    headers: { Authorization: `Bearer ${token}` },
    data: payload,
  });

  return res.data;
};
