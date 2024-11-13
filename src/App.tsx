import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import ToDo from './components/ToDo.tsx'
import Navbar from './components/Navbar.tsx'

function App() {
  return (
    <> 
      <Navbar />
      <ToDo />
    </>
  )
}

export default App
