import { Building2, MapPin } from 'lucide-react';

interface HotelCardProps {
  name: string;
  city: string;
  rooms: number;
}

export default function HotelCard({ name, city, rooms }: HotelCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow m-4!">
      <div className="h-40 bg-secondary-600 flex items-center justify-center">
          <Building2 className="w-16 h-16 text-slate-100" />
      </div>
      <div className="p-4 !m-2">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{name}</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{city}</span>
          </div>
          <div className="flex items-center gap-2 text-primary-800 font-semibold">
            <span className="text-sm">{rooms} quartos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
