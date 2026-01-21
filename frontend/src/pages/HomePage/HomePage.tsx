import { useState, useEffect } from "react";
import { Building2, Users, CalendarCheck } from "lucide-react";
import { PageLayout } from "@/components/layout";
import { StatCard } from "@/components/cards";
import { hotelService, bookingService, guestService } from "@/services/api";
import './index.css';

export default function HomePage() {
  const [stats, setStats] = useState({
    hotels: 0,
    guests: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [hotels, bookings, guests] = await Promise.all([
          hotelService.getAll(),
          bookingService.getAll(),
          guestService.getAll(),
        ]);

        setStats({
          hotels: hotels.length,
          guests: guests.length,
          bookings: bookings.length,
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <PageLayout title="Dashboard" description="Visão geral do sistema de gerenciamento de hotéis">
      <div className="home-stats-grid">
        <StatCard
          title="Hotéis Cadastrados"
          value={loading ? '-' : stats.hotels}
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Hóspedes Ativos"
          value={loading ? '-' : stats.guests}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Reservas"
          value={loading ? '-' : stats.bookings}
          icon={CalendarCheck}
          color="purple"
        />
      </div>
    </PageLayout>
  );
}
