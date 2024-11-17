import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import ToDo from './components/ToDo.tsx'
import Navbar from './components/Navbar.tsx'
import Title from './components/Title.tsx'
import DashNote from './components/DashNote.tsx'
import MiniCalendar from './components/Calendar.tsx'

function App() {
  return (
    <> 
      <Title />
      <Navbar />
      {/* After we get user info we pass it here or in the DashNote.tsx file */}
      <DashNote username="Jefferson McLinden"/> 
      <MiniCalendar />
      <ToDo />
    </>
  )
}

export default App
