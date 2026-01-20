import { Building2, MapPin } from 'lucide-react';
import './index.css';

interface HotelCardProps {
  name: string;
  city: string;
  rooms: number;
}

export default function HotelCard({ name, city, rooms }: HotelCardProps) {
  return (
    <div className="hotel-card">
      <div className="hotel-card-image">
        <Building2 />
      </div>
      <div className="hotel-card-content">
        <h3>{name}</h3>
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
