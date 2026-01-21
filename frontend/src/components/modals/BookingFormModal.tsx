import { useState, useEffect } from 'react';
import Modal from './modal/Modal';
import Button from '../button/button';
import { bookingService, hotelService, guestService } from '@/services/api';

interface Hotel {
  id: number;
  name: string;
}

interface Guest {
  id: number;
  name: string;
}

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BookingFormModal({ isOpen, onClose, onSuccess }: BookingFormModalProps) {
  const [formData, setFormData] = useState({
    hotelId: '',
    guestId: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
  });
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const [hotelsData, guestsData] = await Promise.all([
        hotelService.getAll(),
        guestService.getAll(),
      ]);
      setHotels(hotelsData);
      setGuests(guestsData);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await bookingService.create({
        hotelId: Number(formData.hotelId),
        guestId: Number(formData.guestId),
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        roomType: formData.roomType,
      });

      setFormData({ hotelId: '', guestId: '', checkIn: '', checkOut: '', roomType: '' });
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Erro ao criar reserva:', err);
      setError('Erro ao criar reserva. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ hotelId: '', guestId: '', checkIn: '', checkOut: '', roomType: '' });
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Nova Reserva">
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <p className="error-message">{error}</p>}

        <div className="modal-form-group">
          <label>Hotel</label>
          <select
            name="hotelId"
            value={formData.hotelId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Selecione um hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-form-group">
          <label>Responsável</label>
          <select
            name="guestId"
            value={formData.guestId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Selecione o responsável</option>
            {guests.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.name}
              </option>
            ))}
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
              disabled={loading}
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
              disabled={loading}
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
            disabled={loading}
          >
            <option value="">Selecione o tipo</option>
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suíte</option>
            <option value="presidential">Presidencial</option>
          </select>
        </div>

        <div className="modal-form-actions">
          <Button type="button" variant="ghost" onClick={handleClose} fullWidth disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Criando...' : 'Criar Reserva'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
