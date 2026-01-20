import { Building2, Users, CalendarCheck } from "lucide-react";
import { PageLayout } from "@/components/layout";
import { StatCard } from "@/components/cards";
import './index.css';

export default function HomePage() {
  const stats = {
    hotels: 12,
    guests: 48,
    bookings: 25,
  };

  return (
    <PageLayout title="Dashboard" description="Visão geral do sistema de gerenciamento de hotéis">
      <div className="home-stats-grid">
        <StatCard
          title="Hotéis Cadastrados"
          value={stats.hotels}
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Hóspedes Ativos"
          value={stats.guests}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Reservas"
          value={stats.bookings}
          icon={CalendarCheck}
          color="purple"
        />
      </div>
    </PageLayout>
  );
}
