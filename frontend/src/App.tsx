import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/SideBar'
import HotelPage from './pages/HotelPage/HotelPage'
import BookingPage from './pages/BookingsPage/BookingPage'
import GuestsPage from './pages/GuestsPage/GuestsPage'
import HomePage from './pages/HomePage/HomePage'

function App() {
  const [currentRoute, setCurrentRoute] = useState('dashboard')

  const renderPage = () => {
    switch (currentRoute) {
      case 'hotels':
        return <HotelPage />
      case 'bookings':
        return <BookingPage />
      case 'guests':
        return <GuestsPage />
      case 'home':
        return <HomePage />
    }
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar activeItem={currentRoute} onNavigate={setCurrentRoute} />
      {renderPage()}
    </div>
  )
}

export default App
