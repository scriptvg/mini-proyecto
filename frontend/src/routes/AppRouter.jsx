import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import Productos from '../pages/Productos'
import LoginForm from '../components/auth/LoginForm'

function AppRouter() {
  return (
<>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categorias" element={<Productos />} />
        <Route path="/nosotros" element={<Productos />} />
        <Route path="/carrito" element={<Productos />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Productos />} />

      </Routes>
    </Router>
</>
  )
}

export default AppRouter
