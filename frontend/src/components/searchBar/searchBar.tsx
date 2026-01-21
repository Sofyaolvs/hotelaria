import { Search } from "lucide-react";
import './index.css';

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <Search />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}
