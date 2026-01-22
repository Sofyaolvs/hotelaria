import {
  LayoutGrid,
  Building2,
  Calendar,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import './index.css';

interface SideBarProps {
  activeItem: string;
  onNavigate: (route: string) => void;
  onLogout?: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function SideBar({ activeItem, onNavigate, onLogout, isOpen, onToggle }: SideBarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'hotels', label: 'Hotéis', icon: Building2 },
    { id: 'reservas', label: 'Reservas', icon: Calendar },
    { id: 'hospedes', label: 'Hóspedes', icon: Users },
  ];

  const handleNavigate = (route: string) => {
    onNavigate(route);
    if (onToggle && isOpen) {
      onToggle();
    }
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={onToggle}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onToggle} />

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
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
                onClick={() => handleNavigate(item.id)}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={onLogout}>
            <LogOut />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </div>
    </>
  );
}
