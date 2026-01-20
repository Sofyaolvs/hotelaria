import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/SideBar'
import HotelPage from './pages/HotelPage/HotelPage'
import BookingPage from './pages/BookingsPage/BookingPage'
import GuestsPage from './pages/GuestsPage/GuestsPage'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentRoute, setCurrentRoute] = useState('dashboard')

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

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
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="app-container">
      <Sidebar activeItem={currentRoute} onNavigate={setCurrentRoute} />
      {renderPage()}
    </div>
  )
}

export default App
