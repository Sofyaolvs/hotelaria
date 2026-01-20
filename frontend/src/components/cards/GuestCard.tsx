import { Building2, Calendar, User, FileText, Phone, Mail, BedDouble } from "lucide-react";

interface Guest {
  id: number;
  name: string;
  document: string;
  phone: string;
  email: string;
}

interface BookingWithGuests {
  id: number;
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
    <div className="w-full flex gap-6 !px-4 !mt-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm w-full overflow-hidden flex flex-col"
        >
          <div className="bg-secondary-800 !px-6 !py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Building2 className="w-5 h-5" />
              <div className="leading-tight">
                <p className="font-semibold">{booking.hotel}</p>
                <span className="text-sm text-white/80">
                  Reserva #{booking.id}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <BedDouble className="w-4 h-4" />
                <span className="text-sm font-semibold">{booking.roomType}</span>
              </div>

              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {booking.checkIn} → {booking.checkOut}
                </span>
              </div>

              <span className="text-sm px-3! py-1! rounded-2xl bg-secondary-500 font-bold text-white">
                {booking.guests.length} hóspede
                {booking.guests.length !== 1 && "s"}
              </span>
            </div>
          </div>



          <div className="px-5 py-4 flex-1">
            {booking.guests.length > 0 ? (
              <div className="flex flex-col gap-3">
                {booking.guests.map((guest) => (
                  <div
                    key={guest.id}
                    className="grid grid-cols-3 gap-4 !px-4 !py-3 bg-slate-50 border-b border-slate-300"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-secondary-900" />
                        <span className="font-medium text-slate-800">{guest.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-secondary-900" />
                      <span className="text-sm text-slate-600">{guest.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-secondary-900" />
                        <span className="text-sm text-slate-600">{guest.document}</span>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm text-center py-6">
                Nenhum hóspede cadastrado
              </p>
            )}
          </div>
        </div>
      ))}

      {bookings.length === 0 && (
        <div className="py-12 text-center text-slate-500 w-full">
          Nenhuma reserva encontrada
        </div>
      )}
    </div>
  );
}
