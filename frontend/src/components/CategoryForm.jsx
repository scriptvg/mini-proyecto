import React from 'react'

function CategoryForm({ categoriaData, setCategoriaData, handleCategorySubmit }) {
  return (
    <div className="p-6 rounded shadow bg-gray-50">
      <h2 className="mb-4 bold">Agregar Categoría</h2>
      <form onSubmit={handleCategorySubmit} className="mb-4">
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={categoriaData.nombre}
          onChange={e => setCategoriaData({ nombre: e.target.value })}
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full py-2 text-white bg-green-600 rounded">Guardar Categoría</button>
      </form>
    </div>
  )
}

export default CategoryForm