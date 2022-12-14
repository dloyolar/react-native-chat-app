import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState('');

  const login = (phone) => setAuth(phone);

  const logout = () => setAuth('');

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};
