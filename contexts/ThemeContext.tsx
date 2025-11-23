
import React, { createContext, useContext, useEffect, ReactNode, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Theme, Layout } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  layout: Layout;
  setLayout: (layout: Layout) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
  const [layout, setLayout] = useLocalStorage<Layout>('layout', 'grid');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  const handleSetTheme = useCallback((newTheme: Theme) => setTheme(newTheme), [setTheme]);
  const handleSetLayout = useCallback((newLayout: Layout) => setLayout(newLayout), [setLayout]);

  const value = useMemo(() => ({ 
    theme, 
    setTheme: handleSetTheme, 
    layout, 
    setLayout: handleSetLayout, 
    toggleTheme 
  }), [theme, handleSetTheme, layout, handleSetLayout, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
