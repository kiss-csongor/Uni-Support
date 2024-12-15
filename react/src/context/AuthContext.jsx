import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    // A cookie-ban tárolt bejelentkezési információ ellenőrzése
    useEffect(() => {
      const storedStatus = Cookies.get("isLoggedIn"); // Lekérjük a cookie-t
      if (storedStatus === "true") {
        setIsLoggedIn(true);  // Ha van, akkor bejelentkezett státusz
      }
    }, []);

    const login = () => {
      setIsLoggedIn(true);
      Cookies.set("isLoggedIn", "true", { expires: 7 });  // 7 napra tároljuk el a cookie-t
    };
  
    const logout = () => {
      setIsLoggedIn(false);
      Cookies.set("isLoggedIn", "false", { expires: 7 });  // 7 napra tároljuk el a cookie-t
    };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);