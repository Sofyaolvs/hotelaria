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
        {showSearchBar && <SearchBar placeholder={searchPlaceholder} />}
        {children}
      </main>
    </div>
  );
}
