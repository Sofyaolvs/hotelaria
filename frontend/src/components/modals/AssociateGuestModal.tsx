import { useState, useEffect } from 'react';
import Modal from './modal/Modal';
import Button from '../button/button';
import { guestService, bookingService } from '@/services/api';

interface AssociateGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  guest: {
    id: string;
    name: string;
    document: string;
  } | null;
}

interface Booking {
  id: string;
  hotel: { id: string; name: string };
  checkInDate: string;
  checkOutDate: string;
}

export default function AssociateGuestModal({ isOpen, onClose, onSuccess, guest }: AssociateGuestModalProps) {
  const [bookingId, setBookingId] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadBookings();
      setBookingId('');
      setError(null);
    }
  }, [isOpen]);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getAll();
      setBookings(data);
    } catch (err) {
      console.error('Erro ao carregar reservas:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guest || !bookingId) return;

    setLoading(true);
    setError(null);

    try {
      await guestService.update(guest.id, {
        bookingIds: [bookingId],
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      setError('Erro ao associar hóspede à reserva. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!guest) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Associar a Reserva">
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <p className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        <div className="modal-form-group">
          <label>Hóspede</label>
          <input
            type="text"
            value={`${guest.name} - ${guest.document}`}
            disabled
            style={{ backgroundColor: '#f5f5f5' }}
          />
        </div>

        <div className="modal-form-group">
          <label>Selecione a Reserva</label>
          <select
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          >
            <option value="">Selecione uma reserva</option>
            {bookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {booking.hotel?.name} - {formatDate(booking.checkInDate)} a {formatDate(booking.checkOutDate)}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-form-actions">
          <Button type="button" variant="ghost" onClick={onClose} fullWidth disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" fullWidth disabled={loading || !bookingId}>
            {loading ? 'Associando...' : 'Associar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
