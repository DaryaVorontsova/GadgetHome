// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { selectIsAuthenticated } from './features/Auth/authSelectors';
import { selectBasket } from './features/Basket/selectors';
import { loadBasketItems } from './features/Basket/basketThunks';

import AppRoutes from './app/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/Goods.css';

const AppWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const basketItems = useAppSelector(selectBasket);

  useEffect(() => {
    if (isAuthenticated && basketItems.length === 0) {
      dispatch(loadBasketItems());
    }
  }, [isAuthenticated, basketItems.length, dispatch]);

  const location = useLocation();
  const hideOnPaths = ['/login'];
  const shouldHideHeaderFooter = hideOnPaths.includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!shouldHideHeaderFooter && <Header />}
      <main className="flex-fill">
        <AppRoutes />
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
