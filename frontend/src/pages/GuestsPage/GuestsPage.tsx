import { useState, useEffect } from 'react';
import { GuestCard } from "@/components/cards";
import { PageLayout } from "@/components/layout";
import { GuestFormModal, AssociateGuestModal } from "@/components/modals";
import { bookingService, guestService } from '@/services/api';
import { Link2 } from 'lucide-react';
import './index.css';

interface Guest {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  bookings?: { id: string; hotel: { name: string } }[];
}

interface Booking {
  id: string;
  hotel: { id: string; name: string };
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  guests: Guest[];
}

export default function GuestsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orphanGuests, setOrphanGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [bookingsData, allGuests] = await Promise.all([
        bookingService.getAll(),
        guestService.getAll()
      ]);

      // Reservas que têm hóspedes
      const bookingsWithGuests = bookingsData.filter((b: Booking) => b.guests && b.guests.length > 0);
      setBookings(bookingsWithGuests);

      // IDs de hóspedes que estão em alguma reserva
      const guestsInBookings = new Set<string>();
      bookingsData.forEach((booking: Booking) => {
        booking.guests?.forEach((guest: Guest) => {
          guestsInBookings.add(guest.id);
        });
      });

      // Hóspedes que não estão em nenhuma reserva
      const guestsWithoutBooking = allGuests.filter((guest: Guest) => !guestsInBookings.has(guest.id));
      setOrphanGuests(guestsWithoutBooking);
    } catch (err) {
      setError('Erro ao carregar hóspedes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddGuest = () => {
    setIsModalOpen(true);
  };

  const handleGuestCreated = () => {
    fetchData();
  };

  const handleAssociateGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsAssociateModalOpen(true);
  };

  const handleAssociateSuccess = () => {
    fetchData();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const formattedBookings = bookings.map(booking => ({
    id: booking.id,
    hotel: booking.hotel?.name || 'Hotel não informado',
    checkIn: formatDate(booking.checkInDate),
    checkOut: formatDate(booking.checkOutDate),
    roomType: booking.roomType || 'N/A',
    guests: booking.guests || [],
  }));

  const filteredBookings = formattedBookings.filter((booking) => {
    const searchLower = search.toLowerCase();
    const hasMatchingGuest = booking.guests.some(
      (guest) =>
        guest.name.toLowerCase().includes(searchLower) ||
        guest.document.toLowerCase().includes(searchLower)
    );
    return hasMatchingGuest || booking.hotel.toLowerCase().includes(searchLower);
  });

  const filteredOrphanGuests = orphanGuests.filter((guest) => {
    const searchLower = search.toLowerCase();
    return (
      guest.name.toLowerCase().includes(searchLower) ||
      guest.document.toLowerCase().includes(searchLower)
    );
  });

  const hasOrphanGuests = filteredOrphanGuests.length > 0;
  const hasBookingsWithGuests = filteredBookings.length > 0;

  return (
    <PageLayout
      title="Hóspedes"
      description="Hóspedes cadastrados por reserva"
      showAddButton
      addButtonLabel="Novo Hóspede"
      onAddClick={handleAddGuest}
      showSearchBar
      searchPlaceholder="Buscar hóspedes por nome ou documento"
      searchValue={search}
      onSearchChange={setSearch}
    >
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          {/* Hóspedes sem reserva */}
          {hasOrphanGuests && (
            <div className="orphan-guests-section">
              <h3 className="section-title">Hóspedes sem reserva</h3>
              <div className="orphan-guests-list">
                {filteredOrphanGuests.map((guest) => (
                  <div key={guest.id} className="orphan-guest-card">
                    <div className="orphan-guest-info">
                      <span className="orphan-guest-name">{guest.name}</span>
                      <span className="orphan-guest-document">{guest.document}</span>
                      <span className="orphan-guest-contact">{guest.phone}</span>
                    </div>
                    <button
                      className="associate-btn"
                      onClick={() => handleAssociateGuest(guest)}
                      title="Associar a uma reserva"
                    >
                      <Link2 size={16} />
                      Associar a Reserva
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hóspedes em reservas */}
          {hasBookingsWithGuests && (
            <>
              {hasOrphanGuests && <h3 className="section-title">Hóspedes em reservas</h3>}
              <GuestCard bookings={filteredBookings} />
            </>
          )}

          {/* Estado vazio */}
          {!hasBookingsWithGuests && !hasOrphanGuests && (
            <div className="empty-state">
              {search ? (
                <p>Nenhum hóspede encontrado.</p>
              ) : (
                <>
                  <p>Nenhum hóspede cadastrado ainda.</p>
                  <p>Clique em "Novo Hóspede" para cadastrar.</p>
                </>
              )}
            </div>
          )}
        </>
      )}

      <GuestFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleGuestCreated}
      />

      <AssociateGuestModal
        isOpen={isAssociateModalOpen}
        onClose={() => {
          setIsAssociateModalOpen(false);
          setSelectedGuest(null);
        }}
        onSuccess={handleAssociateSuccess}
        guest={selectedGuest}
      />
    </PageLayout>
  );
}
