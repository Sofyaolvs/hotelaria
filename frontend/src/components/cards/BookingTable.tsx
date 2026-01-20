import { Calendar, Building2, User, BedDouble } from 'lucide-react';

interface Booking {
  id: number;
  hotel: string;
  guest: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
}

interface BookingTableProps {
  bookings: Booking[];
}

export default function BookingTable({ bookings }: BookingTableProps) {
  return (
    <div className=" border-none overflow-hidden ">
      <table className="w-full table-fixed">
        <thead>
          <tr className=" h-14">
            <th className="py-4 px-6 text-sm font-semibold text-primary-900 text-center">
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-6 h-6" />
                Hotel
              </div>
            </th>
            <th className="py-4 px-6 text-sm font-semibold text-primary-900 text-center">
              <div className="flex items-center justify-center gap-2">
                <User className="w-6 h-6" />
                Responsável
              </div>
            </th>
            <th className="py-4 px-6 text-sm font-semibold text-primary-900 text-center">
              <div className="flex items-center justify-center gap-2">
                <BedDouble className="w-6 h-6" />
                Tipo de Quarto
              </div>
            </th>
            <th className="py-4 px-6 text-sm font-semibold text-primary-900 text-center">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-6 h-6" />
                Check-in
              </div>
            </th>
            <th className="py-4 px-6 text-sm font-semibold text-primary-900 text-center">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-6 h-6" />
                Check-out
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-b border-b-slate-400 transition-colors h-16"
            >
              <td className="py-5 px-6 text-center">
                <span className="font-medium text-slate-800 text-lg">{booking.hotel}</span>
              </td>
              <td className="py-5 px-6 text-center">
                <span className="text-primary-900 text-lg">{booking.guest}</span>
              </td>
              <td className="py-5 px-6 text-center">
                <span className="text-primary-900 text-lg">{booking.roomType}</span>
              </td>
              <td className="py-5 px-6 text-center">
                <span className="text-primary-900 text-lg">{booking.checkIn}</span>
              </td>
              <td className="py-5 px-6 text-center">
                <span className="text-primary-900 text-lg">{booking.checkOut}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {bookings.length === 0 && (
        <div className="py-12 text-center text-slate-500">
          Nenhuma reserva encontrada
        </div>
      )}
    </div>
  );
}
