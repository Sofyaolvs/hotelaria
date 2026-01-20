import { useState } from 'react';
import Modal from './modal/Modal';
import Button from '../button/button';

interface HotelFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HotelFormModal({ isOpen, onClose }: HotelFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    rooms: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Hotel data:', formData);
    onClose();
    setFormData({ name: '', city: '', address: '', rooms: '', phone: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Hotel">
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="modal-form-group">
          <label>Nome do Hotel</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Hotel Gran Marquise"
            required
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
            />
          </div>
        </div>

        <div className="modal-form-actions">
          <Button type="button" variant="ghost" onClick={onClose} fullWidth>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            Cadastrar Hotel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
