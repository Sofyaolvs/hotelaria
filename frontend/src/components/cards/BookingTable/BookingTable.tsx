import { Calendar, Building2, User, BedDouble, Trash2 } from 'lucide-react';
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
  onDelete?: (id: number) => void;
}

export default function BookingTable({ bookings, onDelete }: BookingTableProps) {
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
            {onDelete && <th></th>}
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
              {onDelete && (
                <td>
                  <button
                    className="booking-delete-btn"
                    onClick={() => onDelete(booking.id)}
                    title="Excluir reserva"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              )}
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
