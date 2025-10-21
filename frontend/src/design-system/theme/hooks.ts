// ================================
// TEMA - HOOKS
// ================================

import { useThemeContext } from './context';
import { getThemeClasses, cn, conditionalThemeClasses, combineThemeClasses, commonClasses } from './classes';
import { componentBaseStyles } from './components';
import { gradients } from './gradients';
import { type ButtonVariant, type BadgeVariant, type ComponentSize } from './types';

// ================================
// HOOK PRINCIPAL DE TEMA
// ================================

/**
 * Hook principal para obtenção de classes CSS baseadas no tema
 */
export function useThemeClasses() {
  const { theme, isDark, isLight } = useThemeContext();

  // Função para obter classes de anel de foco baseadas na variante
  const getFocusRing = (variant: string): string => {
    // Map de variantes para suas cores de foco correspondentes
    const focusRingColors: Record<string, string> = {
      'primary': 'focus:ring-blue-500',
      'secondary': 'focus:ring-gray-400',
      'success': 'focus:ring-green-500',
      'danger': 'focus:ring-red-500',
      'warning': 'focus:ring-yellow-500',
      'info': 'focus:ring-blue-400',
      'purple': 'focus:ring-purple-500',
      'pink': 'focus:ring-pink-500',
      'indigo': 'focus:ring-indigo-500',
      'orange': 'focus:ring-orange-500',
      'teal': 'focus:ring-teal-500',
      'primary-gradient': 'focus:ring-blue-500',
      'success-gradient': 'focus:ring-green-500',
      'danger-gradient': 'focus:ring-red-500',
      'warning-gradient': 'focus:ring-yellow-500',
      'info-gradient': 'focus:ring-blue-400',
      'purple-gradient': 'focus:ring-purple-500',
      'pink-gradient': 'focus:ring-pink-500',
      'indigo-gradient': 'focus:ring-indigo-500',
      'orange-gradient': 'focus:ring-orange-500',
      'teal-gradient': 'focus:ring-teal-500',
    };
    
    // Retorna a classe de foco para a variante específica ou padrão para primary
    return focusRingColors[variant] || 'focus:ring-blue-500';
  };

  return {
    // Estados do tema
    theme,
    isDark,
    isLight,
    
    // Funções de classe baseadas no tema
    get: (path: string) => getThemeClasses(theme, path),
    getFocusRing, // Nova função para obter anéis de foco
    
    // Acesso aos estilos de componente
    styles: componentBaseStyles,
    
    // Acesso aos gradientes
    gradients,
    
    // Classes comuns
    common: commonClasses,
    
    // Utilitários
    cn,
    
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
    combine: (...paths: string[]) => combineThemeClasses(theme, ...paths),
    conditional: (condition: boolean, truePath: string, falsePath: string) => 
      conditionalThemeClasses(theme, condition, truePath, falsePath),
  };
}

// ================================
// HOOKS ESPECÍFICOS DE COMPONENTE
// ================================

/**
 * Hook para classes de card
 */
export function useCardClasses(
  variant: "default" | "elevated" | "outlined" | "interactive" = "default", 
  additionalClasses?: string
) {
  const { cn, styles } = useThemeClasses();
  
  return cn(
    styles.card.base,
    styles.card[variant],
    additionalClasses
  );
}

/**
 * Hook para classes de botão
 */
export function useButtonClasses(
  variant: ButtonVariant = "primary",
  size: "sm" | "md" | "lg" = "md",
  additionalClasses?: string
) {
  const { cn, styles, gradients, getFocusRing } = useThemeClasses();
  
  let variantClass = '';
  
  // Verificar se é um botão gradiente
  if (variant.includes('-gradient')) {
    const gradientKey = variant as keyof typeof gradients.button;
    variantClass = gradients.button[gradientKey] || gradients.button['primary-gradient'];
  } else {
    // Botão normal
    const buttonKey = variant as keyof typeof styles.button;
    variantClass = styles.button[buttonKey] || styles.button.primary;
  }
  
  // Obter o anel de foco específico para esta variante
  const focusRingClass = getFocusRing(variant);
  
  return cn(
    styles.button.base,
    variantClass,
    focusRingClass,
    styles.button[size] || styles.button.md,
    additionalClasses
  );
}

/**
 * Hook para classes de input
 */
export function useInputClasses(
  size: "sm" | "md" | "lg" = "md",
  hasError: boolean = false,
  additionalClasses?: string
) {
  const { cn, styles } = useThemeClasses();
  
  return cn(
    styles.input.base,
    styles.input[size],
    hasError && styles.input.error,
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
  const { cn, styles } = useThemeClasses();
  
  return cn(
    styles.text[variant],
    additionalClasses
  );
}

/**
 * Hook para classes de ícone
 */
export function useIconClasses(
  color?: "primary" | "secondary" | "muted" | "accent" | "success" | "warning" | "error" | "info",
  size?: "sm" | "md" | "lg" | "xl",
  additionalClasses?: string
) {
  const { get, cn } = useThemeClasses();
  
  let sizeClass = "";
  if (size === "sm") sizeClass = "w-4 h-4";
  else if (size === "md") sizeClass = "w-5 h-5";
  else if (size === "lg") sizeClass = "w-6 h-6";
  else if (size === "xl") sizeClass = "w-8 h-8";
  
  return cn(
    color && get(`text.${color}`),
    sizeClass,
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
  variant: BadgeVariant = "info",
  size: "sm" | "md" = "sm",
  additionalClasses?: string
) {
  const { cn, styles } = useThemeClasses();
  
  // Verificar se a variante existe e usar fallback para 'info' se não existir
  const variantClass = styles.badge[variant] || styles.badge.info;
  
  return cn(
    styles.badge.base,
    variantClass,
    styles.badge[size],
    additionalClasses
  );
}

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

/**
 * Hook para classes de animação
 */
export function useAnimationClasses(
  animation: "fade" | "scale" | "slide" | "bounce" | "spin" = "fade",
  duration: "fast" | "normal" | "slow" = "normal",
  additionalClasses?: string
) {
  const { cn } = useThemeClasses();
  
  const animations = {
    fade: "transition-opacity",
    scale: "transition-transform",
    slide: "transition-transform",
    bounce: "transition-transform",
    spin: "transition-transform",
  };
  
  const durations = {
    fast: "duration-150",
    normal: "duration-300",
    slow: "duration-500",
  };
  
  return cn(
    animations[animation],
    durations[duration],
    additionalClasses
  );
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