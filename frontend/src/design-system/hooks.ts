import { useTheme } from "../admin/contexts/ThemeContext";
import { 
  getThemeClasses, 
  cn,
  componentBaseStyles
} from "./theme";

// ================================
// HOOK PRINCIPAL DE TEMA
// ================================

export function useThemeClasses() {
  const themeContext = useTheme();
  
  const { theme, isDark, isLight } = themeContext;

  return {
    theme,
    isDark,
    isLight,
    
    // Funções de classe baseadas nas variáveis CSS
    get: (path: string) => getThemeClasses(theme, path),
    
    // Acesso aos estilos de componente
    styles: componentBaseStyles,
    
    // Utilitários
    cn: (...classes: (string | undefined | null | false)[]) => cn(...classes),
    
    // Função para classes responsivas
    responsive: (base: string, sm?: string, md?: string, lg?: string, xl?: string) => {
      const classes = [base];
      if (sm) classes.push(`sm:${sm}`);
      if (md) classes.push(`md:${md}`);
      if (lg) classes.push(`lg:${lg}`);
      if (xl) classes.push(`xl:${xl}`);
      return classes.join(" ");
    },
    
    // Compatibilidade legada
    combine: (...paths: string[]) => paths.map(path => getThemeClasses(theme, path)).filter(Boolean).join(" "),
    conditional: (condition: boolean, truePath: string, falsePath: string) => 
      getThemeClasses(theme, condition ? truePath : falsePath),
  };
}

// ================================
// HOOKS ESPECÍFICOS
// ================================

/**
 * Hook para classes de card
 */
export function useCardClasses(variant: "default" | "elevated" | "outlined" | "interactive" = "default", additionalClasses?: string) {
  const { cn, styles } = useThemeClasses();
  
  return cn(
    styles.card.base,
    styles.card[variant],
    "p-6 transition-all duration-200",
    additionalClasses
  );
}

/**
 * Hook para classes de botão
 */
export function useButtonClasses(
  variant: 
    // Botões Normais (Sólidos)
    | "primary" 
    | "secondary" 
    | "ghost" 
    | "danger" 
    | "success" 
    | "warning" 
    | "info" 
    | "purple" 
    | "pink" 
    | "indigo" 
    | "orange" 
    | "teal"
    // Botões Gradientes
    | "primary-gradient"
    | "success-gradient"
    | "warning-gradient"
    | "danger-gradient"
    | "info-gradient"
    | "purple-gradient"
    | "pink-gradient"
    | "indigo-gradient"
    | "orange-gradient"
    | "teal-gradient" = "primary",
  size: "sm" | "md" | "lg" = "md",
  additionalClasses?: string
) {
  const { cn, styles } = useThemeClasses();
  
  // Mapear variantes antigas para novas
  const variantMapping: Record<string, string> = {
    "primary": "primary",
    "secondary": "secondary",
    "ghost": "ghost",
    "danger": "error", // Mapeando para o nome padronizado
    "success": "success",
    "warning": "warning",
    "info": "info",
    
    // Cores adicionais
    "purple": "bg-purple-600 hover:bg-purple-700 text-white",
    "pink": "bg-pink-600 hover:bg-pink-700 text-white",
    "indigo": "bg-indigo-600 hover:bg-indigo-700 text-white",
    "orange": "bg-orange-600 hover:bg-orange-700 text-white",
    "teal": "bg-teal-600 hover:bg-teal-700 text-white",
    
    // Gradientes
    "primary-gradient": "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
    "success-gradient": "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white",
    "warning-gradient": "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white",
    "danger-gradient": "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white",
    "info-gradient": "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white",
    "purple-gradient": "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white",
    "pink-gradient": "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white",
    "indigo-gradient": "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white",
    "orange-gradient": "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white",
    "teal-gradient": "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white",
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  // Usar o estilo baseado em CSS var quando for uma cor básica, ou usar classes diretas para gradientes e cores específicas
  const mappedVariant = variantMapping[variant] || "primary";
  const variantClasses = styles.button[mappedVariant as keyof typeof styles.button] || variantMapping[variant];
  
  return cn(
    styles.button.base,
    variantClasses,
    sizeClasses[size],
    "shadow-sm hover:shadow-md",
    additionalClasses
  );
}

/**
 * Hook para classes de input
 */
export function useInputClasses(additionalClasses?: string) {
  const { get, cn } = useThemeClasses();
  
  return cn(
    get("input"),
    "w-full px-3 py-2 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    additionalClasses
  );
}

/**
 * Hook para classes de texto
 */
export function useTextClasses(
  variant: "primary" | "secondary" | "muted" | "accent" = "primary",
  additionalClasses?: string
) {
  const { get, cn } = useThemeClasses();
  
  return cn(
    get(`text.${variant}`),
    additionalClasses
  );
}

/**
 * Hook para classes de ícone
 */
export function useIconClasses(
  variant: "primary" | "secondary" | "accent" | "success" | "warning" | "error" = "primary",
  size: "sm" | "md" | "lg" = "md",
  additionalClasses?: string
) {
  const { get, cn } = useThemeClasses();
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6",
  };
  
  return cn(
    get(`icon.${variant}`),
    sizeClasses[size],
    additionalClasses
  );
}

/**
 * Hook para classes de status
 */
export function useStatusClasses(
  status: "success" | "warning" | "error" | "info",
  additionalClasses?: string
) {
  const { get, cn } = useThemeClasses();
  
  return cn(
    get(`status.${status}`),
    "px-3 py-2 rounded-md border text-sm font-medium",
    additionalClasses
  );
}

/**
 * Hook para classes de badge
 */
export function useBadgeClasses(
  variant: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "purple" = "info",
  size: "sm" | "md" = "sm",
  additionalClasses?: string
) {
  const { cn, styles } = useThemeClasses();
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };
  
  // Mapeamento de variantes antigas para novas
  const variantMapping: Record<string, keyof typeof styles.badge> = {
    "success": "success",
    "warning": "warning",
    "error": "error",
    "info": "info",
    "purple": "primary", // fallback
    "primary": "primary",
    "secondary": "secondary"
  };
  
  const mappedVariant = variantMapping[variant] || "info";
  
  return cn(
    styles.badge.base,
    styles.badge[mappedVariant],
    sizeClasses[size],
    additionalClasses
  );
}

// ================================
// HOOKS DE LAYOUT
// ================================

/**
 * Hook para classes de layout principal
 */
export function useLayoutClasses(additionalClasses?: string) {
  const { get, cn } = useThemeClasses();
  
  return cn(
    get("layout"),
    "min-h-screen",
    additionalClasses
  );
}

/**
 * Hook para classes de sidebar
 */
export function useSidebarClasses(collapsed?: boolean, additionalClasses?: string) {
  const { get, cn } = useThemeClasses();
  
  return cn(
    get("background.primary"),
    "border-r transition-all duration-300",
    collapsed ? "w-16" : "w-64",
    additionalClasses
  );
}

/**
 * Hook para classes de navbar
 */
export function useNavbarClasses(scrolled?: boolean, additionalClasses?: string) {
  const { get, cn } = useThemeClasses();
  
  return cn(
    get("background.primary"),
    "border-b transition-all duration-300",
    scrolled ? "shadow-md backdrop-blur-xl" : "",
    additionalClasses
  );
}

// ================================
// HOOKS DE ANIMAÇÃO
// ================================

/**
 * Hook para classes de animação
 */
export function useAnimationClasses(
  type: "fade" | "slide" | "scale" | "bounce" = "fade",
  duration: "fast" | "normal" | "slow" = "normal",
  additionalClasses?: string
) {
  const { cn } = useThemeClasses();
  
  const animationClasses = {
    fade: "opacity-0 animate-fade-in",
    slide: "translate-y-4 animate-slide-up",
    scale: "scale-95 animate-scale-in",
    bounce: "animate-bounce-in",
  };
  
  const durationClasses = {
    fast: "duration-150",
    normal: "duration-300",
    slow: "duration-500",
  };
  
  return cn(
    animationClasses[type],
    durationClasses[duration],
    "transition-all ease-in-out",
    additionalClasses
  );
}

// ================================
// HOOKS DE RESPONSIVIDADE
// ================================

/**
 * Hook para classes responsivas
 */
export function useResponsiveClasses(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
) {
  const { responsive } = useThemeClasses();
  
  return responsive(base, sm, md, lg, xl);
}

/**
 * Hook para breakpoints
 */
export function useBreakpoint() {
  // Esta função seria implementada com um hook de media query
  // Por enquanto, retorna um valor padrão
  return {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLarge: false,
  };
}
