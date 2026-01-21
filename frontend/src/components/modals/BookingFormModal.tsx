import { useState, useEffect } from 'react';
import Modal from './modal/Modal';
import Button from '../button/button';
import { bookingService, hotelService } from '../../services/api';

interface Hotel {
  id: number;
  name: string;
}

interface RoomType {
  key: string;
  value: string;
}

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function BookingFormModal({ isOpen, onClose, onSuccess }: BookingFormModalProps) {
  const [formData, setFormData] = useState({
    hotelId: '',
    responsibleName: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
  });
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const [hotelsData, roomTypesData] = await Promise.all([
        hotelService.getAll(),
        bookingService.getRoomTypes(),
      ]);
      setHotels(hotelsData);
      setRoomTypes(roomTypesData);
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
        hotelId: formData.hotelId,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        responsibleName: formData.responsibleName,
        roomType: formData.roomType,
      });

      setFormData({ hotelId: '', responsibleName: '', checkInDate: '', checkOutDate: '', roomType: '' });
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
    setFormData({ hotelId: '', responsibleName: '', checkInDate: '', checkOutDate: '', roomType: '' });
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
          <label>Responsável pela Reserva</label>
          <input
            type="text"
            name="responsibleName"
            value={formData.responsibleName}
            onChange={handleChange}
            placeholder="Nome do responsável"
            required
            disabled={loading}
          />
        </div>

        <div className="modal-form-row">
          <div className="modal-form-group">
            <label>Check-in</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="modal-form-group">
            <label>Check-out</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
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
            {roomTypes.map((type) => (
              <option key={type.key} value={type.value}>
                {type.value}
              </option>
            ))}
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
