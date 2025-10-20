import { useTheme } from "../admin/contexts/ThemeContext";
import { 
  getThemeClasses, 
  combineThemeClasses, 
  conditionalThemeClasses,
  cn,
  responsiveClasses 
} from "./theme-classes";

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
    
    // Funções de classe
    get: (path: string) => getThemeClasses(theme, path),
    combine: (...paths: string[]) => combineThemeClasses(theme, ...paths),
    conditional: (condition: boolean, truePath: string, falsePath: string) => 
      conditionalThemeClasses(theme, condition, truePath, falsePath),
    
    // Utilitários
    cn: (...classes: (string | undefined | null | false)[]) => cn(...classes),
    responsive: (base: string, sm?: string, md?: string, lg?: string, xl?: string) =>
      responsiveClasses(base, sm, md, lg, xl),
  };
}

// ================================
// HOOKS ESPECÍFICOS
// ================================

/**
 * Hook para classes de card
 */
export function useCardClasses(additionalClasses?: string) {
  const { get, cn } = useThemeClasses();
  
  return cn(
    get("card"),
    "rounded-lg p-6 transition-all duration-200",
    additionalClasses
  );
}

/**
 * Hook para classes de botão
 */
export function useButtonClasses(
  variant: "primary" | "secondary" | "ghost" | "danger" = "primary",
  size: "sm" | "md" | "lg" = "md",
  additionalClasses?: string
) {
  const { get, cn } = useThemeClasses();
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  return cn(
    get(`button.${variant}`),
    sizeClasses[size],
    "rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
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
