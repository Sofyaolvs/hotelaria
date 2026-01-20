import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: "blue" | "green" | "purple" | "orange";
}

const colorClasses = {
  blue: "text-blue-500",
  green: "text-green-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
};

export default function StatCard({ title, value, icon: Icon, color = "blue" }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm !p-6 flex items-center gap-4">
      <Icon className={`${colorClasses[color]}`} />
      <div>
        <p className="text-sm text-slate-600">{title}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
