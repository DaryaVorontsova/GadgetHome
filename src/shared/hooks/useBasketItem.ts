import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromBasket,
} from '../../features/Basket/basketSlice';
import { updateCartItem, deleteCartItem } from '../api/basket';
import type { BasketItem } from '../../types/types';

interface UseBasketItemReturn {
  loading: boolean;
  error: string | null;
  updateQuantity: (newQuantity: number) => Promise<void>;
  removeItem: () => Promise<void>;
}

export function useBasketItem(item: BasketItem): UseBasketItemReturn {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateQuantity = async (newQuantity: number) => {
    setLoading(true);
    setError(null);

    try {
      if (newQuantity > item.quantity) {
        dispatch(
          incrementQuantity({ product_id: item.product_id, color: item.color }),
        );
      } else {
        dispatch(
          decrementQuantity({ product_id: item.product_id, color: item.color }),
        );
      }

      if (newQuantity > 0) {
        await updateCartItem({
          good_id: item.product_id,
          color: item.color,
          quantity: newQuantity,
        });
      } else {
        await deleteCartItem({ good_id: item.product_id, color: item.color });
        dispatch(
          removeFromBasket({ product_id: item.product_id, color: item.color }),
        );
      }
    } catch {
      setError('Не удалось обновить корзину на сервере');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async () => {
    return updateQuantity(0);
  };

  return { loading, error, updateQuantity, removeItem };
}
