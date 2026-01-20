import { Building2, Users, CalendarCheck } from "lucide-react";
import { PageLayout } from "@/components/layout";
import { StatCard } from "@/components/cards";

export default function HomePage() {
  const stats = {
    hotels: 12,
    guests: 48,
    bookings: 25,
  };

  const recentBookings = [
    { id: 1, hotel: "Hotel Central", guest: "João Silva", checkIn: "20/01", checkOut: "25/01" },
    { id: 2, hotel: "Hotel Plaza", guest: "Maria Santos", checkIn: "22/01", checkOut: "28/01" },
    { id: 3, hotel: "Hotel Central", guest: "Pedro Lima", checkIn: "23/01", checkOut: "26/01" },
    { id: 4, hotel: "Hotel Praia", guest: "Ana Costa", checkIn: "24/01", checkOut: "30/01" },
  ];

  return (
    <PageLayout title="Dashboard" description="Visão geral do sistema de gerenciamento de hotéis">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 !mt-6">
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