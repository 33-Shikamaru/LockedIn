import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import ToDo from './components/ToDo.tsx'
import Navbar from './components/Navbar.tsx'
import Title from './components/Title.tsx'
import Dashnote from './components/Dashnote.tsx'

function App() {
  return (
    <> 
      <Title />
      <Navbar />
      {/* After we get user info we pass it here or in the Dashnote.tsx file */}
      <Dashnote username="Jefferson McLinden"/> 
      <ToDo />
    </>
  )
}

export default App
