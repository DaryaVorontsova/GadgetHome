import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { fetchMyOrders } from '../shared/api/orders';
import { fetchMyProfile } from '../shared/api/auth';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

import type { Order, UserProfile } from '../types/types';

export const UserProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  useEffect(() => {
    Promise.all([fetchMyProfile(), fetchMyOrders()])
      .then(([profileData, ordersData]) => {
        setProfile(profileData);
        setOrders(ordersData);
        setLoading(false);
      })
      .catch(() => {
        setError('Не удалось загрузить данные пользователя');
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    dispatch(logout());
    navigate('/');
  };

  const handleBack = () => navigate('/catalog');

  const toggleOrder = (id: number) => {
    const newSet = new Set(expanded);

    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }

    setExpanded(newSet);
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !profile) {
    return <Error message={error || 'Ошибка'} />;
  }

  return (
    <div className="container mt-4">
      <button onClick={handleBack} className="btn btn-outline-primary mb-3">
        ← Назад
      </button>

      <div className="card p-4 shadow-sm mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Профиль пользователя</h2>
          <button onClick={handleLogout} className="btn btn-sm btn-danger">
            Выйти
          </button>
        </div>
        <p>
          <strong>Имя:</strong> {profile.first_name} {profile.last_name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Зарегистрирован:</strong>{' '}
          {new Date(profile.reg_date).toLocaleDateString('ru-RU')}
        </p>
      </div>

      <h3 className="mb-3">Мои заказы</h3>
      {orders.length === 0 ? (
        <p className="text-muted">У вас пока нет заказов.</p>
      ) : (
        <div className="accordion" id="ordersAccordion">
          {orders.map(order => (
            <div className="card mb-3" key={order.order_id}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold">Заказ #{order.order_id}</span> –{' '}
                  {new Date(order.date).toLocaleDateString('ru-RU')}
                </div>
                <div className="d-flex align-items-center">
                  <span className="me-3">
                    {order.status}, {order.total_price.toLocaleString()} ₽
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => toggleOrder(order.order_id)}
                  >
                    {expanded.has(order.order_id) ? 'Свернуть' : 'Детали'}
                  </button>
                </div>
              </div>
              {expanded.has(order.order_id) && (
                <div className="card-body">
                  <p>
                    <strong>Пункт выдачи:</strong> {order.pickup_point}
                  </p>
                  <p>
                    <strong>Способ оплаты:</strong>{' '}
                    {order.payment_method === 'безнал.'
                      ? 'Безналичные'
                      : 'Наличные'}
                  </p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Товар</th>
                        <th>Цвет</th>
                        <th>Кол-во</th>
                        <th>Цена за шт.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>{item.color}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price_each.toLocaleString()} ₽</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
