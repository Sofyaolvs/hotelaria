import { useState } from 'react';
import Modal from './Modal';
import Button from '../button/button';

interface GuestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const availableBookings = [
  { id: 1, hotel: 'Pousada Cumbuco', checkIn: '20/01/2026' },
  { id: 2, hotel: 'Hotel Gran Marquise', checkIn: '22/01/2026' },
  { id: 3, hotel: 'Pousada Cumbuco', checkIn: '15/01/2026' },
];

export default function GuestFormModal({ isOpen, onClose }: GuestFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    document: '',
    email: '',
    phone: '',
    bookingId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guest data:', formData);
    onClose();
    setFormData({ name: '', document: '', email: '', phone: '', bookingId: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Hóspede">
      <form onSubmit={handleSubmit} className="space-y-4 !m-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nome Completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400 outline-none transition-all"
            placeholder="Ex: João Silva"
            required
          />
        </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              CPF ou Passaporte
            </label>
            <input
              type="text"
              name="document"
              value={formData.document}
              onChange={handleChange}
              className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400 outline-none transition-all"
              placeholder="000.000.000-00"
              required
            />
          </div>
          
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400 outline-none transition-all"
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Vincular a Reserva (opcional)
          </label>
          <select
            name="bookingId"
            value={formData.bookingId}
            onChange={handleChange}
            className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400 outline-none transition-all bg-white"
          >
            <option value="">Nenhuma reserva</option>
            {availableBookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                #{booking.id} - {booking.hotel} ({booking.checkIn})
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} fullWidth className='!mt-4'>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" fullWidth className='!mt-4'>
            Cadastrar Hóspede
          </Button>
        </div>
      </form>
    </Modal>
  );
}
