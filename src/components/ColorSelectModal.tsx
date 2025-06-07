import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import type { GoodColor } from '../types/types';

interface ColorSelectModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (selectedColor: GoodColor) => void;
  loading: boolean;
  goodName: string;
  colors: GoodColor[];
}

export const ColorSelectModal: React.FC<ColorSelectModalProps> = ({
  show,
  onClose,
  onConfirm,
  loading,
  goodName,
  colors,
}) => {
  const [selectedColor, setSelectedColor] = useState<GoodColor | null>(null);

  useEffect(() => {
    if (show) {
      setSelectedColor(null);
    }
  }, [show]);

  const handleConfirm = () => {
    if (selectedColor) {
      onConfirm(selectedColor);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{goodName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {colors.map(c => (
            <button
              key={c.color}
              type="button"
              onClick={() => setSelectedColor(c)}
              style={{
                border:
                  selectedColor && selectedColor.color === c.color
                    ? '2px solid #0d6efd'
                    : '1px solid #ccc',
                borderRadius: 4,
                padding: 4,
                cursor: 'pointer',
                backgroundColor: 'transparent',
              }}
              title={c.color}
            >
              <img
                src={c.image}
                alt={c.color}
                width={60}
                height={60}
                style={{ objectFit: 'contain', display: 'block' }}
              />
              <div
                className="text-center mt-1"
                style={{ fontSize: '0.85rem', color: '#333' }}
              >
                {c.color}
              </div>
            </button>
          ))}
        </div>

        {colors.length === 0 && (
          <p className="text-center text-muted mt-3">Нет доступных цветов</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!selectedColor || loading}
        >
          {loading ? 'Добавление...' : 'Добавить в корзину'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
