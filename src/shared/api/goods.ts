import axios from 'axios';
import { API_URL } from './link';

export const fetchCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`);

  return res.data.categories;
};

export const fetchGoods = async () => {
  const res = await axios.get(`${API_URL}/products`);

  return res.data.goods;
};

export const fetchGoodById = async (id: number) => {
  const res = await axios.get(`${API_URL}/products/${id}`);

  return res.data;
};

export const fetchGoodsByCategory = async (categoryId: number) => {
  const res = await axios.get(`${API_URL}/products`, {
    params: { category_id: categoryId },
  });

  return res.data.goods;
};

export const fetchAddresses = async () => {
  const res = await axios.get(`${API_URL}/pickup`);

  return res.data;
};

export const fetchSearchGoogs = async (query: string) => {
  const res = await axios.get(`${API_URL}/products/search`, {
    params: { q: query },
  });

  return res.data.goods;
};
