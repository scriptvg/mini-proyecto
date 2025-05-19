// FILE: c:/Users/Kromm/Desktop/mini-proyecto/mini-proyecto/frontend/src/context/AuthProvider.jsx

import React, { createContext, useState } from 'react';
import { login as loginService, register as registerService, logout as logoutService } from '../api/authService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    console.log('AuthProvider: login initiated', data);
    try {
      const response = await loginService(data);
      console.log('AuthProvider: login response', response);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setUser(response.data.user);
    } catch (error) {
      console.error('AuthProvider: login error', error);
      throw error;
    }
  };

  const register = async (data) => {
    console.log('AuthProvider: register initiated', data);
    try {
      const response = await registerService(data);
      console.log('AuthProvider: register response', response);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setUser(response.data.user);
    } catch (error) {
      console.error('AuthProvider: register error', error);
      throw error;
    }
  };

  const logout = async () => {
    console.log('AuthProvider: logout initiated');
    try {
      await logoutService();
      console.log('AuthProvider: logout successful');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    } catch (error) {
      console.error('AuthProvider: logout error', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;