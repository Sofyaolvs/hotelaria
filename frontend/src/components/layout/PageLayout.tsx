import type { ReactNode } from 'react';
import { Header } from '../header';
import SearchBar from '../searchBar/searchBar';

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
    <div className="flex-1 flex flex-col !m-4">
      <Header
        title={title}
        description={description}
        showAddButton={showAddButton}
        addButtonLabel={addButtonLabel}
        onAddClick={onAddClick}
      />
      <main className="flex-1 p-8 !mt-4">
        {showSearchBar && <SearchBar placeholder={searchPlaceholder} />}
        {children}
      </main>
    </div>
  );
}
