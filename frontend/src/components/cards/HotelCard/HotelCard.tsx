import { Building2, MapPin, Trash2 } from 'lucide-react';
import './index.css';

interface HotelCardProps {
  id: string;
  name: string;
  city: string;
  rooms: number;
  onDelete?: (id: string) => void;
}

export default function HotelCard({ id, name, city, rooms, onDelete }: HotelCardProps) {
  return (
    <div className="hotel-card">
      <div className="hotel-card-image">
        <Building2 />
      </div>
      <div className="hotel-card-content">
        <div className="hotel-card-header">
          <h3>{name}</h3>
          {onDelete && (
            <button
              className="hotel-card-delete"
              onClick={() => onDelete(id)}
              title="Excluir hotel"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
        <div className="hotel-card-info">
          <div className="hotel-card-info-row">
            <MapPin />
            <span>{city}</span>
          </div>
          <div className="hotel-card-info-row hotel-card-rooms">
            <span>{rooms} quartos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
