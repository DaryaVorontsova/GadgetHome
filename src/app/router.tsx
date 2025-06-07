import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { AdressesPage } from '../pages/AdressesPage';
import { BasketPage } from '../pages/BasketPage';
import { ProductPage } from '../pages/ProductPage';
import { AuthPage } from '../pages/AuthPage';
import { UserProfilePage } from '../pages/UserProfilePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalog" />} />
      <Route path="/catalog" element={<MainPage />} />
      <Route path="/address" element={<AdressesPage />} />
      <Route path="/basket" element={<BasketPage />} />
      <Route path="/catalog/:id" element={<ProductPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
