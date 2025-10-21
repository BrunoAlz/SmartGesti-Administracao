// ================================
// TEMA - ÍNDICE PRINCIPAL
// ================================

// Tipos
export { 
  type Theme,
  type ButtonVariant,
  type BadgeVariant,
  type ComponentSize
} from './types';

// Context
export { ThemeContext, useThemeContext } from './context';

// Provider
export { ThemeProvider } from './provider';

// Estilos
export { gradients } from './gradients';

// Hooks
export { 
  useThemeClasses,
  useCardClasses,
  useButtonClasses,
  useInputClasses,
  useTextClasses,
  useIconClasses,
  useStatusClasses,
  useBadgeClasses,
  useLayoutClasses,
  useSidebarClasses,
  useNavbarClasses,
  useAnimationClasses,
  useBreakpoint,
} from './hooks';

// Utilitários
export { 
  applyTheme, 
} from './variables';

export { 
  getThemeClasses, 
  combineThemeClasses, 
  conditionalThemeClasses,
  commonClasses,
  cn,
  responsiveClasses,
  themeClasses,
} from './classes';

// Tokens
export { 
  designTokens,
  type ColorScale,
  type ColorShade,
  type Spacing, 
  type FontSize, 
  type FontWeight, 
  type BorderRadius, 
  type BoxShadow, 
  type Breakpoint 
} from './tokens';

// Componentes Base
export { componentBaseStyles } from './components';