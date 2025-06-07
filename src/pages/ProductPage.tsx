import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectGoodById } from '../features/Goods/selectors';
import { fetchGoodById } from '../shared/api/goods';
import type { Good } from '../types/types';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

import { useAddToBasket } from '../shared/hooks/useAddToBasket';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = Number(id);

  const goodFromStore = useAppSelector(state =>
    selectGoodById(state, numericId),
  );

  const [good, setGood] = useState<Good | null>(goodFromStore ?? null);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<string | null>(null);

  const [mainImage, setMainImage] = useState<string | null>(null);
  const [mainColor, setMainColor] = useState<string | null>(null);

  const [added, setAddedLocal] = useState<boolean>(false);

  const {
    addToCart,
    loading,
    error,
    added: addedExtern,
    reset,
  } = useAddToBasket();

  useEffect(() => {
    if (goodFromStore) {
      setGood(goodFromStore);

      const first = goodFromStore.g_colors[0];

      setMainImage(first?.image ?? null);
      setMainColor(first?.color ?? null);
    }
  }, [goodFromStore]);

  useEffect(() => {
    if (!goodFromStore) {
      setLoadingData(true);
      fetchGoodById(numericId)
        .then((data: Good) => {
          setGood(data);

          const first = data.g_colors[0];

          setMainImage(first?.image ?? null);
          setMainColor(first?.color ?? null);
        })
        .catch(() => {
          setErrorData('Не удалось загрузить данные товара');
        })
        .finally(() => {
          setLoadingData(false);
        });
    }
  }, [goodFromStore, numericId]);

  if (loadingData) {
    return <Loading />;
  }

  if (!good) {
    return (
      <div className="text-center mt-5">
        {errorData ? <Error message={errorData} /> : 'Товар не найден'}
      </div>
    );
  }

  const handleAddToBasket = () => {
    if (!good || !mainColor) {
      return;
    }

    const chosen = good.g_colors.find(c => c.color === mainColor);

    if (!chosen) {
      return;
    }

    reset();
    addToCart(good.id, good.g_name, good.g_price, chosen, 1);
    setAddedLocal(true);
  };

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
      <div className="row">
        <div className="col-md-2 d-flex flex-column align-items-center gap-2">
          {good.g_colors.map(color => (
            <button
              key={color.color}
              onClick={() => {
                setMainImage(color.image);
                setMainColor(color.color);
              }}
              title={color.color}
              className="p-0 bg-transparent"
              style={{
                border:
                  mainImage === color.image
                    ? '2px solid #6c63ff'
                    : '1px solid #ccc',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              <img
                src={color.image}
                alt={color.color}
                width={60}
                height={60}
                style={{ pointerEvents: 'none' }}
              />
            </button>
          ))}
        </div>

        <div className="col-md-6">
          <h4 className="fw-bold text-center mb-3">{good.g_name}</h4>
          <div
            className="d-flex justify-content-center align-items-center mb-4"
            style={{ height: 350 }}
          >
            <img
              src={mainImage || good.g_colors[0]?.image}
              alt={good.g_name}
              className="img-fluid shadow-sm d-block mx-auto"
              style={{ maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>

          <p className="text-muted mb-1">
            Цвет: <span className="fw-semibold">{mainColor}</span>
          </p>
          <p className="text-muted mb-1">
            Категория: <span className="fw-semibold">{good.g_category}</span>
          </p>
          <p className="text-muted mb-1">
            Производитель: <span className="fw-semibold">{good.g_creator}</span>
          </p>
          {good.g_descr && (
            <p className="mt-2" style={{ whiteSpace: 'pre-line' }}>
              {good.g_descr}
            </p>
          )}
        </div>

        <div className="col-md-4">
          <div className="border rounded p-4 shadow">
            <h4 className="fw-bold text-primary mb-3">
              {good.g_price.toLocaleString()} ₽
            </h4>

            {loading && <Loading />}

            <button
              className="btn btn-primary w-100 mb-2"
              onClick={handleAddToBasket}
              disabled={added || loading}
            >
              {added || addedExtern ? (
                'Добавлено в корзину'
              ) : (
                <>
                  <i className="bi bi-cart3 me-2"></i>Добавить в корзину
                </>
              )}
            </button>

            {error && <Error message={error} />}
          </div>
        </div>
      </div>
    </div>
  );
};
