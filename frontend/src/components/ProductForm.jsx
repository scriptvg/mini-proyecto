import React from 'react';

function ProductForm({
  productData,
  setProductData,
  categorias,
  handleProductSubmit
}) {
  return (
    <form
      onSubmit={handleProductSubmit}
      encType="multipart/form-data"
      className="w-full max-w-md p-6 bg-white rounded shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Agregar o Editar Producto</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          value={productData.nombre}
          onChange={e => setProductData({ ...productData, nombre: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre del producto"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          value={productData.descripcion}
          onChange={e => setProductData({ ...productData, descripcion: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descripción"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            value={productData.precio}
            onChange={e => setProductData({ ...productData, precio: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="₡"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            value={productData.stock}
            onChange={e => setProductData({ ...productData, stock: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Unidades"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Categoría</label>
        <select
          value={productData.categoria}
          onChange={e => setProductData({ ...productData, categoria: e.target.value })}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setProductData({ ...productData, imagen: e.target.files[0] })}
          className="w-full"
        />
        {productData.imagen && typeof productData.imagen !== "string" && (
          <img
            src={URL.createObjectURL(productData.imagen)}
            alt="Vista previa"
            className="object-contain w-full mt-2 rounded max-h-48"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Guardar Producto
      </button>
    </form>
  );
}

export default ProductForm;
