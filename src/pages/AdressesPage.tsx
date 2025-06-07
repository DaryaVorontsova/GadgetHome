import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadAddresses } from '../features/Adresses/adressesThunks';
import {
  selectAdresses,
  selectLoading,
  selectError,
} from '../features/Adresses/selectors';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { AdressCard } from '../features/Adresses/AdressCard';
import '../styles/Adresses.css';

export const AdressesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectAdresses);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const navigate = useNavigate();

  useEffect(() => {
    if (addresses.length === 0) {
      dispatch(loadAddresses());
    }
  }, [dispatch, addresses.length]);

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-primary"
        >
          ← Назад
        </button>
      </div>
      <h2 className="mb-4 text-center">Пункты выдачи и магазины</h2>

      {loading && <Loading />}
      {error && <Error message={error} />}

      {!addresses.length && !loading ? (
        <p className="text-muted">Адреса пока не загружены или их нет.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {addresses.map(addr => (
            <div className="col" key={addr.id}>
              <AdressCard
                name={addr.name}
                address={addr.address}
                working_hours={addr.working_hours}
                phones={addr.phones}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
