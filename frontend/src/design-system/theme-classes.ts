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
    light: "bg-white shadow-sm",
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
    primary: {
      light: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md",
      dark: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
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
      light: "bg-red-600 hover:bg-red-700 text-white",
      dark: "bg-red-500 hover:bg-red-600 text-white shadow-lg",
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
