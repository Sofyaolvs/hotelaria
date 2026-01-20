import { useState } from 'react';
import { GuestCard } from "@/components/cards";
import { PageLayout } from "@/components/layout";
import { GuestFormModal } from "@/components/modal";

export default function GuestsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddGuest = () => {
    setIsModalOpen(true);
  }

  const bookings = [
    {
      id: 1,
      hotel: 'Hotel Central',
      checkIn: '20/01',
      checkOut: '25/01',
      roomType: 'Suíte Master',
      guests: [
        { id: 1, name: 'João Silva', document: '123.456.789-00', phone: '(11) 99999-1234', email: 'joao@email.com' },
        { id: 2, name: 'Maria Silva', document: '987.654.321-00', phone: '(11) 99999-5678', email: 'maria@email.com' },
      ],
    },
    {
      id: 2,
      hotel: 'Hotel Plaza',
      checkIn: '22/01',
      checkOut: '28/01',
      roomType: 'Quarto Standard',
      guests: [
        { id: 3, name: 'Pedro Santos', document: '111.222.333-44', phone: '(21) 98888-4321', email: 'pedro@email.com' },
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

      <GuestFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageLayout>
  )
}
