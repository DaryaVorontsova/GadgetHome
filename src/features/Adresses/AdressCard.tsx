import React from 'react';

interface AdressProps {
  name: string;
  address: string;
  working_hours: string;
  phones: string[];
}

export const AdressCard: React.FC<AdressProps> = ({
  name,
  address,
  working_hours,
  phones,
}) => {
  return (
    <div className="card h-100 address-card shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text mb-1">
          <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
          {address}
        </p>
        <p className="card-text mb-1">
          <i className="bi bi-clock-fill me-2 text-secondary"></i>
          {working_hours}
        </p>
        {phones.map((phone, idx) => (
          <p className="card-text mb-2 d-flex align-items-center" key={idx}>
            <i className="bi bi-telephone-fill me-2 text-success"></i>
            {phone}
          </p>
        ))}
      </div>
    </div>
  );
};
