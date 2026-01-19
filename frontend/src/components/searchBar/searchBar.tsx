import { Search } from "lucide-react";

interface SearchBarProps{
    placeholder: string;
}

const searchBarConfig: Record<string, {placeholder:string}> = {
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

export function getSearchBarConfig(route:string){
    return searchBarConfig[route] || searchBarConfig.hotels;
}


export default function SearchBar({placeholder}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 w-340 h-12 border-3 border-neutral-400 rounded-xl px-2 mx-auto">
      <Search className="w-6 h-6 text-neutral-400 gap-2 !ml-2"/>
      <input type="text" placeholder={placeholder} className="w-auto h-12 focus:outline-none text-neutral-700 font-medium " />
    </div>
  )
}