import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// ================================
// TIPOS
// ================================

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  isLight: boolean;
  toggleTheme: () => void;
  setThemeMode: (newTheme: Theme) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

// ================================
// CONTEXTO DE TEMA
// ================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ================================
// PROVIDER DE TEMA
// ================================

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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
  }, [theme]);

  // Alternar tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Definir tema específico
  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// ================================
// HOOK PARA USAR O TEMA
// ================================

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
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

// ================================
// COMPATIBILIDADE COM NOVO DESIGN SYSTEM
// ================================

// Re-export do novo sistema para compatibilidade
export { getThemeClasses as getNewThemeClasses } from "../../design-system/theme-classes";
export { themeClasses as newThemeStyles } from "../../design-system/theme-classes";
export { useThemeClasses } from "../../design-system/hooks";
