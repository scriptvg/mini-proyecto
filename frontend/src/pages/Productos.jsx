import React from 'react'
import CardProducts from '../components/CardProducts'
import Navbar from '../components/Navbar'


function Productos() {
  return (
    <>
      <Navbar />

      <div className="container p-4 mx-auto mt-10">
      <CardProducts />
      </div>
    </>

  )
}

export default Productos