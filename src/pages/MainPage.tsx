import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  loadGoods,
  loadGoodsByCategory,
  searchGoods,
} from '../features/Goods/goodsThunks';
import {
  selectGoods,
  selectLoading,
  selectError,
} from '../features/Goods/selectors';
import { GoodCard } from '../features/Goods/GoodsCard';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Good, GoodColor } from '../types/types';
import { ColorSelectModal } from '../components/ColorSelectModal';

import { useAddToBasket } from '../shared/hooks/useAddToBasket';
import { selectIsAuthenticated } from '../features/Auth/authSelectors';

export const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const goods = useAppSelector(selectGoods);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get('category_id');
  const q = searchParams.get('q') || '';
  const categoryId = categoryIdParam ? Number(categoryIdParam) : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (q) {
      dispatch(searchGoods(q));
    } else if (categoryId !== null) {
      dispatch(loadGoodsByCategory(categoryId));
    } else {
      dispatch(loadGoods());
    }
  }, [dispatch, categoryId, q]);

  const onClearFilter = () => {
    navigate('/catalog');
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedGood, setSelectedGood] = useState<Good | null>(null);

  const {
    addToCart,
    loading: addingLoading,
    error: addingError,
    reset,
  } = useAddToBasket();

  const handleOpenColorModal = (good: Good) => {
    if (!isAuthenticated) {
      navigate('/login');

      return;
    }

    reset();
    setSelectedGood(good);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGood(null);
    reset();
  };

  const handleConfirmAdd = async (chosenColor: GoodColor) => {
    if (!selectedGood) {
      return;
    }

    const { id: goodId, g_name: goodName, g_price: price } = selectedGood;

    await addToCart(goodId, goodName, price, chosenColor, 1);

    if (!addingError) {
      setShowModal(false);
      setSelectedGood(null);
    }
  };

  return (
    <div className="container-fluid mt-3 mb-3">
      {categoryId !== null && (
        <div className="mb-3">
          <button
            onClick={onClearFilter}
            className="btn btn-sm btn-outline-primary"
          >
            ← Показать все товары
          </button>
        </div>
      )}

      <div className="ms-2 me-2 row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
        {loading && <Loading />}
        {error && <Error message={error} />}

        {!goods.length && !loading ? (
          <div className="p-3 text-center text-muted">
            Пока таких товаров нет
          </div>
        ) : (
          goods.map(good => (
            <div className="col" key={good.id}>
              <GoodCard
                id={good.id}
                name={good.g_name}
                price={good.g_price}
                image={good.g_colors[0].image}
                creator={good.g_creator}
                colors={good.g_colors}
                onAddToCart={() => handleOpenColorModal(good)}
              />
            </div>
          ))
        )}
      </div>

      {selectedGood && (
        <ColorSelectModal
          show={showModal}
          onClose={handleCloseModal}
          loading={addingLoading}
          colors={selectedGood.g_colors}
          goodName={selectedGood.g_name}
          onConfirm={handleConfirmAdd}
        />
      )}

      {addingError && (
        <div className="alert alert-danger fixed-bottom m-3">{addingError}</div>
      )}
    </div>
  );
};
