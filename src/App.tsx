import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login.tsx'
import Signup from './components/Signup.tsx'
import Home from './components/Home.tsx'

import CalendarPage from './components/CalendarPage.tsx'
import Notes from './components/Notes.tsx'
import Settings from './components/Settings.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App
