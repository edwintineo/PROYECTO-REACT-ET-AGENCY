import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Siempre en modo claro

  useEffect(() => {
    // Limpiar cualquier configuración de tema anterior
    localStorage.removeItem('theme');
    document.documentElement.classList.remove('dark');
  }, []);

  // La función toggleTheme ahora no hace nada
  const toggleTheme = () => {};

  const value = {
    isDarkMode: false,
    toggleTheme,
    theme: 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;