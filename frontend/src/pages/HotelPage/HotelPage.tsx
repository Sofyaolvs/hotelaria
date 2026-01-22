import { useState, useEffect } from 'react';
import { HotelCard } from "@/components/cards";
import { PageLayout } from "@/components/layout";
import { HotelFormModal, ConfirmModal } from "@/components/modals";
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
  const [search, setSearch] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteHotel = (id: string) => {
    setHotelToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteHotel = async () => {
    if (!hotelToDelete) return;

    try {
      setIsDeleting(true);
      await hotelService.delete(hotelToDelete);
      fetchHotels();
      setIsConfirmModalOpen(false);
      setHotelToDelete(null);
    } catch (err) {
      console.error('Erro ao deletar hotel:', err);
      alert('Erro ao excluir hotel');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredHotels = hotels.filter((hotel) => {
    const searchLower = search.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(searchLower) ||
      hotel.city.toLowerCase().includes(searchLower)
    );
  });

  return (
    <PageLayout
      title="Hotéis"
      description="Gerencie todos seus hotéis cadastrados"
      showAddButton
      addButtonLabel="Novo Hotel"
      onAddClick={handleAddHotel}
      showSearchBar
      searchPlaceholder="Buscar hotéis por nome ou cidade"
      searchValue={search}
      onSearchChange={setSearch}
    >
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="hotel-grid">
          {filteredHotels.length === 0 ? (
            <p>{search ? 'Nenhum hotel encontrado' : 'Nenhum hotel cadastrado'}</p>
          ) : (
            filteredHotels.map((hotel) => (
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

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setHotelToDelete(null);
        }}
        onConfirm={confirmDeleteHotel}
        title="Excluir Hotel"
        message="Tem certeza que deseja excluir este hotel?"
        warning="Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        isLoading={isDeleting}
      />
    </PageLayout>
  );
}
