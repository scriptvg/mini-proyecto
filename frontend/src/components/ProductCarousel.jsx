// FILEPATH: c:/Users/Kromm/Desktop/mini-proyecto/mini-proyecto/frontend/src/components/ProductCarousel.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { getProducts } from '../api/productService';

function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log('API response:', response); // Verifica la respuesta de la API
        if (response.data.length === 0) {
          // Usar datos mock si la API devuelve un array vacío
          const mockProducts = [
            { id: 1, imagen: 'image1.jpg', nombre: 'Product 1', precio: 100 },
            { id: 2, imagen: 'image2.jpg', nombre: 'Product 2', precio: 200 },
            { id: 3, imagen: 'image3.jpg', nombre: 'Product 3', precio: 300 },
          ];
          setProducts(mockProducts);
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (loading) {
    return <div className="container p-4 mx-auto">Loading products...</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Nuestros Productos</h2>
      <Slider {...settings}>
        {products.map(product => (
          <div key={product.id} className="p-2">
            <div className="overflow-hidden bg-white rounded-lg shadow-lg">
              <img src={product.imagen} alt={product.nombre} className="object-cover w-full h-48" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.nombre}</h3>
                <p className="mt-2">₡{product.precio}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductCarousel;