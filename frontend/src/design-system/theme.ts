// ================================
// SISTEMA DE TEMA UNIFICADO - SmartGesTI
// ================================

import { designTokens } from './tokens';

export type Theme = 'light' | 'dark';

// ================================
// DESIGN TOKENS CSS VARIABLES
// ================================

/**
 * Gera todas as variáveis CSS necessárias para o tema
 * Isso permite usar var(--color-primary-500) em qualquer lugar
 */
export function generateThemeVariables(theme: Theme) {
  const cssVars: Record<string, string> = {};

  // Gerar variáveis para todas as cores do design system
  Object.entries(designTokens.colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      cssVars[`--color-${colorName}-${shade}`] = value;
    });
  });

  // Variáveis específicas por tema (semânticas)
  if (theme === 'light') {
    // Text colors
    cssVars['--text-primary'] = 'var(--color-secondary-900)';
    cssVars['--text-secondary'] = 'var(--color-secondary-700)';
    cssVars['--text-muted'] = 'var(--color-secondary-500)';
    
    // Background colors
    cssVars['--bg-page'] = 'var(--color-secondary-50)';
    cssVars['--bg-card'] = 'white';
    cssVars['--bg-card-offset'] = 'var(--color-secondary-50)';
    
    // Border colors
    cssVars['--border-subtle'] = 'var(--color-secondary-100)';
    cssVars['--border-default'] = 'var(--color-secondary-200)';
    cssVars['--border-strong'] = 'var(--color-secondary-300)';

    // Component-specific
    cssVars['--input-bg'] = 'white';
    cssVars['--input-border'] = 'var(--color-secondary-300)';
    cssVars['--input-text'] = 'var(--color-secondary-900)';
    cssVars['--input-placeholder'] = 'var(--color-secondary-500)';
    
    // Focus/states
    cssVars['--focus-ring'] = 'var(--color-primary-500)';
    cssVars['--hover-overlay'] = 'rgba(0, 0, 0, 0.05)';
    
    // Linhas divisórias e elementos decorativos - com contraste aumentado para visibilidade
    cssVars['--divider-color'] = 'var(--color-secondary-400)';
    cssVars['--dotted-color'] = 'var(--color-secondary-500)';
    cssVars['--dashed-color'] = 'var(--color-secondary-400)';
  } 
  else {
    // Text colors
    cssVars['--text-primary'] = 'white';
    cssVars['--text-secondary'] = 'var(--color-secondary-200)';
    cssVars['--text-muted'] = 'var(--color-secondary-300)';
    
    // Background colors
    cssVars['--bg-page'] = 'var(--color-secondary-900)';
    cssVars['--bg-card'] = 'rgba(0, 0, 0, 0.2)';
    cssVars['--bg-card-offset'] = 'rgba(255, 255, 255, 0.01)';
    
    // Border colors - Com visibilidade melhorada para cards e elementos estruturais
    cssVars['--border-subtle'] = 'rgba(255, 255, 255, 0.05)';    // +0.03 (antes 0.02)
    cssVars['--border-default'] = 'rgba(255, 255, 255, 0.08)';   // +0.04 (antes 0.04)
    cssVars['--border-strong'] = 'rgba(255, 255, 255, 0.12)';    // +0.04 (antes 0.08)
    
    // Linhas divisórias e elementos decorativos - com contraste reduzido para melhor experiência
    cssVars['--divider-color'] = 'rgba(255, 255, 255, 0.07)';
    cssVars['--dotted-color'] = 'rgba(255, 255, 255, 0.07)';
    cssVars['--dashed-color'] = 'rgba(255, 255, 255, 0.07)';
    
    // Component-specific
    cssVars['--input-bg'] = 'rgba(0, 0, 0, 0.2)';
    cssVars['--input-border'] = 'rgba(255, 255, 255, 0.12)';
    cssVars['--input-text'] = 'white';
    cssVars['--input-placeholder'] = 'var(--color-secondary-400)';
    
    // Focus/states
    cssVars['--focus-ring'] = 'var(--color-primary-400)';
    cssVars['--hover-overlay'] = 'rgba(255, 255, 255, 0.03)';
  }

  // Variáveis para componentes específicos baseadas em variantes
  const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'purple', 'pink', 'indigo', 'orange', 'teal'];
  
  variants.forEach(variant => {
    // Mapear variantes para as cores reais do design system
    const colorMap: Record<string, string> = {
      primary: 'primary',
      secondary: 'secondary',
      success: 'success', 
      warning: 'warning',
      error: 'error',
      info: 'primary',
      purple: 'secondary', // Mapear para cores reais quando necessário
      pink: 'secondary',
      indigo: 'secondary',
      orange: 'warning',
      teal: 'success',
    };
    
    const mappedColor = colorMap[variant] || 'secondary';
    
    if (theme === 'light') {
      cssVars[`--${variant}-bg`] = `var(--color-${mappedColor}-600)`;
      cssVars[`--${variant}-bg-hover`] = `var(--color-${mappedColor}-700)`;
      cssVars[`--${variant}-bg-subtle`] = `var(--color-${mappedColor}-50)`;
      cssVars[`--${variant}-border`] = `var(--color-${mappedColor}-200)`;
      cssVars[`--${variant}-text`] = `var(--color-${mappedColor}-700)`;
    } else {
      cssVars[`--${variant}-bg`] = `var(--color-${mappedColor}-600)`;
      cssVars[`--${variant}-bg-hover`] = `var(--color-${mappedColor}-700)`;
      cssVars[`--${variant}-bg-subtle`] = `rgba(var(--color-${mappedColor}-400-rgb), 0.15)`;
      cssVars[`--${variant}-border`] = `rgba(var(--color-${mappedColor}-400-rgb), 0.2)`;
      cssVars[`--${variant}-text`] = `var(--color-${mappedColor}-300)`;
    }
  });

  return cssVars;
}

// ================================
// COMPONENT BASE STYLES
// ================================

/**
 * Estilos base para componentes que usam CSS variables
 */
export const componentBaseStyles = {
  // Layout
  layout: 'bg-[var(--bg-page)] min-h-screen transition-colors duration-200',
  sidebar: 'bg-[var(--bg-card)] border-[var(--border-subtle)] backdrop-blur-md transition-colors duration-200',
  navbar: 'bg-[var(--bg-card)] border-[var(--border-subtle)] backdrop-blur-md transition-colors duration-200',
  content: 'bg-[var(--bg-card)] border-[var(--border-subtle)] transition-colors duration-200',
  
  // Card
  card: {
    base: 'bg-[var(--bg-card)] rounded-lg transition-all duration-200 border border-[var(--border-subtle)]',
    default: 'shadow-sm hover:shadow-md',
    elevated: 'shadow-md hover:shadow-lg',
    outlined: 'border-2 border-[var(--border-subtle)]',
    interactive: 'cursor-pointer hover:bg-[var(--hover-overlay)]',
  },
  
  // Text
  text: {
    primary: 'text-[var(--text-primary)]',
    secondary: 'text-[var(--text-secondary)]',
    muted: 'text-[var(--text-muted)]',
  },
  
  // Inputs
  input: 'bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] focus:border-[var(--focus-ring)] focus:ring-2 focus:ring-[var(--focus-ring)] transition-all duration-200',
  
  // Buttons - usando CSS vars para todas as variantes
  button: {
    base: 'rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary: 'bg-[var(--primary-bg)] hover:bg-[var(--primary-bg-hover)] text-white shadow-sm hover:shadow-md',
    secondary: 'bg-[var(--secondary-bg)] hover:bg-[var(--secondary-bg-hover)] text-white shadow-sm hover:shadow-md',
    success: 'bg-[var(--success-bg)] hover:bg-[var(--success-bg-hover)] text-white shadow-sm hover:shadow-md',
    warning: 'bg-[var(--warning-bg)] hover:bg-[var(--warning-bg-hover)] text-white shadow-sm hover:shadow-md',
    error: 'bg-[var(--error-bg)] hover:bg-[var(--error-bg-hover)] text-white shadow-sm hover:shadow-md',
    info: 'bg-[var(--info-bg)] hover:bg-[var(--info-bg-hover)] text-white shadow-sm hover:shadow-md',
    ghost: 'bg-transparent hover:bg-[var(--hover-overlay)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
  },
  
  // Badge 
  badge: {
    base: 'inline-flex items-center border rounded-full font-medium',
    primary: 'bg-[var(--primary-bg-subtle)] text-[var(--primary-text)] border-[var(--primary-border)]',
    secondary: 'bg-[var(--secondary-bg-subtle)] text-[var(--secondary-text)] border-[var(--secondary-border)]',
    success: 'bg-[var(--success-bg-subtle)] text-[var(--success-text)] border-[var(--success-border)]',
    warning: 'bg-[var(--warning-bg-subtle)] text-[var(--warning-text)] border-[var(--warning-border)]',
    error: 'bg-[var(--error-bg-subtle)] text-[var(--error-text)] border-[var(--error-border)]',
    info: 'bg-[var(--info-bg-subtle)] text-[var(--info-text)] border-[var(--info-border)]',
  },
  
  // Status
  status: {
    base: 'px-3 py-2 rounded-md border text-sm font-medium',
    success: 'bg-[var(--success-bg-subtle)] text-[var(--success-text)] border-[var(--success-border)]',
    warning: 'bg-[var(--warning-bg-subtle)] text-[var(--warning-text)] border-[var(--warning-border)]',
    error: 'bg-[var(--error-bg-subtle)] text-[var(--error-text)] border-[var(--error-border)]',
    info: 'bg-[var(--info-bg-subtle)] text-[var(--info-text)] border-[var(--info-border)]',
  },
  
  // Icons
  icon: {
    primary: 'text-[var(--text-primary)]',
    secondary: 'text-[var(--text-secondary)]',
    muted: 'text-[var(--text-muted)]',
    success: 'text-[var(--success-text)]',
    warning: 'text-[var(--warning-text)]',
    error: 'text-[var(--error-text)]',
    info: 'text-[var(--info-text)]',
  },
  
  // Linhas divisórias - com espessura e contraste ajustados para melhor visibilidade
  divider: {
    horizontal: 'h-[1px] w-full bg-[var(--divider-color)]',
    vertical: 'w-[1px] h-full bg-[var(--divider-color)]',
    dotted: 'border-t-[1px] border-dotted border-[var(--dotted-color)]',
    dashed: 'border-t-[1px] border-dashed border-[var(--dashed-color)]',
  },
};

// ================================
// UTILITY FUNCTIONS 
// ================================

/**
 * Combina classes CSS de forma inteligente
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Aplica as variáveis CSS do tema ao documento
 */
export function applyTheme(theme: Theme, rootElement: HTMLElement = document.documentElement) {
  const variables = generateThemeVariables(theme);
  
  // Aplicar cada variável CSS ao elemento
  Object.entries(variables).forEach(([key, value]) => {
    rootElement.style.setProperty(key, value);
  });
  
  // Adicionar/remover classes do documento
  if (theme === 'dark') {
    rootElement.classList.add('dark');
    rootElement.classList.remove('light');
  } else {
    rootElement.classList.add('light');
    rootElement.classList.remove('dark');
  }
  
  // Salvar tema nas preferências do usuário
  localStorage.setItem('admin-theme', theme);
}

// ================================
// COMPATIBILITY FUNCTIONS
// ================================

/**
 * Função para manter compatibilidade com o sistema antigo
 * Pode ser gradualmente removida conforme a migração progride
 */
export function getThemeClasses(theme: Theme, path: string): string {
  const keys = path.split('.');
  let result = '';
  
  // Mapear caminhos antigos para novos estilos baseados em CSS vars
  if (keys[0] === 'card') {
    result = componentBaseStyles.card.base;
  }
  else if (keys[0] === 'text' && keys[1]) {
    result = componentBaseStyles.text[keys[1] as keyof typeof componentBaseStyles.text] || '';
  }
  else if (keys[0] === 'button' && keys[1]) {
    const variant = keys[1];
    result = cn(
      componentBaseStyles.button.base,
      componentBaseStyles.button[variant as keyof typeof componentBaseStyles.button] || ''
    );
  }
  else if (keys[0] === 'input') {
    result = componentBaseStyles.input;
  }
  
  return result;
}