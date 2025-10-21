// ================================
// TEMA - PROVIDER
// ================================

import React, { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from './context';
import { applyTheme } from './variables';
import { Theme } from './types';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar preferência salva no localStorage
    const savedTheme = localStorage.getItem("admin-theme") as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Verificar preferência do sistema
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  });

  // Aplicar tema ao documento
  useEffect(() => {
    // Aplicar tema usando a função centralizada
    applyTheme(theme);

    // Disparar evento para notificar outros componentes
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: theme })
    );
  }, [theme]);

  // Alternar tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Definir tema específico
  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        isLight: theme === "light",
        toggleTheme,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};