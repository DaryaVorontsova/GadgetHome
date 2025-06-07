import axios from 'axios';
import { API_URL } from './link';
import type { UserProfile } from '../../types/types';
import type { RootState } from '../../app/store';
import store from '../../app/store';

function getAuthToken(): string | null {
  const state: RootState = store.getState();

  return state.auth.token;
}

export const authApi = {
  register: async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  ) => {
    return axios.post(`${API_URL}/register`, {
      first_name,
      last_name,
      email,
      password,
    });
  },

  login: async (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
  },
};

export const fetchMyProfile = async () => {
  const token = getAuthToken();

  const response = await axios.get<UserProfile>(`${API_URL}/my/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
