import type { ReactNode } from 'react';
import { Header } from '../header';
import SearchBar from '../searchBar/searchBar';
import './index.css';

interface PageLayoutProps {
  title: string;
  description: string;
  showAddButton?: boolean;
  addButtonLabel?: string;
  onAddClick?: () => void;
  showSearchBar?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children?: ReactNode;
}

export default function PageLayout({
  title,
  description,
  showAddButton = false,
  addButtonLabel = 'Adicionar',
  onAddClick,
  showSearchBar = false,
  searchPlaceholder = '',
  searchValue,
  onSearchChange,
  children,
}: PageLayoutProps) {
  return (
    <div className="page-layout">
      <Header
        title={title}
        description={description}
        showAddButton={showAddButton}
        addButtonLabel={addButtonLabel}
        onAddClick={onAddClick}
      />
      <main>
        {showSearchBar && (
          <SearchBar
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
          />
        )}
        {children}
      </main>
    </div>
  );
}
