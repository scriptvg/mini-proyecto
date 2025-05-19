import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Funcion para obtener el token de autenticación
const getToken = () => {
  return localStorage.getItem('access_token');
};

// Funcion para establecer el encabezado de autorización en las solicitudes
const setAuthHeader = (config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

// Crea una instancia de axios con la URL base y el tiempo de espera
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(setAuthHeader, (error) => Promise.reject(error));

/* PRODUCTOS */

// Obtener todos los productos
export const getProducts = async () => axiosInstance.get('/productos/');

// Obtener un producto
export const getProduct = async (id) => axiosInstance.get(`/productos/${id}`);

// Crear un producto (con FormData)
export const createProduct = async (data) => axiosInstance.post('/productos/crear/', data);

// Actualizar un producto (con FormData)
export const updateProduct = async (id, data) => axiosInstance.put(`/productos/${id}/actualizar/`, data);

// Eliminar un producto
export const deleteProduct = async (id) => axiosInstance.delete(`/productos/${id}/eliminar/`);


/* CATEGORÍAS */

// Obtener todas las categorías
export const getCategories = async () => axiosInstance.get('/categorias/');

// Obtener una categoría
export const getCategory = async (id) => axiosInstance.get(`/categorias/${id}`);

// Crear una categoría
export const createCategory = async (data) => axiosInstance.post('/categorias/crear/', data);

// Actualizar una categoría
export const updateCategory = async (id, data) => axiosInstance.put(`/categorias/${id}/actualizar/`, data);

// Eliminar una categoría
export const deleteCategory = async (id) => axiosInstance.delete(`/categorias/${id}/eliminar/`);