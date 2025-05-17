import React, { useState, useEffect } from 'react'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../api/categories';


function CardCategoria() {
    const [categorias, setCategorias] = useState([]);
    const [loadingCategorias, setLoadingCategorias] = useState(true);




      const handleCategorySubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await createCategory(categoriaData);
          setCategorias(prev => [...prev, response.data]);
          setCategoriaData({ nombre: '' });
        } catch (error) {
          console.error('Error al guardar categoría:', error);
        }
      };

      const handleDeleteCategory = async (id) => {
        try {
          await deleteCategory(id);
          setCategorias(prev => prev.filter(c => c.id !== id));
        } catch (error) {
          console.error('Error al eliminar categoría:', error);
        }
      };

  return (
      <div>
        <h2>Lista de Categorías</h2>
        {loadingCategorias ? <p>Cargando categorías...</p> : (
          <ul>
            {categorias.map(categoria => (
              <li key={categoria.id}>
                {categoria.nombre}
                <button onClick={() => handleDeleteCategory(categoria.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
  )
}

export default CardCategoria
