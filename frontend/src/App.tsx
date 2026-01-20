import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/SideBar'
import HotelPage from './pages/HotelPage/HotelPage'
import BookingPage from './pages/BookingsPage/BookingPage'
import GuestsPage from './pages/GuestsPage/GuestsPage'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import { useAuth } from './hooks/useAuth'

function App() {
  const { isAuthenticated, isLoading, error, login, logout } = useAuth()
  const [currentRoute, setCurrentRoute] = useState('dashboard')

  const renderPage = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <HomePage />
      case 'hotels':
        return <HotelPage />
      case 'reservas':
        return <BookingPage />
      case 'hospedes':
        return <GuestsPage />
    }
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} isLoading={isLoading} error={error} />
  }

  return (
    <div className="app-container">
      <Sidebar activeItem={currentRoute} onNavigate={setCurrentRoute} onLogout={logout} />
      {renderPage()}
    </div>
  )
}

export default App
