import React, { createContext, useContext, useEffect, ReactNode, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useDeviceDetection } from '../hooks/useDeviceDetection';
import { Layout } from '../types';

export type ThemeMode = 'light' | 'dark' | 'high-contrast' | 'custom';

export interface CustomThemeColors {
  primary: string;
  secondary: string;
  background: string;
  cardBackground: string;
  text: string;
  accent: string;
}

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  layout: Layout;
  setLayout: (layout: Layout) => void;
  toggleTheme: () => void;
  
  // Custom Theme Colors
  customColors: CustomThemeColors;
  setCustomColors: (colors: CustomThemeColors) => void;
  
  // Legacy support for simple primary color setting (mapped to custom primary)
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
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>('themeMode', 'light');
  const [layout, setLayout] = useLocalStorage<Layout>('layout', 'grid');
  
  const [customColors, setCustomColors] = useLocalStorage<CustomThemeColors>('customColors', {
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#f3f4f6',
    cardBackground: '#ffffff',
    text: '#111827',
    accent: '#8b5cf6'
  });

  const [cursorStyle, setCursorStyle] = useLocalStorage<string>('cursorStyle', 'default');
  
  // Get device info to restrict features
  const { isDesktop } = useDeviceDetection();

  // Apply Theme Mode Logic
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Reset classes
    root.classList.remove('dark', 'light', 'high-contrast', 'custom-theme');
    
    // Remove custom style override if it exists
    const existingStyle = document.getElementById('custom-theme-style');
    if (existingStyle) existingStyle.remove();

    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else if (themeMode === 'high-contrast') {
      root.classList.add('high-contrast');
    } else if (themeMode === 'custom') {
      root.classList.add('custom-theme');
      
      // Inject CSS variables for custom colors
      const style = document.createElement('style');
      style.id = 'custom-theme-style';
      style.innerHTML = `
        :root {
          --color-custom-bg: ${customColors.background};
          --color-custom-card: ${customColors.cardBackground};
          --color-custom-text: ${customColors.text};
        }
        .custom-theme body {
          background-color: ${customColors.background} !important;
          color: ${customColors.text} !important;
        }
        .custom-theme .bg-white, .custom-theme .dark\\:bg-gray-800, .custom-theme .bg-gray-50, .custom-theme .dark\\:bg-gray-900 {
           background-color: ${customColors.cardBackground} !important;
           color: ${customColors.text} !important;
        }
        .custom-theme .text-gray-900, .custom-theme .dark\\:text-white, .custom-theme .text-gray-800 {
           color: ${customColors.text} !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      root.classList.add('light');
    }
  }, [themeMode, customColors]);

  // Apply Primary Color Palette
  useEffect(() => {
    const colorToUse = customColors.primary;
    const palette = generatePalette(colorToUse);
    if (palette) {
        const root = document.documentElement;
        Object.entries(palette).forEach(([key, value]) => {
            root.style.setProperty(`--color-primary-${key}`, `${value.r} ${value.g} ${value.b}`);
        });
    }
  }, [customColors.primary]);

  // Apply Cursor Style (PC Only)
  useEffect(() => {
      // Remove all cursor classes first
      const cursorClasses = ['cursor-default', 'cursor-retro', 'cursor-neon', 'cursor-minimal', 'cursor-fantasy', 'cursor-modern', 'cursor-scifi', 'cursor-nature', 'cursor-mac'];
      document.body.classList.remove(...cursorClasses);

      // Only apply custom cursor if on desktop
      if (isDesktop && cursorStyle !== 'default') {
          document.body.classList.add(`cursor-${cursorStyle}`);
      }
  }, [cursorStyle, isDesktop]);

  const toggleTheme = useCallback(() => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  }, [setThemeMode]);

  const handleSetThemeMode = useCallback((mode: ThemeMode) => setThemeMode(mode), [setThemeMode]);
  const handleSetLayout = useCallback((l: Layout) => setLayout(l), [setLayout]);
  const handleSetCustomColors = useCallback((colors: CustomThemeColors) => setCustomColors(colors), [setCustomColors]);
  
  const handleSetPrimaryColor = useCallback((color: string) => {
    setCustomColors(prev => ({ ...prev, primary: color }));
  }, [setCustomColors]);

  const handleSetCursorStyle = useCallback((style: string) => setCursorStyle(style), [setCursorStyle]);

  const value = useMemo(() => ({ 
    themeMode,
    setThemeMode: handleSetThemeMode,
    theme: themeMode === 'dark' ? 'dark' : 'light',
    setTheme: (t: 'light' | 'dark') => setThemeMode(t),
    layout, 
    setLayout: handleSetLayout, 
    toggleTheme,
    customColors,
    setCustomColors: handleSetCustomColors,
    primaryColor: customColors.primary,
    setPrimaryColor: handleSetPrimaryColor,
    cursorStyle,
    setCursorStyle: handleSetCursorStyle
  }), [themeMode, handleSetThemeMode, layout, handleSetLayout, toggleTheme, customColors, handleSetCustomColors, handleSetPrimaryColor, cursorStyle, handleSetCursorStyle]);

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