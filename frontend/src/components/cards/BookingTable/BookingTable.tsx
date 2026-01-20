import { Calendar, Building2, User, BedDouble } from 'lucide-react';
import './index.css';

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
    <div className="booking-table-container">
      <table className="booking-table">
        <thead>
          <tr>
            <th>
              <div>
                <Building2 />
                Hotel
              </div>
            </th>
            <th>
              <div>
                <User />
                Responsável
              </div>
            </th>
            <th>
              <div>
                <BedDouble />
                Tipo de Quarto
              </div>
            </th>
            <th>
              <div>
                <Calendar />
                Check-in
              </div>
            </th>
            <th>
              <div>
                <Calendar />
                Check-out
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <span className="hotel-name">{booking.hotel}</span>
              </td>
              <td>
                <span>{booking.guest}</span>
              </td>
              <td>
                <span>{booking.roomType}</span>
              </td>
              <td>
                <span>{booking.checkIn}</span>
              </td>
              <td>
                <span>{booking.checkOut}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {bookings.length === 0 && (
        <div className="booking-table-empty">
          Nenhuma reserva encontrada
        </div>
      )}
    </div>
  );
}
