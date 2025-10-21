// ================================
// TEMA - CLASSES CSS
// ================================

import { Theme } from './types';

// ================================
// MAPEAMENTO DE CLASSES POR TEMA
// ================================

export const themeClasses = {
  // Layout
  layout: {
    light: "bg-slate-50",
    dark: "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900",
  },

  // Sidebar
  sidebar: {
    light: "bg-white border-slate-200",
    dark: "bg-black/20 backdrop-blur-xl border-white/5",
  },

  // Navbar
  navbar: {
    light: "bg-white border-slate-200",
    dark: "bg-black/20 backdrop-blur-xl border-white/5",
  },

  // Content Area
  content: {
    light: "bg-white border-slate-200",
    dark: "bg-black/20 backdrop-blur-xl border-white/5",
  },

  // Cards
  card: {
    light: "bg-slate-50/50 backdrop-blur-sm shadow-sm",
    dark: "bg-white/5 backdrop-blur-lg shadow-2xl",
  },

  // Text Colors
  text: {
    primary: {
      light: "text-slate-800",
      dark: "text-white",
    },
    secondary: {
      light: "text-slate-600", 
      dark: "text-slate-200",
    },
    muted: {
      light: "text-slate-500",
      dark: "text-slate-400",
    },
    accent: {
      light: "text-blue-600",
      dark: "text-blue-400",
    },
  },

  // Backgrounds
  background: {
    primary: {
      light: "bg-white",
      dark: "bg-black/20 backdrop-blur-xl",
    },
    secondary: {
      light: "bg-slate-50",
      dark: "bg-white/5 backdrop-blur-sm",
    },
    accent: {
      light: "bg-blue-50",
      dark: "bg-blue-500/20 backdrop-blur-sm",
    },
  },

  // Borders
  border: {
    primary: {
      light: "border-slate-200",
      dark: "border-white/5",
    },
    secondary: {
      light: "border-slate-300",
      dark: "border-white/10",
    },
    accent: {
      light: "border-blue-300",
      dark: "border-blue-400/30",
    },
    subtle: {
      light: "border-slate-100",
      dark: "border-white/3",
    },
  },

  // Buttons
  button: {
    // Botões normais
    primary: {
      light: "bg-primary-600 hover:bg-primary-700 text-white",
      dark: "bg-primary-600 hover:bg-primary-500 text-white",
    },
    secondary: {
      light: "bg-slate-200 hover:bg-slate-300 text-slate-900",
      dark: "bg-white/10 hover:bg-white/20 text-white",
    },
    ghost: {
      light: "hover:bg-slate-100 text-slate-700",
      dark: "hover:bg-white/10 text-slate-200",
    },
    danger: {
      light: "bg-error-500 hover:bg-error-600 text-white",
      dark: "bg-error-500 hover:bg-error-400 text-white",
    },
    success: {
      light: "bg-success-500 hover:bg-success-600 text-white",
      dark: "bg-success-600 hover:bg-success-500 text-white",
    },
    warning: {
      light: "bg-warning-500 hover:bg-warning-600 text-white",
      dark: "bg-warning-500 hover:bg-warning-400 text-white",
    },
    info: {
      light: "bg-info-500 hover:bg-info-600 text-white",
      dark: "bg-info-600 hover:bg-info-500 text-white",
    },
    purple: {
      light: "bg-purple-500 hover:bg-purple-600 text-white",
      dark: "bg-purple-600 hover:bg-purple-500 text-white",
    },
    
    // Botões gradiente
    "primary-gradient": {
      light: "bg-gradient-to-r from-primary-600 to-indigo-500 hover:from-primary-700 hover:to-indigo-600 text-white",
      dark: "bg-gradient-to-r from-primary-600 to-indigo-500 hover:from-primary-500 hover:to-indigo-400 text-white",
    },
    "success-gradient": {
      light: "bg-gradient-to-r from-success-500 to-teal-500 hover:from-success-600 hover:to-teal-600 text-white",
      dark: "bg-gradient-to-r from-success-600 to-teal-500 hover:from-success-500 hover:to-teal-400 text-white",
    },
    "warning-gradient": {
      light: "bg-gradient-to-r from-warning-500 to-orange-500 hover:from-warning-600 hover:to-orange-600 text-white",
      dark: "bg-gradient-to-r from-warning-500 to-orange-500 hover:from-warning-400 hover:to-orange-400 text-white",
    },
    "danger-gradient": {
      light: "bg-gradient-to-r from-error-500 to-pink-500 hover:from-error-600 hover:to-pink-600 text-white",
      dark: "bg-gradient-to-r from-error-500 to-pink-500 hover:from-error-400 hover:to-pink-400 text-white",
    },
  },

  // Badge
  badge: {
    primary: {
      light: "bg-blue-100 text-blue-800",
      dark: "bg-blue-900 bg-opacity-30 text-blue-300 border border-blue-800/30",
    },
    secondary: {
      light: "bg-slate-100 text-slate-800",
      dark: "bg-slate-800 bg-opacity-30 text-slate-300 border border-slate-700/30",
    },
    success: {
      light: "bg-green-100 text-green-800",
      dark: "bg-green-900 bg-opacity-30 text-green-300 border border-green-800/30",
    },
    warning: {
      light: "bg-yellow-100 text-yellow-800",
      dark: "bg-yellow-900 bg-opacity-30 text-yellow-300 border border-yellow-800/30",
    },
    error: {
      light: "bg-red-100 text-red-800",
      dark: "bg-red-900 bg-opacity-30 text-red-300 border border-red-800/30",
    },
    info: {
      light: "bg-blue-100 text-blue-800",
      dark: "bg-blue-900 bg-opacity-30 text-blue-300 border border-blue-800/30",
    },
    purple: {
      light: "bg-purple-100 text-purple-800",
      dark: "bg-purple-900 bg-opacity-30 text-purple-300 border border-purple-800/30",
    },
  },

  // Input
  input: {
    light: "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500",
    dark: "bg-black/20 border-white/10 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400 backdrop-blur-sm",
  },

  // Status
  status: {
    success: {
      light: "bg-green-50 border-green-200 text-green-700",
      dark: "bg-green-900 bg-opacity-20 border-green-800 text-green-300",
    },
    warning: {
      light: "bg-yellow-50 border-yellow-200 text-yellow-700",
      dark: "bg-yellow-900 bg-opacity-20 border-yellow-800 text-yellow-300",
    },
    error: {
      light: "bg-red-50 border-red-200 text-red-700",
      dark: "bg-red-900 bg-opacity-20 border-red-800 text-red-300",
    },
    info: {
      light: "bg-blue-50 border-blue-200 text-blue-700",
      dark: "bg-blue-900 bg-opacity-20 border-blue-800 text-blue-300",
    },
  },

  // Hover States
  hover: {
    card: {
      light: "hover:shadow-md hover:scale-105",
      dark: "hover:shadow-2xl hover:scale-105 hover:bg-white/10",
    },
    button: {
      light: "hover:scale-105 transition-transform",
      dark: "hover:scale-105 transition-transform",
    },
  },

  // Focus States
  focus: {
    ring: {
      light: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
      dark: "focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900",
    },
  },
} as const;

// ================================
// CLASSES PRÉ-DEFINIDAS COMUNS
// ================================

export const commonClasses = {
  // Transições
  transition: "transition-all duration-300 ease-in-out",
  transitionFast: "transition-all duration-150 ease-in-out",
  transitionSlow: "transition-all duration-500 ease-in-out",
  
  // Animações
  hoverScale: "hover:scale-105",
  hoverLift: "hover:-translate-y-1",
  
  // Layout
  centerContent: "flex items-center justify-center",
  centerText: "text-center",
  
  // Espaçamentos
  padding: {
    sm: "p-2",
    md: "p-4", 
    lg: "p-6",
    xl: "p-8",
  },
  
  // Alinhamento
  flex: {
    row: "flex flex-row",
    col: "flex flex-col",
    rowCenter: "flex flex-row items-center",
    colCenter: "flex flex-col items-center",
    between: "flex justify-between items-center",
    center: "flex justify-center items-center",
  },
};

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Obtém classes CSS baseadas no tema atual
 */
export function getThemeClasses(theme: Theme, path: string): string {
  const keys = path.split(".");
  let current: any = themeClasses;
  
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      console.warn(`Theme class path not found: ${path}`);
      return "";
    }
  }
  
  if (typeof current === "object" && theme in current) {
    return current[theme];
  }
  
  console.warn(`Theme class not found for theme ${theme}: ${path}`);
  return "";
}

/**
 * Combina múltiplas classes de tema
 */
export function combineThemeClasses(theme: Theme, ...paths: string[]): string {
  return paths
    .map(path => getThemeClasses(theme, path))
    .filter(Boolean)
    .join(" ");
}

/**
 * Cria classes condicionais baseadas no tema
 */
export function conditionalThemeClasses(
  theme: Theme,
  condition: boolean,
  truePath: string,
  falsePath: string
): string {
  return getThemeClasses(theme, condition ? truePath : falsePath);
}

/**
 * Função utilitária para combinar classes CSS
 * Similar ao clsx/classnames
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Função para gerar classes responsivas
 */
export function responsiveClasses(base: string, sm?: string, md?: string, lg?: string, xl?: string): string {
  const classes = [base];
  if (sm) classes.push(`sm:${sm}`);
  if (md) classes.push(`md:${md}`);
  if (lg) classes.push(`lg:${lg}`);
  if (xl) classes.push(`xl:${xl}`);
  return classes.join(" ");
}