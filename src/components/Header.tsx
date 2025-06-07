import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../features/Sidebar/Sidebar';
import '../styles/Header.css';
import { useAppSelector } from '../app/hooks';
import { selectBasketTotalQuantity } from '../features/Basket/selectors';
import {
  selectIsAuthenticated,
  selectUsername,
} from '../features/Auth/authSelectors';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  const totalItemsCount = useAppSelector(selectBasketTotalQuantity);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const username = useAppSelector(selectUsername);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSearchTerm(params.get('q') || '');
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(location.search);

    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
      params.delete('category_id');
    }

    navigate({
      pathname: '/catalog',
      search: params.toString(),
    });
  };

  return (
    <>
      <header className="header d-flex align-items-center px-3">
        <div className="d-flex align-items-center me-4">
          <Link
            to="/catalog"
            className="fs-3 fw-bold text-white text-decoration-none me-2 d-flex align-items-center header-logo"
          >
            <i className="bi bi-lightning-fill me-2 header-lightning"></i>
            GadgetHome
          </Link>
          <button
            onClick={toggleSidebar}
            className="btn btn-link text-white px-2 header-menu-btn"
          >
            <i
              className={`bi ${isSidebarOpen ? 'bi-x-lg' : 'bi-list'} header-toggle-icon`}
            ></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow-1 me-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control header-search"
              placeholder="Найти товар"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>

        <nav className="d-flex align-items-center gap-4">
          <Link
            to="/address"
            className="text-white text-decoration-none d-flex align-items-center gap-1"
          >
            <i className="bi bi-geo-alt header-icon"></i>
            <span className="icon-size">Адреса</span>
          </Link>
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="text-white text-decoration-none d-flex align-items-center gap-1"
            >
              <i className="bi bi-person header-icon"></i>
              <span className="icon-size">Войти</span>
            </Link>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <i
                className="bi bi-person header-icon"
                style={{ color: '#ffffff' }}
              ></i>
              <Link
                to="/profile"
                className="text-white text-decoration-none fw-bold"
              >
                {username}
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <Link
              to="/basket"
              className="text-white text-decoration-none d-flex align-items-center gap-1 position-relative"
            >
              <i className="bi bi-cart3 header-icon"></i>
              <span className="icon-size">Корзина</span>
              {totalItemsCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark header-cart-badge">
                  {totalItemsCount}
                </span>
              )}
            </Link>
          )}
        </nav>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && <div className="dark-overlay" />}
    </>
  );
};
