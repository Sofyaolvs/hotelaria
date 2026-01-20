import { useState } from 'react';
import { HotelCard } from "@/components/cards";
import { PageLayout } from "@/components/layout";
import { HotelFormModal } from "@/components/modals";
import './index.css';

const mockHotels = [
  { id: 1, name: 'Pousada cumbuco', city: 'Cumbuco', rooms: 120 },
  { id: 2, name: 'Hotel Gran Marquise', city: 'Fortaleza', rooms: 300 },
]

export default function HotelPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddHotel = () => {
    setIsModalOpen(true);
  }

  return (
    <PageLayout
      title="Hotéis"
      description="Gerencie todos seus hotéis cadastrados"
      showAddButton
      addButtonLabel="Novo Hotel"
      onAddClick={handleAddHotel}
      showSearchBar
      searchPlaceholder="Buscar hotéis por nome ou cidade"
    >
      <div className="hotel-grid">
        {mockHotels.map((hotel) => (
          <HotelCard key={hotel.id} name={hotel.name} city={hotel.city} rooms={hotel.rooms} />
        ))}
      </div>

      <HotelFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageLayout>
  );
}
