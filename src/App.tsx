import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login.tsx'
import Signup from './components/Signup.tsx'
import Home from './components/Home.tsx'
import Exit from './components/Exit.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exit" element={<Exit />} />
      </Routes>
    </Router>
  );
}

export default App
