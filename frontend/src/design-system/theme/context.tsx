// ================================
// TEMA - CONTEXT
// ================================

import React, { createContext, useContext, ReactNode } from 'react';
import { Theme } from './types';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  isLight: boolean;
  toggleTheme: () => void;
  setThemeMode: (newTheme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeContext deve ser usado dentro de um ThemeProvider');
  }
  
  return context;
};