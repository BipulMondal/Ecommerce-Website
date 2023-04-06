import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setIsLoggedIn(false);

    navigate("/")
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn , logout }}>
      {children}
    </AuthContext.Provider>
  );
};