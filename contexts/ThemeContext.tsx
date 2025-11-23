
import React, { createContext, useContext, useEffect, ReactNode, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Theme, Layout } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  layout: Layout;
  setLayout: (layout: Layout) => void;
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  cursorStyle: string;
  setCursorStyle: (style: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to calculate shades
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const mix = (color: {r: number, g: number, b: number}, mixColor: {r: number, g: number, b: number}, weight: number) => {
  return {
    r: Math.round(color.r * (1 - weight) + mixColor.r * weight),
    g: Math.round(color.g * (1 - weight) + mixColor.g * weight),
    b: Math.round(color.b * (1 - weight) + mixColor.b * weight)
  };
};

const generatePalette = (hex: string) => {
  const base = hexToRgb(hex);
  if (!base) return null;
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };
  
  return {
    50: mix(base, white, 0.95),
    100: mix(base, white, 0.9),
    200: mix(base, white, 0.75),
    300: mix(base, white, 0.6),
    400: mix(base, white, 0.3),
    500: base,
    600: mix(base, black, 0.1),
    700: mix(base, black, 0.3),
    800: mix(base, black, 0.45),
    900: mix(base, black, 0.6),
    950: mix(base, black, 0.75),
  };
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
  const [layout, setLayout] = useLocalStorage<Layout>('layout', 'grid');
  const [primaryColor, setPrimaryColor] = useLocalStorage<string>('primaryColor', '#3b82f6');
  const [cursorStyle, setCursorStyle] = useLocalStorage<string>('cursorStyle', 'default');

  // Apply Dark/Light Mode
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  // Apply Primary Color Palette
  useEffect(() => {
    const palette = generatePalette(primaryColor);
    if (palette) {
        const root = document.documentElement;
        Object.entries(palette).forEach(([key, value]) => {
            root.style.setProperty(`--color-primary-${key}`, `${value.r} ${value.g} ${value.b}`);
        });
    }
  }, [primaryColor]);

  // Apply Cursor Style
  useEffect(() => {
      document.body.classList.remove('cursor-default', 'cursor-retro', 'cursor-neon', 'cursor-minimal');
      if (cursorStyle !== 'default') {
          document.body.classList.add(`cursor-${cursorStyle}`);
      }
  }, [cursorStyle]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  const handleSetTheme = useCallback((newTheme: Theme) => setTheme(newTheme), [setTheme]);
  const handleSetLayout = useCallback((newLayout: Layout) => setLayout(newLayout), [setLayout]);
  const handleSetPrimaryColor = useCallback((color: string) => setPrimaryColor(color), [setPrimaryColor]);
  const handleSetCursorStyle = useCallback((style: string) => setCursorStyle(style), [setCursorStyle]);

  const value = useMemo(() => ({ 
    theme, 
    setTheme: handleSetTheme, 
    layout, 
    setLayout: handleSetLayout, 
    toggleTheme,
    primaryColor,
    setPrimaryColor: handleSetPrimaryColor,
    cursorStyle,
    setCursorStyle: handleSetCursorStyle
  }), [theme, handleSetTheme, layout, handleSetLayout, toggleTheme, primaryColor, handleSetPrimaryColor, cursorStyle, handleSetCursorStyle]);

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
