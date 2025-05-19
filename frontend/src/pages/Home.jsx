// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import ProductCarousel from '../components/ProductCarousel';



function Home() {
  return (
    <>
      <Navbar />
      <div className="container p-4 mx-auto mt-10">
        <h1 className="text-3xl font-bold">Bienvenido a la Tienda</h1>
        <p className="mt-4">Explora nuestros productos y ofertas especiales.</p>
        <ProductCarousel />
      </div>
    </>
  );
}

export default Home;