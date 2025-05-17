import React from 'react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{product.nombre}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        
        {product.imagen && (
          <img 
            src={product.imagen} 
            alt={product.nombre}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}

        <p className="text-gray-600 mb-2">{product.descripcion}</p>
        <p className="font-semibold">Precio: ${product.precio}</p>
        <p className="font-semibold">Stock: {product.stock}</p>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;