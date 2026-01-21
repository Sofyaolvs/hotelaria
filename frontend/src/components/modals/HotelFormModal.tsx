import { useState } from 'react';
import Modal from './modal/Modal';
import Button from '../button/button';
import { hotelService } from '@/services/api';

interface HotelFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function HotelFormModal({ isOpen, onClose, onSuccess }: HotelFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    rooms: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await hotelService.create({
        name: formData.name,
        city: formData.city,
        rooms: Number(formData.rooms),
      });

      setFormData({ name: '', city: '', rooms: '' });
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Erro ao criar hotel:', err);
      setError('Erro ao cadastrar hotel. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', city: '', rooms: '' });
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Novo Hotel">
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <p className="error-message">{error}</p>}

        <div className="modal-form-group">
          <label>Nome do Hotel</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Hotel Gran Marquise"
            required
            disabled={loading}
          />
        </div>

        <div className="modal-form-row">
          <div className="modal-form-group">
            <label>Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ex: Fortaleza"
              required
              disabled={loading}
            />
          </div>

          <div className="modal-form-group">
            <label>Quartos</label>
            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              placeholder="Ex: 120"
              required
              min="1"
              disabled={loading}
            />
          </div>
        </div>

        <div className="modal-form-actions">
          <Button type="button" variant="ghost" onClick={handleClose} fullWidth disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Hotel'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
