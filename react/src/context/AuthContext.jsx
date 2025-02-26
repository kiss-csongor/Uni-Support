import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState('in');

  useEffect(() => {
    const storedStatus = localStorage.getItem("status");

    if (storedStatus) {
      setStatus(storedStatus);
    } else {
      localStorage.setItem("status", 'out');
    }
  }, []);


  const login = () => {
    setStatus('in')
    localStorage.setItem("status", 'in');
  };

  const logout = () => {
    setStatus('out')
    localStorage.setItem("status", 'out');
  };

  return (
    <AuthContext.Provider value={{ status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);