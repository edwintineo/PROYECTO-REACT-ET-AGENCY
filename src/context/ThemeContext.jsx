import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children }) => {
  // Always force light mode - completely ignore any previous settings
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Force light mode immediately on mount
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    
    // Ensure the state is always false (light mode)
    if (isDarkMode) {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    // Always keep in light mode regardless of state changes
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    // Disabled - always stay in light mode
    // setIsDarkMode(prev => !prev);
    setIsDarkMode(false);
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  };

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;