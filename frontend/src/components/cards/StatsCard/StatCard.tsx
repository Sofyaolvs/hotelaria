import type { LucideIcon } from "lucide-react";
import './index.css';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: "blue" | "green" | "purple" | "orange";
}

export default function StatCard({ title, value, icon: Icon, color = "blue" }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className={`stat-card-icon ${color}`}>
        <Icon size={32} />
      </div>
      <div className="stat-card-content">
        <p>{title}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}
