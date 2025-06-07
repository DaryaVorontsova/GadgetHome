import axios from 'axios';
import { API_URL } from './link';
import { store } from '../../app/store';
import type { RootState } from '../../app/store';
import type { Order, PostOrderPayload } from '../../types/types';

function getAuthToken(): string | null {
  const state: RootState = store.getState();

  return state.auth.token;
}

export const postOrder = async (payload: PostOrderPayload) => {
  const token = getAuthToken();

  const response = await axios.post(`${API_URL}/orders`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const fetchMyOrders = async () => {
  const token = getAuthToken();

  const response = await axios.get<Order[]>(`${API_URL}/my-orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
