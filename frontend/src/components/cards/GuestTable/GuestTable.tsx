import { User, FileText, Phone, Mail, Building2 } from 'lucide-react';
import './index.css';

interface Booking {
  id: string;
  hotel: { id: string; name: string };
  checkInDate: string;
}

interface Guest {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  bookings: Booking[];
}

interface GuestTableProps {
  guests: Guest[];
}

export default function GuestTable({ guests }: GuestTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="guest-table-container">
      <table className="guest-table">
        <thead>
          <tr>
            <th>
              <div>
                <User />
                Nome
              </div>
            </th>
            <th>
              <div>
                <FileText />
                Documento
              </div>
            </th>
            <th>
              <div>
                <Phone />
                Telefone
              </div>
            </th>
            <th>
              <div>
                <Mail />
                Email
              </div>
            </th>
            <th>
              <div>
                <Building2 />
                Reservas
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>
                <span className="guest-name">{guest.name}</span>
              </td>
              <td>
                <span>{guest.document}</span>
              </td>
              <td>
                <span>{guest.phone}</span>
              </td>
              <td>
                <span>{guest.email}</span>
              </td>
              <td>
                {guest.bookings && guest.bookings.length > 0 ? (
                  <div className="guest-bookings">
                    {guest.bookings.map((booking) => (
                      <span key={booking.id} className="guest-booking-badge">
                        {booking.hotel?.name} - {formatDate(booking.checkInDate)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="no-booking">Sem reserva</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {guests.length === 0 && (
        <div className="guest-table-empty">
          Nenhum hóspede encontrado
        </div>
      )}
    </div>
  );
}
