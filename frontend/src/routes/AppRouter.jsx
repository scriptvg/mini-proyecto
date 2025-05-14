import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'

function AppRouter() {
  return (
<>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
</>
  )
}

export default AppRouter
