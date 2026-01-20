import { useState } from 'react';
import Modal from './modal/Modal';
import Button from '../button/button';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingFormModal({ isOpen, onClose }: BookingFormModalProps) {
  const [formData, setFormData] = useState({
    hotel: '',
    guest: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking data:', formData);
    onClose();
    setFormData({ hotel: '', guest: '', checkIn: '', checkOut: '', roomType: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Reserva">
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="modal-form-group">
          <label>Hotel</label>
          <select
            name="hotel"
            value={formData.hotel}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um hotel</option>
            <option value="Pousada Cumbuco">Pousada Cumbuco</option>
            <option value="Hotel Gran Marquise">Hotel Gran Marquise</option>
          </select>
        </div>

        <div className="modal-form-group">
          <label>Responsável</label>
          <select
            name="guest"
            value={formData.guest}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o responsável</option>
            <option value="João Silva">João Silva</option>
            <option value="Maria Santos">Maria Santos</option>
            <option value="Carlos Oliveira">Carlos Oliveira</option>
          </select>
        </div>

        <div className="modal-form-row">
          <div className="modal-form-group">
            <label>Check-in</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-form-group">
            <label>Check-out</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="modal-form-group">
          <label>Tipo de Quarto</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suíte</option>
            <option value="presidential">Presidencial</option>
          </select>
        </div>

        <div className="modal-form-actions">
          <Button type="button" variant="ghost" onClick={onClose} fullWidth>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            Criar Reserva
          </Button>
        </div>
      </form>
    </Modal>
  );
}
