import React from 'react';
import { Link } from 'react-router-dom';
import type { GoodColor } from '../../types/types';

interface GoodCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  creator: string;
  colors: GoodColor[];
  onAddToCart: (colors: GoodColor[]) => void;
}

export const GoodCard: React.FC<GoodCardProps> = ({
  id,
  name,
  price,
  image,
  creator,
  colors,
  onAddToCart,
}) => {
  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(colors);
  };

  return (
    <Link to={`/catalog/${id}`} className="text-decoration-none text-dark">
      <div className="card h-100 good-card border-0">
        <img
          src={image}
          className="card-img-top p-3"
          alt={name}
          style={{ height: 150, objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h6 className="card-title">{name}</h6>
          <div className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>
            <span className="fw-semibold">{creator}</span>
          </div>
          <div className="fw-bold fs-5">{price.toLocaleString()} ₽</div>
          <button
            className="btn btn-primary btn-sm mt-2"
            onClick={handleAddClick}
          >
            <i className="bi bi-cart3" style={{ margin: 10 }}></i>В корзину
          </button>
        </div>
      </div>
    </Link>
  );
};
