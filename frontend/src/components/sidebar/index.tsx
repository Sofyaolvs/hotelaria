import { useState } from 'react';
import {
  LayoutGrid,
  Building2,
  Calendar,
  Users,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import Button from '../button';

export default function SideBar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'hotels', label: 'Hotéis', icon: Building2 },
    { id: 'reservas', label: 'Reservas', icon: Calendar },
    { id: 'hospedes', label: 'Hóspedes', icon: Users },
  ];

  return (
    <div className="w-72 h-screen bg-slate-900 flex flex-col shadow-2xl">
      <div className="p-6 pb-16">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12  rounded-xl flex items-center justify-center ">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Reservas.com</h1>
          </div>
        </div>
      </div>
      <div className="my-16 border-t border-slate-700/50"></div>

      <nav className="flex-1 px-2 pb-12 flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              variant={isActive ? 'primary' : 'ghost'}
              size="xl"
              fullWidth
              icon={<Icon className="w-6 h-6" />}
              className={`justify-start ${isActive ? '!py-3' : '!py-3'}`}
            >
              <span className="flex-1 text-left">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      <div className="my-6 border-t border-slate-700/50"></div>

      <div className="p-4 mt-auto">
        <Button
          variant="secondary"
          fullWidth
          icon={<LogOut className="w-5 h-5" />}
        >
          Sair do Sistema
        </Button>
      </div>
    </div>
  );
}
