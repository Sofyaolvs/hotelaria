import {
  LayoutGrid,
  Building2,
  Calendar,
  Users,
  LogOut,
} from 'lucide-react';
import './index.css';

interface SideBarProps {
  activeItem: string;
  onNavigate: (route: string) => void;
}

export default function SideBar({ activeItem, onNavigate }: SideBarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'hotels', label: 'Hotéis', icon: Building2 },
    { id: 'reservas', label: 'Reservas', icon: Calendar },
    { id: 'hospedes', label: 'Hóspedes', icon: Users },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Building2 />
          </div>
          <div>
            <h1 className="sidebar-title">Reservas.com</h1>
          </div>
        </div>
      </div>
      <div className="sidebar-divider"></div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout">
          <LogOut />
          <span>Sair do Sistema</span>
        </button>
      </div>
    </div>
  );
}
