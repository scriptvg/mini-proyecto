import React from 'react';

function ProductList({ productos, openModal, handleDeleteProduct }) {
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Lista de Productos</h2>
      {!productos.length ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {productos.map(p => (
            <li
              key={p.id}
              className="flex items-center p-4 bg-white border border-gray-200 rounded shadow cursor-pointer hover:shadow-md"
              onClick={() => openModal(p)}
            >
              {p.imagen && (
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="object-cover w-24 h-24 mr-4 rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-bold">{p.nombre}</h3>
                <p className="text-gray-600">{p.descripcion}</p>
                <p className="text-sm text-gray-500">₡{p.precio} | Stock: {p.stock}</p>
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleDeleteProduct(p.id);
                }}
                className="px-3 py-1 ml-4 text-white bg-red-500 rounded"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
