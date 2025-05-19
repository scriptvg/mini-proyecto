import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-xl font-bold text-white text-decoration-none">POSOLUTION</Link>
        
        <div className="hidden space-x-4 md:flex ">
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/categorias">Categorias</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/carrito">Carrito</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>

        <button 
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/productos">Productos</NavLink>
            <NavLink to="/categorias">Categorias</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
            <NavLink to="/nosotros">Nosotros</NavLink>
            <NavLink to="/carrito">Carrito</NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link 
      to={to} 
      className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white text-decoration-none"
    >
      {children}
    </Link>
  );
}

export default Navbar;