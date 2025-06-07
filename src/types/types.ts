export interface Category {
  c_id: number;
  c_name: string;
}

export interface GoodColor {
  color: string;
  image: string;
}

export interface Good {
  id: number;
  g_name: string;
  g_price: number;
  g_descr: string;
  g_category: string;
  g_creator: string;
  g_colors: GoodColor[];
}

export interface Address {
  id: number;
  name: string;
  address: string;
  working_hours: string;
  phones: string[];
}

// Отправка на сервер
export interface AddToBasketPayload {
  good_id: number;
  color: string;
  quantity: number;
}

// В Redux
export interface BasketItem {
  product_id: number;
  name: string;
  price: number;
  color: string;
  image: string;
  quantity: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  first_name: string;
  last_name: string;
}

export interface RegisterResponse {
  message: string;
}

export interface PostOrderPayload {
  point_id: number;
  payment_method: 'нал.' | 'безнал.';
}

interface OrderItem {
  name: string;
  color: string;
  quantity: number;
  price_each: number;
}

export interface Order {
  order_id: number;
  date: string;
  status: string;
  total_price: number;
  pickup_point: string;
  payment_method: 'безнал.' | 'нал.';
  items: OrderItem[];
}

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  reg_date: string;
}
