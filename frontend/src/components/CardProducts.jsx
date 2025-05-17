import React, { useEffect, useState } from 'react';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  deleteCategory
} from '../api/productService';

function CardProducts() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [productData, setProductData] = useState({
    id: null,
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    imagen: '',
    activo: true,
  });

  const [categoriaData, setCategoriaData] = useState({
    nombre: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProductos(productsResponse.data);
        setCategorias(categoriesResponse.data);
        setLoading(false);
        setLoadingCategorias(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productData.nombre || !productData.precio || !productData.categoria) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', productData.nombre);
      formData.append('descripcion', productData.descripcion);
      formData.append('precio', productData.precio);
      formData.append('stock', productData.stock);
      formData.append('categoria', productData.categoria);
      if (productData.imagen) {
        formData.append('imagen', productData.imagen);
      }

      const response = productData.id
        ? await updateProduct(productData.id, formData)
        : await createProduct(formData);

      setProductos(prev => 
        productData.id 
          ? prev.map(p => p.id === productData.id ? response.data : p)
          : [...prev, response.data]
      );
      resetProductData();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

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

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProductos(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
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

  const resetProductData = () => {
    setProductData({
      id: null,
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      categoria: '',
      imagen: '',
      activo: true,
    });
  };

  const openModal = (producto) => {
    setSelectedProduct(producto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className='card p-[20px] mx-auto mt-[10px] w-[90%] text-black bg-[#f4f4f4] shadow-[0_0_10px_0_rgba(0,0,0,0.1)]'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Gestión de Productos y Categorías</h1>
      <hr />
      <div className='flex justify-between'>
        <div className='text-center'>
          <h2 className='mt-3'>Agregar o Editar Producto</h2>
          <form onSubmit={handleProductSubmit} encType="multipart/form-data" className='w-full max-w-md card p-4 bg-white shadow-md rounded'>
            <input
              type="text"
              placeholder="Nombre"
              value={productData.nombre}
              onChange={e => setProductData({ ...productData, nombre: e.target.value })}
            />
            <textarea
              placeholder="Descripción"
              value={productData.descripcion}
              onChange={e => setProductData({ ...productData, descripcion: e.target.value })}
            />
            <input
              type="number"
              placeholder="Precio"
              value={productData.precio}
              onChange={e => setProductData({ ...productData, precio: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock"
              value={productData.stock}
              onChange={e => setProductData({ ...productData, stock: e.target.value })}
            />
            <select
              value={productData.categoria}
              onChange={e => setProductData({ ...productData, categoria: e.target.value })}
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={e => setProductData({ ...productData, imagen: e.target.files[0] })}
            />
            {productData.imagen && typeof productData.imagen !== "string" && (
              <img
                src={URL.createObjectURL(productData.imagen)}
                alt="Vista previa"
                width="100"
                style={{ marginTop: '10px' }}
              />
            )}
            <button type="submit">Guardar Producto</button>
          </form>
        </div>

        <div>
          <h2>Agregar Categoría</h2>
          <form onSubmit={handleCategorySubmit}>
            <input
              type="text"
              placeholder="Nombre de la categoría"
              value={categoriaData.nombre}
              onChange={e => setCategoriaData({ ...categoriaData, nombre: e.target.value })}
            />
            <button type="submit">Guardar Categoría</button>
          </form>
        </div>
      </div>

      <div>
        <h2>Lista de Productos</h2>
        {loading ? <p>Cargando productos...</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {productos.map(producto => (
              <li 
                key={producto.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '20px', 
                  padding: '10px', 
                  border: '1px solid #ddd', 
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
                onClick={() => openModal(producto)}
              >
                {producto.imagen && (
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    width="150"
                    style={{ marginRight: '20px', borderRadius: '5px' }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0' }}>{producto.nombre}</h3>
                  <p style={{ margin: '0 0 5px 0' }}>{producto.descripcion}</p>
                  <p style={{ margin: '0 0 5px 0' }}>Precio: ${producto.precio}</p>
                  <p style={{ margin: '0 0 5px 0' }}>Stock: {producto.stock}</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(producto.id);
                  }}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

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

      {isModalOpen && selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedProduct.nombre}</h2>
              <button 
                onClick={closeModal}
                style={{ 
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                &times;
              </button>
            </div>
            
            {selectedProduct.imagen && (
              <img 
                src={selectedProduct.imagen} 
                alt={selectedProduct.nombre}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
              />
            )}

            <p style={{ marginBottom: '10px', color: '#666' }}>{selectedProduct.descripcion}</p>
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Precio: ${selectedProduct.precio}</p>
            <p style={{ fontWeight: 'bold', marginBottom: '20px' }}>Stock: {selectedProduct.stock}</p>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={closeModal}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardProducts;