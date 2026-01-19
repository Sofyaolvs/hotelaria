import { HotelCard } from "@/components/cards";
import { PageLayout } from "@/components/layout";

const mockHotels = [
  { id: 1, name: 'Pousada cumbuco', city: 'Cumbuco', rooms: 120 },
  { id: 2, name: 'Hotel Gran Marquise', city: 'Fortaleza', rooms: 300 },
]

export default function HotelPage() {
  const handleAddHotel = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {mockHotels.map((hotel) => (
          <HotelCard key={hotel.id} name={hotel.name} city={hotel.city} rooms={hotel.rooms} />
        ))}
      </div>
    </PageLayout>
  );
}
