import { useState, useEffect } from 'react';
import { PageLayout } from "@/components/layout";
import { BookingTable } from "@/components/cards";
import { BookingFormModal } from "@/components/modals";
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

  const handleDeleteBooking= async(id:number)=>{
    try{
    await bookingService.delete(id)
    fetchBooking()
    }catch(error){
      console.log('Erro ao deletar reserva:', error)
      alert('Erro ao deletar reserva')
    }
  }

  const formattedBookings = bookings.map(b => ({
      id: b.id,
      hotel: b.hotel?.name || 'N/A',
      guest: b.responsibleName || 'N/A',
      roomType: b.roomType || 'N/A',
      checkIn: new Date(b.checkInDate).toLocaleDateString('pt-BR'),
      checkOut: new Date(b.checkOutDate).toLocaleDateString('pt-BR'),
  }));

  return (
    <PageLayout
      title="Reservas"
      description="Gerencie todas as reservas"
      showAddButton
      addButtonLabel="Nova Reserva"
      onAddClick={handleAddBooking}
      showSearchBar
      searchPlaceholder="Buscar reservas por hóspede ou hotel"
    >
      {loading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar reservas</p>}
      
      {!loading && !error && (
        <div>
          <BookingTable bookings={formattedBookings} onDelete={handleDeleteBooking} />
        </div>
      )}

      <BookingFormModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      onSuccess={handleBookingCreated} 
      />
    </PageLayout>
  )
}
