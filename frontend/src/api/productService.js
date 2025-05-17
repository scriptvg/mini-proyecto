// src/api/productService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

/* PRODUCTOS */

// Obtener todos los productos
export const getProducts = async () => axios.get(`${API_URL}/productos/`);

// Obtener un producto
export const getProduct = async (id) => axios.get(`${API_URL}/productos/${id}`);

// Crear un producto (con FormData)
export const createProduct = async (data) => axios.post(`${API_URL}/productos/crear/`, data);

// Actualizar un producto (con FormData)
export const updateProduct = async (id, data) => axios.put(`${API_URL}/productos/${id}/actualizar/`, data);

// Eliminar un producto
export const deleteProduct = async (id) => axios.delete(`${API_URL}/productos/${id}/eliminar/`);


/* CATEGORÍAS */

// Obtener todas las categorías
export const getCategories = async () => axios.get(`${API_URL}/categorias/`);

// Obtener una categoría
export const getCategory = async (id) => axios.get(`${API_URL}/categorias/${id}`);

// Crear una categoría
export const createCategory = async (data) => axios.post(`${API_URL}/categorias/crear/`, data);

// Actualizar una categoría
export const updateCategory = async (id, data) => axios.put(`${API_URL}/categorias/${id}/actualizar/`, data);

// Eliminar una categoría
export const deleteCategory = async (id) => axios.delete(`${API_URL}/categorias/${id}/eliminar/`);
