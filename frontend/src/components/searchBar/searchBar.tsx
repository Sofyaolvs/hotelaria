import { Search } from "lucide-react";
import './index.css';

interface SearchBarProps {
  placeholder: string;
}

const searchBarConfig: Record<string, { placeholder: string }> = {
  hotels: {
    placeholder: "Buscar hotéis por nome ou cidade"
  },
  reservas: {
    placeholder: "Buscar reservas por hóspede ou hotel"
  },
  hospedes: {
    placeholder: "Buscar hóspedes por nome, documento ou hotel"
  }
}

export function getSearchBarConfig(route: string) {
  return searchBarConfig[route] || searchBarConfig.hotels;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className="search-bar">
      <Search />
      <input type="text" placeholder={placeholder} />
    </div>
  )
}
