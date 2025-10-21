// ================================
// TEMA - COMPONENTES BASE
// ================================

export const componentBaseStyles = {
  // Layout
  layout: 'bg-[var(--bg-page)] min-h-screen transition-colors duration-200',
  sidebar: 'bg-[var(--bg-card)] border-[var(--border-subtle)] backdrop-blur-md transition-colors duration-200',
  navbar: 'bg-[var(--bg-card)] border-[var(--border-subtle)] backdrop-blur-md transition-colors duration-200',
  
  // Cards
  card: {
    base: 'rounded-lg overflow-hidden border transition-all duration-200',
    default: 'bg-[var(--bg-card)] border-[var(--border-subtle)] shadow-sm',
    elevated: 'bg-[var(--bg-card)] border-[var(--border-subtle)] shadow-lg',
    outlined: 'bg-transparent border-[var(--border-default)]',
    interactive: 'bg-[var(--bg-card)] border-[var(--border-subtle)] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer',
  },
  
  // Buttons
  button: {
    base: 'rounded-md px-4 py-2 font-medium inline-flex items-center justify-center transition-all duration-200 focus:outline-none',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 dark:hover:bg-white/10 dark:text-gray-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    info: 'bg-blue-500 hover:bg-blue-600 text-white',
    purple: 'bg-purple-600 hover:bg-purple-700 text-white',
    pink: 'bg-pink-500 hover:bg-pink-600 text-white',
    indigo: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    orange: 'bg-orange-500 hover:bg-orange-600 text-white',
    teal: 'bg-teal-500 hover:bg-teal-600 text-white',
    
    // Tamanhos
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  },
  
  // Badge
  badge: {
    base: 'inline-flex items-center rounded-full font-medium',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border dark:border-blue-800/30',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300 dark:border dark:border-gray-700/30',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 dark:border dark:border-green-800/30',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border dark:border-yellow-800/30',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border dark:border-red-800/30',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border dark:border-red-800/30',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border dark:border-blue-800/30',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 dark:border dark:border-purple-800/30',
    pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 dark:border dark:border-pink-800/30',
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border dark:border-indigo-800/30',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 dark:border dark:border-orange-800/30',
    teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 dark:border dark:border-teal-800/30',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300 dark:border dark:border-gray-700/30',
    
    // Tamanhos
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
  },
  
  // Input
  input: {
    base: 'block w-full rounded-md border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-text)] placeholder-[var(--input-placeholder)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:border-transparent transition-colors duration-200',
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-2.5',
    error: 'border-error-500 focus:ring-error-500',
  },
  
  // Text
  text: {
    primary: 'text-[var(--text-primary)]',
    secondary: 'text-[var(--text-secondary)]',
    muted: 'text-[var(--text-muted)]',
    accent: 'text-primary-600 dark:text-primary-400',
  },
};