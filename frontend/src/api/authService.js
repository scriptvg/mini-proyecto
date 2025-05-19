// FILE: c:/Users/Kromm/Desktop/mini-proyecto/mini-proyecto/frontend/src/api/authService.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",  // Ensure this URL is correct
  timeout: 10000,  // 10 seconds timeout
});

export const login = async (data) => {
  console.log('login: data received', data);
  try {
    const response = await axiosInstance.post('/auth/token/', data);
    console.log('login: response received', response);
    return response;
  } catch (error) {
    console.error('login: error occurred', error);
    throw error;
  }
};

export const register = async (data) => {
  console.log('register: data received', data);
  try {
    const response = await axiosInstance.post('/register/', data);
    console.log('register: response received', response);
    return response;
  } catch (error) {
    console.error('register: error occurred', error);
    throw error;
  }
};

export const logout = async () => {
  console.log('logout: request initiated');
  try {
    const response = await axiosInstance.post('/logout/');
    console.log('logout: response received', response);
    return response;
  } catch (error) {
    console.error('logout: error occurred', error);
    throw error;
  }
};