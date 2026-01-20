import { useState } from 'react';
import { PageLayout } from "@/components/layout";
import { BookingTable } from "@/components/cards";
import { BookingFormModal } from "@/components/modal";

const mockBookings = [
  {
    id: 1,
    hotel: 'Pousada Cumbuco',
    guest: 'João Silva',
    roomType: 'Suíte Master',
    checkIn: '20/01/2026',
    checkOut: '25/01/2026',
  },
  {
    id: 2,
    hotel: 'Hotel Gran Marquise',
    guest: 'Maria Santos',
    roomType: 'Quarto Standard',
    checkIn: '22/01/2026',
    checkOut: '28/01/2026',
  },
  {
    id: 3,
    hotel: 'Pousada Cumbuco',
    guest: 'Carlos Oliveira',
    roomType: 'Quarto Duplo',
    checkIn: '15/01/2026',
    checkOut: '18/01/2026',
  },
  {
    id: 4,
    hotel: 'Hotel Gran Marquise',
    guest: 'Ana Costa',
    roomType: 'Suíte Presidencial',
    checkIn: '25/01/2026',
    checkOut: '30/01/2026',
  },
];

export default function BookingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBooking = () => {
    setIsModalOpen(true);
  }

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
      <div className="mt-6">
        <BookingTable bookings={mockBookings} />
      </div>

      <BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageLayout>
  )
}
