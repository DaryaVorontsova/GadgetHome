import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadCategories } from './sidebarThunks';
import { selectItems, selectError, selectLoading } from './selectors';
import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadCategories());
    }
  }, [dispatch, items.length]);

  const onCategoryClick = (categoryId: number) => {
    onClose();
    navigate(`/catalog?category_id=${categoryId}`);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!items.length ? (
        <Error message={'Категорий товаров пока нет'} />
      ) : (
        <ul className="list-group list-group-flush">
          {items.map(cat => (
            <li key={cat.c_id} className="list-group-item p-0">
              <button
                type="button"
                className="sidebar-item btn w-100 text-start"
                onClick={() => onCategoryClick(cat.c_id)}
              >
                <i className="bi bi-dot me-2"></i> {cat.c_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
