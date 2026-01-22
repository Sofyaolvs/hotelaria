import { useState, useEffect } from 'react';
import { PageLayout } from "@/components/layout";
import { BookingTable } from "@/components/cards";
import { BookingFormModal, ConfirmModal } from "@/components/modals";
import './index.css';
import { bookingService } from '@/services/api';

interface Booking {
  id: number;
  hotel: { id: number; name: string };
  responsibleName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
}


export default function BookingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBooking = async() => {
    try {
      setLoading(true)
      setError(null)
      const data = await bookingService.getAll()
      setBookings(data)
    } catch (error) {
      setError('Erro ao carregar reservas')
      console.log('Erro ao carregar reservas:', error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooking()
  }, [])

  const handleAddBooking = () => {
    setIsModalOpen(true)
  }

  const handleBookingCreated=()=>{
    fetchBooking()
  }

  const handleDeleteBooking = (id: number) => {
    setBookingToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteBooking = async () => {
    if (!bookingToDelete) return;

    try {
      setIsDeleting(true);
      await bookingService.delete(bookingToDelete);
      fetchBooking();
      setIsConfirmModalOpen(false);
      setBookingToDelete(null);
    } catch (error) {
      console.log('Erro ao deletar reserva:', error);
      alert('Erro ao deletar reserva');
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedBookings = bookings.map(b => ({
      id: b.id,
      hotel: b.hotel?.name || 'N/A',
      guest: b.responsibleName || 'N/A',
      roomType: b.roomType || 'N/A',
      checkIn: new Date(b.checkInDate).toLocaleDateString('pt-BR'),
      checkOut: new Date(b.checkOutDate).toLocaleDateString('pt-BR'),
  }));

  const filteredBookings = formattedBookings.filter((booking) => {
    const searchLower = search.toLowerCase();
    return (
      booking.hotel.toLowerCase().includes(searchLower) ||
      booking.guest.toLowerCase().includes(searchLower)
    );
  });

  return (
    <PageLayout
      title="Reservas"
      description="Gerencie todas as reservas"
      showAddButton
      addButtonLabel="Nova Reserva"
      onAddClick={handleAddBooking}
      showSearchBar
      searchPlaceholder="Buscar reservas por hóspede ou hotel"
      searchValue={search}
      onSearchChange={setSearch}
    >
      {loading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar reservas</p>}

      {!loading && !error && (
        <div>
          <BookingTable bookings={filteredBookings} onDelete={handleDeleteBooking} />
        </div>
      )}

      <BookingFormModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSuccess={handleBookingCreated}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setBookingToDelete(null);
        }}
        onConfirm={confirmDeleteBooking}
        title="Excluir Reserva"
        message="Tem certeza que deseja excluir esta reserva?"
        warning="Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        isLoading={isDeleting}
      />
    </PageLayout>
  )
}
