import { useState, useEffect } from 'react';
import { GuestCard } from "@/components/cards";
import { PageLayout } from "@/components/layout";
import { GuestFormModal } from "@/components/modals";
import { bookingService } from '@/services/api';
import './index.css';

interface Guest {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingService.getAll();
      // Filtra apenas reservas que têm hóspedes
      const bookingsWithGuests = data.filter((b: Booking) => b.guests && b.guests.length > 0);
      setBookings(bookingsWithGuests);
    } catch (err) {
      setError('Erro ao carregar hóspedes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAddGuest = () => {
    setIsModalOpen(true);
  };

  const handleGuestCreated = () => {
    fetchBookings();
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

  return (
    <PageLayout
      title="Hóspedes"
      description="Hóspedes cadastrados por reserva"
      showAddButton
      addButtonLabel="Novo Hóspede"
      onAddClick={handleAddGuest}
      showSearchBar
      searchPlaceholder="Buscar hóspedes por nome ou documento"
    >
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        formattedBookings.length > 0 ? (
          <GuestCard bookings={formattedBookings} />
        ) : (
          <div className="empty-state">
            <p>Nenhum hóspede cadastrado ainda.</p>
            <p>Crie uma reserva primeiro e depois cadastre os hóspedes.</p>
          </div>
        )
      )}

      <GuestFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleGuestCreated}
      />
    </PageLayout>
  );
}
