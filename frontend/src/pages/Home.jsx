// src/pages/Home.jsx
import React from 'react';
import CardProducts from '../components/CardProducts';

function Home() {
  return (
    <>
      <div className="container mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-4">Productos</h1>
        <CardProducts />
      </div>
    </>
  );
}

export default Home;