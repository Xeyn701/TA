// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Buat context
const AuthContext = createContext();

// Provider untuk menyimpan state autentikasi
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, accessToken: null });

  const login = (data) => {
    setAuth(data);
  };

  const logout = () => {
    setAuth({ user: null, accessToken: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
