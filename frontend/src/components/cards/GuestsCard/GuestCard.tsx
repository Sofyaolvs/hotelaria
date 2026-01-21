import { Building2, Calendar, User, FileText, Phone, BedDouble } from "lucide-react";
import './index.css';

interface Guest {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
}

interface BookingWithGuests {
  id: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: Guest[];
}

interface BookingGuestsCardProps {
  bookings: BookingWithGuests[];
}

export default function GuestCard({ bookings }: BookingGuestsCardProps) {
  return (
    <div className="guest-cards-container">
      {bookings.map((booking) => (
        <div key={booking.id} className="guest-card">
          <div className="guest-card-header">
            <div className="guest-card-hotel">
              <Building2 />
              <div className="guest-card-hotel-info">
                <p>{booking.hotel}</p>
                <span>Reserva #{booking.id}</span>
              </div>
            </div>

            <div className="guest-card-meta">
              <div className="guest-card-meta-item">
                <BedDouble />
                <span>{booking.roomType}</span>
              </div>

              <div className="guest-card-meta-item">
                <Calendar />
                <span>{booking.checkIn} → {booking.checkOut}</span>
              </div>

              <span className="guest-card-badge">
                {booking.guests.length} hóspede{booking.guests.length !== 1 && "s"}
              </span>
            </div>
          </div>

          <div className="guest-card-body">
            {booking.guests.length > 0 ? (
              <div className="guest-card-guests">
                {booking.guests.map((guest) => (
                  <div key={guest.id} className="guest-card-guest-row">
                    <div className="guest-card-guest-info">
                      <div>
                        <User />
                        <span>{guest.name}</span>
                      </div>
                    </div>

                    <div className="guest-card-guest-info">
                      <div>
                        <Phone />
                        <span className="secondary">{guest.phone}</span>
                      </div>
                    </div>

                    <div className="guest-card-guest-info">
                      <div>
                        <FileText />
                        <span className="secondary">{guest.document}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="guest-card-empty">Nenhum hóspede cadastrado</p>
            )}
          </div>
        </div>
      ))}

      {bookings.length === 0 && (
        <div className="guest-cards-empty">
          Nenhuma reserva encontrada
        </div>
      )}
    </div>
  );
}
