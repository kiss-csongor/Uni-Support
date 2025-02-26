import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState('in');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedStatus = localStorage.getItem("status");
    const storedToken = localStorage.getItem("token")

    if (storedStatus) {
      setStatus(storedStatus);
    } else {
      localStorage.setItem("status", 'out');
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const login = (token) => {
    setStatus('in')
    localStorage.setItem("status", 'in');
    localStorage.setItem("token", token)
  };

  const logout = () => {
    setStatus('out')
    localStorage.setItem("status", 'out');
    localStorage.removeItem("token")
  };

  return (
    <AuthContext.Provider value={{ status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);