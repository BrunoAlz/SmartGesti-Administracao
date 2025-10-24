// ================================
// TEMA - TIPOS
// ================================

export type Theme = 'light' | 'dark';

// Variantes de botões
export type ButtonVariant = 
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
  | "teal-gradient"
  | "secondary-gradient";

// Variantes de badge
export type BadgeVariant = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "warning" 
  | "error" 
  | "danger" 
  | "info" 
  | "purple"
  | "pink"
  | "indigo"
  | "orange"
  | "teal"
  | "gray";

// Tamanhos de componentes
export type ComponentSize = "sm" | "md" | "lg";