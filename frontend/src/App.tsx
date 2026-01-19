import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/SideBar'
import { Header, getHeaderConfig } from './components/header'
import SearchBar, { getSearchBarConfig } from './components/searchBar/searchBar'

function App() {
  const [currentRoute, setCurrentRoute] = useState('dashboard')
  const headerConfig = getHeaderConfig(currentRoute)
  const showSearchBar = ['hotels', 'hospedes', 'reservas'].includes(currentRoute)
  const searchBarConfig = getSearchBarConfig(currentRoute)

  const handleAddClick = () => {
    console.log(`Adicionar novo item em: ${currentRoute}`)
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar activeItem={currentRoute} onNavigate={setCurrentRoute} />
      <div className="flex-1 flex flex-col !m-4 ">
        <Header
          title={headerConfig.title}
          description={headerConfig.description}
          showAddButton={headerConfig.showAddButton}
          addButtonLabel={headerConfig.addButtonLabel}
          onAddClick={handleAddClick}
        />
        <main className="flex-1 p-8 !mt-4">
          {showSearchBar && <SearchBar placeholder={searchBarConfig.placeholder} />}
        </main>
      </div>
    </div>
  )
}

export default App
