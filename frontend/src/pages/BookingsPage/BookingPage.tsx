import { PageLayout } from "@/components/layout";
import { BookingTable } from "@/components/cards";

const mockBookings = [
  {
    id: 1,
    hotel: 'Pousada Cumbuco',
    guest: 'João Silva',
    checkIn: '20/01/2026',
    checkOut: '25/01/2026',
  },
  {
    id: 2,
    hotel: 'Hotel Gran Marquise',
    guest: 'Maria Santos',
    checkIn: '22/01/2026',
    checkOut: '28/01/2026',
  },
  {
    id: 3,
    hotel: 'Pousada Cumbuco',
    guest: 'Carlos Oliveira',
    checkIn: '15/01/2026',
    checkOut: '18/01/2026',
  },
  {
    id: 4,
    hotel: 'Hotel Gran Marquise',
    guest: 'Ana Costa',
    checkIn: '25/01/2026',
    checkOut: '30/01/2026',
  },
];

export default function BookingPage() {
  const handleAddBooking = () => {
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
    </PageLayout>
  )
}