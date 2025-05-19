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

  const [categoriaData, setCategoriaData] = useState({ nombre: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProductos(productsResponse.data);
        setCategorias(categoriesResponse.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
        setLoadingCategorias(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setProductData(prev => ({ ...prev, imagen: files[0] }));
    } else {
      setProductData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productData.nombre || !productData.precio || !productData.categoria) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === 'imagen' && typeof value !== 'string') {
          formData.append(key, value);
        } else if (key !== 'id') {
          formData.append(key, value);
        }
      });

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

  const openModal = (producto) => {
    setSelectedProduct(producto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className='card p-6 mx-auto mt-6 w-[90%] text-black bg-gray-100 shadow-md rounded-md'>
      <h1 className='mb-6 text-3xl font-bold text-center'>Gestión de Productos y Categorías</h1>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* FORMULARIO PRODUCTO */}
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

        {/* Formulario categoría */}
        <div className="p-2 rounded shadow bg-gray-50">
          <h2 className="mb-4 text-xl font-bold">Agregar Categoría</h2>
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

          <h3 className="mb-2 text-lg font-semibold">Categorías</h3>
          {loadingCategorias ? <p>Cargando...</p> : (
            <ul className="space-y-1">
              {categorias.map(c => (
                <li key={c.id} className="flex items-center justify-between">
                  <span>{c.nombre}</span>
                  <button onClick={() => handleDeleteCategory(c.id)} className="px-3 py-1 ml-4 text-white bg-red-500 rounded">Eliminar</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* PRODUCTOS */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">Lista de Productos</h2>
        {loading ? <p>Cargando productos...</p> : (
          <ul className="space-y-4">
            {productos.map(p => (
              <li
                key={p.id}
                className="flex items-center p-4 bg-white border border-gray-200 rounded shadow cursor-pointer hover:shadow-md"
                onClick={() => openModal(p)}
              >
                {p.imagen && (
                  <img src={p.imagen} alt={p.nombre} className="object-cover w-24 h-24 mr-4 rounded" />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{p.nombre}</h3>
                  <p className="text-gray-600">{p.descripcion}</p>
                  <p className="text-sm text-gray-500">₡{p.precio} | Stock: {p.stock}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteProduct(p.id); }}
                  className="px-3 py-1 ml-4 text-white bg-red-500 rounded"
                >Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedProduct.nombre}</h2>
              <button onClick={closeModal} className="text-2xl text-gray-500 border border-gray-300 shadow-md rounded-2xl hover:text-gray-700 hover:bg-gray-200 hover:border hover:border-gray-300 hover:shadow-lg ">&times;</button>
            </div>
            {selectedProduct.imagen && (
              <img src={selectedProduct.imagen} alt={selectedProduct.nombre} className="object-cover w-full h-48 mb-4 rounded" />
            )}
            <p className="mb-2">{selectedProduct.descripcion}</p>
            <p className="mb-1 font-semibold">Precio: ₡{selectedProduct.precio}</p>
            <p className="mb-4 font-semibold">Stock: {selectedProduct.stock}</p>
            <button onClick={closeModal} className="w-full px-4 py-2 text-white bg-blue-600 rounded">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardProducts;
