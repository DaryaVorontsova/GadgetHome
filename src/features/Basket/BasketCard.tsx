import React from 'react';
import type { BasketItem } from '../../types/types';

interface BasketCardProps {
  item: BasketItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  loading: boolean;
}

export const BasketCard: React.FC<BasketCardProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  loading,
}) => {
  const { name, price, color, image, quantity } = item;

  return (
    <div className="card mb-3">
      <div className="card-body d-flex align-items-center">
        <img
          src={image}
          alt={name}
          className="img-fluid rounded me-3"
          style={{ width: 100, height: 100, objectFit: 'contain' }}
        />

        <div className="flex-grow-1">
          <h5 className="card-title mb-1">{name}</h5>
          <p className="text-muted mb-2">
            Цвет: <span className="fw-semibold">{color}</span>
          </p>

          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={onDecrement}
              disabled={loading || item.quantity <= 1}
            >
              −
            </button>

            <span className="mx-2">{quantity}</span>

            <button
              className="btn btn-outline-secondary btn-sm ms-2 me-4"
              onClick={onIncrement}
              disabled={loading}
            >
              +
            </button>

            <span className="fw-bold">
              {(price * quantity).toLocaleString()} ₽
            </span>

            <button
              className="btn btn-link text-danger ms-3 p-0"
              onClick={onRemove}
              title="Удалить товар"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
