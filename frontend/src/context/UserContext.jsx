import React, { createContext, useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};