import { GuestCard } from "@/components/cards";
import { PageLayout } from "@/components/layout";

export default function GuestsPage() {
  const handleAddGuest = () => {
  }

  const bookings = [                                                                                                                                                     
    {
      id: 1,
      hotel: 'Hotel Central',
      checkIn: '20/01',
      checkOut: '25/01',
      guests: [
        { id: 1, name: 'João Silva', document: '123.456.789-00' },
        { id: 2, name: 'Maria Silva', document: '987.654.321-00' },
      ],
    },
    {
      id: 2,
      hotel: 'Hotel Plaza',
      checkIn: '22/01',
      checkOut: '28/01',
      guests: [
        { id: 3, name: 'Pedro Santos', document: '111.222.333-44' },
      ],
    },
  ];



  return (
    <PageLayout
      title="Hóspedes"
      description="Gerencie todos os hóspedes cadastrados"
      showAddButton
      addButtonLabel="Novo Hóspede"
      onAddClick={handleAddGuest}
      showSearchBar
      searchPlaceholder="Buscar hóspedes por nome ou documento"
    >

      <GuestCard bookings={bookings} />
    </PageLayout>
  )
}