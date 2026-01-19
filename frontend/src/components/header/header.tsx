import { Plus } from 'lucide-react';
import Button from '../button/button';

interface HeaderProps {
  title: string;
  description: string;
  showAddButton?: boolean;
  addButtonLabel?: string;
  onAddClick?: () => void;
}

const pageConfig: Record<string, { title: string; description: string; showAddButton: boolean; addButtonLabel?: string }> = {
  dashboard: {
    title: 'Dashboard',
    description: 'Visão geral do sistema',
    showAddButton: false,
  },
  hotels: {
    title: 'Hotéis',
    description: 'Gerencie todos seus hotéis cadastrados',
    showAddButton: true,
    addButtonLabel: 'Novo Hotel',
  },
  reservas: {
    title: 'Reservas',
    description: 'Gerencie todas as reservas cadastradas',
    showAddButton: true,
    addButtonLabel: 'Nova Reserva',
  },
  hospedes: {
    title: 'Hóspedes',
    description: 'Gerencie os hóspedes cadastrados',
    showAddButton: true,
    addButtonLabel: 'Novo Hóspede',
  },
};

export function getHeaderConfig(route: string) {
  return pageConfig[route] || pageConfig.dashboard;
}

export default function Header({
  title,
  description,
  showAddButton = false,
  addButtonLabel = 'Adicionar',
  onAddClick,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-6 px-8">
      <div>
        <h1 className="text-4xl font-bold text-primary-900 ">{title}</h1>
        <p className="text-md text-slate-600 mt-1">{description}</p>
      </div>

      {showAddButton && (
        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-5 h-5" />}
          onClick={onAddClick}
        >
          {addButtonLabel}
        </Button>
      )}

    </header>
  );
}
