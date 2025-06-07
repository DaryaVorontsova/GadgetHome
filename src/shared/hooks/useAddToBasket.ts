import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated } from '../../features/Auth/authSelectors';
import { addToBasket } from '../../features/Basket/basketSlice';
import { postCartItem } from '../api/basket';
import { loadBasketItems } from '../../features/Basket/basketThunks';
import type {
  GoodColor,
  BasketItem,
  AddToBasketPayload,
} from '../../types/types';

export function useAddToBasket() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const addToCart = async (
    goodId: number,
    goodName: string,
    price: number,
    chosenColor: GoodColor,
    quantity: number = 1,
  ) => {
    if (!isAuthenticated) {
      navigate('/login');

      return;
    }

    setLoading(true);
    setError(null);

    const basketItem: BasketItem = {
      product_id: goodId,
      name: goodName,
      price,
      color: chosenColor.color,
      image: chosenColor.image,
      quantity,
    };

    const payload: AddToBasketPayload = {
      good_id: goodId,
      color: chosenColor.color,
      quantity,
    };

    try {
      dispatch(addToBasket(basketItem));

      await postCartItem(payload);

      dispatch(loadBasketItems());

      setAdded(true);
    } catch {
      setError('Ошибка добавления товара в корзину');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setAdded(false);
    setError(null);
    setLoading(false);
  };

  return { addToCart, loading, error, added, reset };
}
