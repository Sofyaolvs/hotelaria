import { useState } from 'react';
import Modal from './Modal';
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
      <form onSubmit={handleSubmit} className="space-y-4 !m-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Hotel
          </label>
          <select
            name="hotel"
            value={formData.hotel}
            onChange={handleChange}
            className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400 outline-none transition-all bg-white"
            required
          >
            <option value="">Selecione um hotel</option>
            <option value="Pousada Cumbuco">Pousada Cumbuco</option>
            <option value="Hotel Gran Marquise">Hotel Gran Marquise</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Responsável
          </label>
          <select
            name="guest"
            value={formData.guest}
            onChange={handleChange}
            className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400 outline-none transition-all bg-white"
            required
          >
            <option value="">Selecione o responsável</option>
            <option value="João Silva">João Silva</option>
            <option value="Maria Santos">Maria Santos</option>
            <option value="Carlos Oliveira">Carlos Oliveira</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Check-in
            </label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Check-out
            </label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Tipo de Quarto
          </label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400 outline-none transition-all bg-white"
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suíte</option>
            <option value="presidential">Presidencial</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} fullWidth className='!mt-4'>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" fullWidth className='!mt-4'>
            Criar Reserva
          </Button>
        </div>
      </form>
    </Modal>
  );
}
