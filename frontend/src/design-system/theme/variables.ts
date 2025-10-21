// ================================
// TEMA - VARIÁVEIS CSS
// ================================

import { designTokens } from './tokens';
import { Theme } from './types';

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
    cssVars['--focus-ring-offset'] = 'white';
    
    // Shadows
    cssVars['--shadow-color'] = '0, 0, 0';
    cssVars['--shadow-strength'] = '0.05';
  } 
  else if (theme === 'dark') {
    // Text colors
    cssVars['--text-primary'] = 'white';
    cssVars['--text-secondary'] = 'var(--color-secondary-200)';
    cssVars['--text-muted'] = 'var(--color-secondary-400)';
    
    // Background colors
    cssVars['--bg-page'] = '#0f172a'; // Tailwind slate-900
    cssVars['--bg-card'] = 'rgba(255, 255, 255, 0.05)';
    cssVars['--bg-card-offset'] = 'rgba(255, 255, 255, 0.1)';
    
    // Border colors
    cssVars['--border-subtle'] = 'rgba(255, 255, 255, 0.05)';
    cssVars['--border-default'] = 'rgba(255, 255, 255, 0.1)';
    cssVars['--border-strong'] = 'rgba(255, 255, 255, 0.15)';
    
    // Component-specific
    cssVars['--input-bg'] = 'rgba(255, 255, 255, 0.1)';
    cssVars['--input-border'] = 'rgba(255, 255, 255, 0.2)';
    cssVars['--input-text'] = 'white';
    cssVars['--input-placeholder'] = 'rgba(255, 255, 255, 0.5)';
    
    // Focus/states
    cssVars['--focus-ring'] = 'var(--color-primary-400)';
    cssVars['--focus-ring-offset'] = '#0f172a';
    
    // Shadows
    cssVars['--shadow-color'] = '200, 210, 255';
    cssVars['--shadow-strength'] = '0.08';
  }

  return cssVars;
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
  
  // Salvar preferência do usuário
  localStorage.setItem("admin-theme", theme);
}