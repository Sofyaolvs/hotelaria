import { useState, useEffect } from 'react';
import { HotelCard } from "@/components/cards";
import { PageLayout } from "@/components/layout";
import { HotelFormModal } from "@/components/modals";
import { hotelService } from '@/services/api';
import './index.css';

interface Hotel {
  id: string;
  name: string;
  city: string;
  rooms: number;
}

export default function HotelPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hotelService.getAll();
      setHotels(data);
    } catch (err) {
      setError('Erro ao carregar hotéis');
      console.error('Erro ao buscar hotéis:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleAddHotel = () => {
    setIsModalOpen(true);
  };

  const handleHotelCreated = () => {
    fetchHotels();
  };

  const handleDeleteHotel = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este hotel?')) return;

    try {
      await hotelService.delete(id);
      fetchHotels();
    } catch (err) {
      console.error('Erro ao deletar hotel:', err);
      alert('Erro ao excluir hotel');
    }
  };

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
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="hotel-grid">
          {hotels.length === 0 ? (
            <p>Nenhum hotel cadastrado</p>
          ) : (
            hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                city={hotel.city}
                rooms={hotel.rooms}
                onDelete={handleDeleteHotel}
              />
            ))
          )}
        </div>
      )}

      <HotelFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleHotelCreated}
      />
    </PageLayout>
  );
}
