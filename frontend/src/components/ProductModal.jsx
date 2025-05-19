import React from 'react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <div className="flex items-center justify-between mb-4">
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
            className="w-full h-full mb-4 rounded object -cover"
          />
        )}

        <p className="mb-2 text-gray-600">{product.descripcion}</p>
        <p className="font-semibold">Precio: ₡{product.precio}</p>
        <p className="font-semibold">Stock: {product.stock}</p>

        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;