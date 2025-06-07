import React, { useEffect, useState } from 'react';
import { postOrder } from '../shared/api/orders';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useBasketItem } from '../shared/hooks/useBasketItem';
import { loadBasketItems } from '../features/Basket/basketThunks';
import { clearBasket } from '../features/Basket/basketSlice';
import { loadAddresses } from '../features/Adresses/adressesThunks';
import {
  selectLoading as selectBasketLoading,
  selectError as selectBasketError,
  selectBasket,
} from '../features/Basket/selectors';
import {
  selectAdresses,
  selectLoading as selectAddressesLoading,
  selectError as selectAddressesError,
} from '../features/Adresses/selectors';
import { BasketCard } from '../features/Basket/BasketCard';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { useNavigate } from 'react-router-dom';

import type { BasketItem } from '../types/types';

const BasketItemRow: React.FC<{ item: BasketItem }> = ({ item }) => {
  const { loading, error, updateQuantity, removeItem } = useBasketItem(item);

  return (
    <>
      <BasketCard
        item={item}
        onIncrement={() => updateQuantity(item.quantity + 1)}
        onDecrement={() => updateQuantity(item.quantity - 1)}
        onRemove={() => removeItem()}
        loading={loading}
      />
      {error && <Error message={error} />}
    </>
  );
};

export const BasketPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const items = useAppSelector(selectBasket);
  const basketLoading = useAppSelector(selectBasketLoading);
  const basketError = useAppSelector(selectBasketError);

  const addresses = useAppSelector(selectAdresses);
  const addressesLoading = useAppSelector(selectAddressesLoading);
  const addressesError = useAppSelector(selectAddressesError);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadBasketItems());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (addresses.length === 0) {
      dispatch(loadAddresses());
    }
  }, [dispatch, addresses.length]);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const onAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(e.target.value);

    setSelectedAddressId(isNaN(val) ? null : val);
  };

  const onPaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    if (!selectedAddressId || !selectedPaymentMethod) {
      return;
    }

    try {
      await postOrder({
        point_id: selectedAddressId,
        payment_method: selectedPaymentMethod as 'нал.' | 'безнал.',
      });

      dispatch(clearBasket());
      alert('Заказ успешно отправлен');
    } catch {
      alert('Ошибка при оформлении заказа');
    }
  };

  if (basketLoading) {
    return <Loading />;
  }

  if (basketError) {
    return <Error message={basketError} />;
  }

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <button
          onClick={() => navigate('/catalog')}
          className="btn btn-outline-primary"
        >
          ← Назад
        </button>
      </div>
      <h2 className="mb-2 text-center">Корзина</h2>
      <p className="text-muted">
        {totalCount} {totalCount === 1 ? 'товар' : 'товара'}
      </p>

      {items.length === 0 ? (
        <div className="card p-3 text-center text-muted">
          Ваша корзина пуста
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {items.map(item => (
              <BasketItemRow
                key={`${item.product_id}-${item.color}`}
                item={item}
              />
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-3">Итого</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Товары, {totalCount} шт.</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold fs-5">Итого</span>
                <span className="fw-bold fs-5">
                  {totalPrice.toLocaleString()} ₽
                </span>
              </div>

              <div className="mb-3">
                <label htmlFor="addressSelect" className="form-label">
                  Пункт выдачи
                </label>
                {addressesLoading && <Loading />}
                {addressesError && <Error message={addressesError} />}
                {!addressesLoading && !addressesError && (
                  <select
                    id="addressSelect"
                    className="form-select"
                    value={selectedAddressId ?? ''}
                    onChange={onAddressChange}
                  >
                    <option value="">Выберите пункт выдачи</option>
                    {addresses.map(addr => (
                      <option key={addr.id} value={addr.id}>
                        {addr.name}, {addr.address}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="paymentSelect" className="form-label">
                  Способ оплаты
                </label>
                <select
                  id="paymentSelect"
                  className="form-select"
                  value={selectedPaymentMethod}
                  onChange={onPaymentChange}
                >
                  <option value="">Выберите способ оплаты</option>
                  <option value="нал.">Наличные</option>
                  <option value="безнал.">Безналичные</option>
                </select>
              </div>

              <button
                className="btn btn-primary w-100"
                disabled={
                  items.length === 0 ||
                  !selectedAddressId ||
                  !selectedPaymentMethod
                }
                onClick={handleCheckout}
              >
                Сформировать заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
