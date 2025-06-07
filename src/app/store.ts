import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/Sidebar/sidebarSlice';
import goodReducer from '../features/Goods/goodsSlice';
import adressesReducer from '../features/Adresses/adressesSlice';
import basketReducer from '../features/Basket/basketSlice';
import authReducer from '../features/Auth/authSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    goods: goodReducer,
    adresses: adressesReducer,
    basket: basketReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
