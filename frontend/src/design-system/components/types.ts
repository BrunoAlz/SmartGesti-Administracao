// ================================
// TIPOS COMPARTILHADOS - DESIGN SYSTEM
// ================================

// Variantes para botões
export type ButtonVariant = 
  | "primary" | "secondary" | "ghost" | "danger" 
  | "success" | "warning" | "info" | "purple" | "pink"
  | "indigo" | "orange" | "teal"
  | "primary-gradient" | "success-gradient" | "warning-gradient"
  | "danger-gradient" | "info-gradient" | "purple-gradient"
  | "pink-gradient" | "indigo-gradient" | "orange-gradient" | "teal-gradient";

// Variantes para badges
export type BadgeVariant = 
  | "success" | "danger" | "warning" | "info" 
  | "purple" | "gray" | "primary";

// Variantes para cards
export type CardVariant = 
  | "default" | "elevated" | "bordered" | "interactive";

// Tamanhos para componentes
export type ComponentSize = "sm" | "md" | "lg";