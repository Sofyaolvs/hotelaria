import { useState, useEffect } from 'react';
import Modal from './modal/Modal';
import Button from '../button/button';
import { guestService, bookingService } from '@/services/api';

interface GuestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface Booking {
  id: string;
  hotel: { id: string; name: string };
  checkInDate: string;
  checkOutDate: string;
}

export default function GuestFormModal({ isOpen, onClose, onSuccess }: GuestFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    document: '',
    email: '',
    phone: '',
    bookingId: '',
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadBookings();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await guestService.create({
        name: formData.name,
        document: formData.document,
        phone: formData.phone,
        email: formData.email,
        bookingIds: [formData.bookingId],
      });

      setFormData({ name: '', document: '', email: '', phone: '', bookingId: '' });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError('Erro ao cadastrar hóspede. Verifique os dados e tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Hóspede">
      <form onSubmit={handleSubmit} className="modal-form">
        {error && <p className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        <div className="modal-form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: João Silva"
            required
          />
        </div>

        <div className="modal-form-group">
          <label>CPF ou Passaporte</label>
          <input
            type="text"
            name="document"
            value={formData.document}
            onChange={handleChange}
            placeholder="000.000.000-00"
            required
          />
        </div>

        <div className="modal-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@exemplo.com"
            required
          />
        </div>

        <div className="modal-form-group">
          <label>Telefone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div className="modal-form-group">
          <label>Reserva</label>
          <select
            name="bookingId"
            value={formData.bookingId}
            onChange={handleChange}
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
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Hóspede'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
