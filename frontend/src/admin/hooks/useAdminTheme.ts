import { useState, useEffect } from "react";

// ================================
// TIPOS DE TEMA
// ================================

export type Theme = "light" | "dark";

// ================================
// HOOK PARA GERENCIAR TEMA
// ================================

export const useAdminTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar preferência salva no localStorage
    const savedTheme = localStorage.getItem("admin-theme") as Theme;
    if (savedTheme) {
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
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    // Salvar preferência
    localStorage.setItem("admin-theme", theme);

    // Forçar uma re-renderização dos componentes
    // disparando um evento customizado
    window.dispatchEvent(
      new CustomEvent("admin-theme-change", { detail: theme })
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

  return {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme,
    setThemeMode,
  };
};

// ================================
// CLASSES DE ESTILO PARA TEMAS
// ================================

export const themeStyles = {
  // Layout Principal
  layout: {
    light: "bg-gray-50",
    dark: "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900",
  },

  // Sidebar
  sidebar: {
    light: "bg-white border-gray-200",
    dark: "bg-black/20 backdrop-blur-xl border-white/10",
  },

  // Navbar
  navbar: {
    light: "bg-white border-gray-200",
    dark: "bg-black/20 backdrop-blur-xl border-white/10",
  },

  // Content Area
  content: {
    light: "bg-white border-gray-200",
    dark: "bg-black/20 backdrop-blur-xl border-white/10",
  },

  // Cards
  card: {
    light: "bg-white border-gray-200 shadow-sm",
    dark: "bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl",
  },

  // Text Colors
  text: {
    primary: {
      light: "text-gray-900",
      dark: "text-white",
    },
    secondary: {
      light: "text-gray-600",
      dark: "text-blue-100",
    },
    muted: {
      light: "text-gray-500",
      dark: "text-blue-200/70",
    },
  },

  // Buttons
  button: {
    primary: {
      light: "bg-blue-600 hover:bg-blue-700 text-white",
      dark: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
    },
    secondary: {
      light: "bg-gray-100 hover:bg-gray-200 text-gray-900",
      dark: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm",
    },
  },

  // Icons
  icon: {
    light: "text-gray-600",
    dark: "text-blue-300",
  },

  // Inputs
  input: {
    light: "bg-white border-gray-300 text-gray-900",
    dark: "bg-white/10 border-white/20 text-white placeholder-blue-200/50 backdrop-blur-sm",
  },
};

// ================================
// HELPER PARA OBTER CLASSES DO TEMA
// ================================

export const getThemeClasses = (theme: Theme, styleKey: string): string => {
  const keys = styleKey.split(".");
  let styles: any = themeStyles;

  for (const key of keys) {
    styles = styles[key];
    if (!styles) return "";
  }

  return styles[theme] || "";
};
