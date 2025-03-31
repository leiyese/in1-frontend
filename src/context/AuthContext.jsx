// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Skapa en kontext för autentisering
const AuthContext = createContext();

// Skapa en Provider-komponent som omsluter appen och gör autentiseringstillståndet tillgängligt
const AuthProvider = ({ children }) => {
  // Initialiserar tillståndet för användaren. Vi försöker att läsa användaren från localStorage vid mount
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to load user from local storage:", error);
      return null;
    }
  });

  // Funktion för att logga in användaren
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token) //Save Token in local storage, in real project HTTP Cookies is more secured;
    localStorage.setItem('user', JSON.stringify(userData));  // Spara användar-information i localStorage
  };

  // Funktion för att logga ut användaren
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); //Ta bort användarens token
    localStorage.removeItem('user'); //Ta bort user i local storage
  };

  useEffect(() => {
    // Denna useEffect synkroniserar tillståndet i komponenten med localStorage
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error("Failed to update user in local storage:", error);
    }
  }, [user]);

  const value = {
    user,
    login,
    logout,
  };

  // Returnera AuthContext.Provider för att omsluta de komponenter som behöver åtkomst till kontexten
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };