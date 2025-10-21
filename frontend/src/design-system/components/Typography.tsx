import React from "react";
import { useThemeClasses } from "../hooks";

// ================================
// TIPOS
// ================================

export interface TypographyProps {
  /**
   * Conteúdo do texto
   */
  children: React.ReactNode;
  
  /**
   * Variante de tipografia
   * @default "body"
   */
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body" | "body2" | "caption" | "overline" | "code";
  
  /**
   * Cor do texto
   * @default "primary"
   */
  color?: "primary" | "secondary" | "muted" | "accent" | "success" | "warning" | "error" | "white";
  
  /**
   * Peso da fonte
   */
  weight?: "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  
  /**
   * Alinhamento do texto
   */
  align?: "left" | "center" | "right" | "justify";
  
  /**
   * Transformação de texto
   */
  transform?: "uppercase" | "lowercase" | "capitalize" | "normal-case";
  
  /**
   * Decoração de texto
   */
  decoration?: "underline" | "line-through" | "no-underline";
  
  /**
   * Classes CSS adicionais
   */
  className?: string;
  
  /**
   * Componente HTML a ser renderizado
   */
  as?: React.ElementType;
}

/**
 * Componente Typography - Sistema tipográfico com suporte a temas claro/escuro
 */
export function Typography({
  children,
  variant = "body",
  color = "primary",
  weight,
  align,
  transform,
  decoration,
  className,
  as,
  ...props
}: TypographyProps) {
  const { get, cn } = useThemeClasses();
  
  // Define o elemento HTML com base na variante
  const Component = as || getDefaultComponent(variant);
  
  // Define as classes de tamanho e espaçamento para cada variante
  const variantClasses = {
    h1: "text-4xl md:text-5xl font-bold leading-tight",
    h2: "text-3xl md:text-4xl font-bold leading-tight",
    h3: "text-2xl md:text-3xl font-semibold leading-snug",
    h4: "text-xl md:text-2xl font-semibold leading-snug",
    h5: "text-lg md:text-xl font-medium leading-normal",
    h6: "text-base md:text-lg font-medium leading-normal",
    subtitle1: "text-lg font-normal leading-relaxed",
    subtitle2: "text-base font-medium leading-relaxed",
    body: "text-base font-normal leading-relaxed",
    body2: "text-sm font-normal leading-relaxed",
    caption: "text-xs font-normal leading-normal",
    overline: "text-xs font-medium uppercase tracking-wider",
    code: "text-sm font-mono px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800",
  };
  
  // Define classes para propriedades opcionais
  const weightClasses = weight ? `font-${weight}` : "";
  const alignClasses = align ? `text-${align}` : "";
  const transformClasses = transform || "";
  const decorationClasses = decoration || "";
  
  // Obtém classes de cor baseadas no tema
  const colorClass = getColorClass(color);
  
  return (
    <Component 
      className={cn(
        variantClasses[variant],
        colorClass,
        weightClasses,
        alignClasses,
        transformClasses,
        decorationClasses,
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  );
}

// ================================
// FUNÇÕES AUXILIARES
// ================================

/**
 * Retorna o componente padrão com base na variante
 */
function getDefaultComponent(variant: string): React.ElementType {
  switch (variant) {
    case "h1": return "h1";
    case "h2": return "h2";
    case "h3": return "h3";
    case "h4": return "h4";
    case "h5": return "h5";
    case "h6": return "h6";
    case "subtitle1": return "h6";
    case "subtitle2": return "h6";
    case "body": return "p";
    case "body2": return "p";
    case "caption": return "span";
    case "overline": return "span";
    case "code": return "code";
    default: return "p";
  }
}

/**
 * Retorna a classe de cor baseada no tema
 */
function getColorClass(color: string): string {
  switch (color) {
    case "primary": return "text-[var(--text-primary)]";
    case "secondary": return "text-[var(--text-secondary)]";
    case "muted": return "text-[var(--text-muted)]";
    case "accent": return "text-blue-600 dark:text-blue-400";
    case "success": return "text-green-600 dark:text-green-400";
    case "warning": return "text-amber-600 dark:text-amber-400";
    case "error": return "text-red-600 dark:text-red-400";
    case "white": return "text-white";
    default: return "text-[var(--text-primary)]";
  }
}

export default Typography;