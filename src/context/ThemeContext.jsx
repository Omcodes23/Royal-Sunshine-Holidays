import React, { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Always set to light theme
    setTheme('light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    
    // Remove any dark theme classes and ensure light theme
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    
    // Set CSS custom properties for light theme
    document.documentElement.style.setProperty('--bg-primary', '#ffffff');
    document.documentElement.style.setProperty('--text-primary', '#1f2937');
  }, []);

  const toggleTheme = () => {
    // Theme toggle is disabled - always stays light
    return;
  };

  const value = {
    theme,
    toggleTheme,
    isLight: true,
    isDark: false
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
