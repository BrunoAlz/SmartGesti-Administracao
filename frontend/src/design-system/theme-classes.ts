// ================================
// SISTEMA DE CLASSES TEMÁTICAS
// ================================

export type Theme = "light" | "dark";

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
      dark: "text-slate-300",
    },
    accent: {
      light: "text-blue-700",
      dark: "text-blue-300",
    },
    success: {
      light: "text-emerald-700",
      dark: "text-emerald-300",
    },
    warning: {
      light: "text-amber-700",
      dark: "text-amber-300",
    },
    error: {
      light: "text-rose-700",
      dark: "text-rose-300",
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
    // ========================================
    // BOTÕES NORMAIS (SÓLIDOS)
    // ========================================
    primary: {
      light: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    },
    secondary: {
      light: "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300",
      dark: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20",
    },
    ghost: {
      light: "text-slate-600 hover:bg-slate-100 hover:text-slate-800",
      dark: "text-slate-200 hover:bg-white/10 hover:text-white",
    },
    danger: {
      light: "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl",
    },
    success: {
      light: "bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
    },
    warning: {
      light: "bg-yellow-600 hover:bg-yellow-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl",
    },
    info: {
      light: "bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg hover:shadow-xl",
    },
    purple: {
      light: "bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl",
    },
    pink: {
      light: "bg-pink-600 hover:bg-pink-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:shadow-xl",
    },
    indigo: {
      light: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl",
    },
    orange: {
      light: "bg-orange-600 hover:bg-orange-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl",
    },
    teal: {
      light: "bg-teal-600 hover:bg-teal-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl",
    },
    
    // ========================================
    // BOTÕES GRADIENTES (VIBRANTES)
    // ========================================
    "primary-gradient": {
      light: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl",
      dark: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl",
    },
    "success-gradient": {
      light: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl",
      dark: "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl",
    },
    "warning-gradient": {
      light: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl",
      dark: "bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white shadow-xl hover:shadow-2xl",
    },
    "danger-gradient": {
      light: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl",
      dark: "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-xl hover:shadow-2xl",
    },
    "info-gradient": {
      light: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl",
      dark: "bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white shadow-xl hover:shadow-2xl",
    },
    "purple-gradient": {
      light: "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl",
      dark: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl",
    },
    "pink-gradient": {
      light: "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl",
      dark: "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl",
    },
    "indigo-gradient": {
      light: "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl",
      dark: "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl",
    },
    "orange-gradient": {
      light: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl",
      dark: "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl",
    },
    "teal-gradient": {
      light: "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl",
      dark: "bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white shadow-xl hover:shadow-2xl",
    },
  },

  // Inputs
  input: {
    light: "bg-white border-slate-300 text-slate-800 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500",
    dark: "bg-white/10 border-white/20 text-white placeholder-slate-300/70 backdrop-blur-sm focus:border-blue-400 focus:ring-blue-400",
  },

  // Icons
  icon: {
    primary: {
      light: "text-slate-600",
      dark: "text-slate-300",
    },
    secondary: {
      light: "text-slate-500",
      dark: "text-slate-400",
    },
    accent: {
      light: "text-blue-600",
      dark: "text-blue-400",
    },
    success: {
      light: "text-green-600",
      dark: "text-green-400",
    },
    warning: {
      light: "text-yellow-600",
      dark: "text-yellow-400",
    },
    error: {
      light: "text-red-600",
      dark: "text-red-400",
    },
  },

  // Status Colors
  status: {
    success: {
      light: "bg-green-50 text-green-800 border-green-200",
      dark: "bg-green-500/20 text-green-300 border-green-400/30",
    },
    warning: {
      light: "bg-yellow-50 text-yellow-800 border-yellow-200",
      dark: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
    },
    error: {
      light: "bg-red-50 text-red-800 border-red-200",
      dark: "bg-red-500/20 text-red-300 border-red-400/30",
    },
    info: {
      light: "bg-blue-50 text-blue-800 border-blue-200",
      dark: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    },
    purple: {
      light: "bg-purple-50 text-purple-800 border-purple-200",
      dark: "bg-purple-500/20 text-purple-300 border-purple-400/30",
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
  const path = condition ? truePath : falsePath;
  return getThemeClasses(theme, path);
}

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
  
  margin: {
    sm: "m-2",
    md: "m-4",
    lg: "m-6", 
    xl: "m-8",
  },
  
  // Bordas
  rounded: {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  },
  
  // Sombras
  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  },
} as const;

// ================================
// UTILITÁRIOS DE CLASSE
// ================================

/**
 * Combina classes CSS de forma inteligente
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Cria classes responsivas
 */
export function responsiveClasses(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
): string {
  const classes = [base];
  if (sm) classes.push(`sm:${sm}`);
  if (md) classes.push(`md:${md}`);
  if (lg) classes.push(`lg:${lg}`);
  if (xl) classes.push(`xl:${xl}`);
  return classes.join(" ");
}
