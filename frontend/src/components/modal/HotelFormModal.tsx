import { useState } from 'react';
import Modal from './Modal';
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
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Hotel" >
      <form onSubmit={handleSubmit} className="space-y-4 !m-6 ">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nome do Hotel
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400 outline-none transition-all"
            placeholder="Ex: Hotel Gran Marquise"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Cidade
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full !px-4 !py-3 border border-slate-300 rounded-xl focus:border-secondary-400  outline-none transition-all"
              placeholder="Ex: Fortaleza"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Quartos
            </label>
            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              className="w-full !px-4 !py-3 border border-slate-300 rounded-xl  focus:border-secondary-400  outline-none transition-all"
              placeholder="Ex: 120"
              required
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} fullWidth className='!mt-4'>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" fullWidth className='!mt-4'>
            Cadastrar Hotel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
