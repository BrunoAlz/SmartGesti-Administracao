import React, { useState, useRef } from "react";
import { useThemeClasses } from "../hooks";

export type TooltipVariant =
  | "default"
  // Botões sólidos (mesmo que button.solid.*)
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
  // Gradientes (mesmo que button gradients)
  | "primary-gradient"
  | "success-gradient" 
  | "warning-gradient"
  | "danger-gradient"
  | "info-gradient"
  | "purple-gradient"
  | "pink-gradient"
  | "indigo-gradient"
  | "orange-gradient" 
  | "teal-gradient";
export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  variant?: TooltipVariant;
  position?: TooltipPosition;
  className?: string;
  delay?: number;
  disabled?: boolean;
  trigger?: "hover" | "click";
  showArrow?: boolean;
  fixed?: boolean;
  glass?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  variant = "default",
  position = "top",
  className = "",
  delay = 250,
  disabled = false,
  trigger = "hover",
  showArrow = true,
  fixed = false,
  glass = false,
  size = 'md',
}) => {
  const { cn, isDark } = useThemeClasses();
  const [visible, setVisible] = useState(fixed);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  // Manter tooltip visível se for fixo
  React.useEffect(() => {
    if (fixed) {
      setVisible(true);
    }
  }, [fixed]);

  // Classes base e tamanhos
  const baseVariant = "shadow-lg backdrop-blur-sm";
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base'
  };

  // Construir mapa de variantes inicialmente vazio
  const variantClasses: Record<TooltipVariant, string> = {} as Record<TooltipVariant, string>;

  // Mapear cores sólidas diretamente das classes dos botões
  const solidVariants: Record<TooltipVariant, string> = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-800 dark:bg-white/90 dark:text-gray-900",
    ghost: "bg-gray-100 text-gray-700 dark:bg-white/90 dark:text-gray-900",
    danger: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
    purple: "bg-purple-600 text-white",
    pink: "bg-pink-500 text-white",
    indigo: "bg-indigo-600 text-white",
    orange: "bg-orange-500 text-white",
    teal: "bg-teal-500 text-white",
  } as Record<TooltipVariant, string>;

  // Mapear gradientes diretamente dos tokens
  const gradientVariants: Record<TooltipVariant, string> = {
    "primary-gradient": "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white",
    "success-gradient": "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white",
    "warning-gradient": "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white",
    "danger-gradient": "bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 text-white",
    "info-gradient": "bg-gradient-to-r from-blue-400 via-sky-500 to-cyan-600 text-white",
    "purple-gradient": "bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-700 text-white",
    "pink-gradient": "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white",
    "indigo-gradient": "bg-gradient-to-r from-indigo-500 via-blue-600 to-violet-700 text-white",
    "orange-gradient": "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white",
    "teal-gradient": "bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 text-white",
  } as Record<TooltipVariant, string>;

  // Adicionar variantes sólidas com opacidade fixa
  Object.entries(solidVariants).forEach(([key, value]) => {
    (variantClasses as any)[key] = cn(
      value,
      baseVariant,
      "shadow-sm border-0"
    );
  });

  // Adicionar gradientes sem modificar
  Object.entries(gradientVariants).forEach(([key, value]) => {
    if (value && key.endsWith("-gradient")) {
      (variantClasses as any)[key] = cn(
        value,
        baseVariant,
        "shadow-sm border-0"
      );
    }
  });

  // Default: usar cor do button.primary para tema escuro
  (variantClasses as any).default = isDark
    ? cn("bg-blue-600/95 text-white", baseVariant, "shadow-sm border-0")
    : cn("bg-gray-100/95 text-gray-800 dark:bg-gray-800/95 dark:text-white", baseVariant, "shadow-sm border-0");

  // Classes de posição e setas
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  const arrowClasses = {
    top: "after:absolute after:left-1/2 after:-bottom-1.5 after:w-3 after:h-3 after:-translate-x-1/2 after:rotate-45 after:border-8 after:border-transparent after:transition-colors",
    bottom: "after:absolute after:left-1/2 after:-top-1.5 after:w-3 after:h-3 after:-translate-x-1/2 after:rotate-45 after:border-8 after:border-transparent after:transition-colors",
    left: "after:absolute after:top-1/2 after:-right-1.5 after:w-3 after:h-3 after:-translate-y-1/2 after:rotate-45 after:border-8 after:border-transparent after:transition-colors",
    right: "after:absolute after:top-1/2 after:-left-1.5 after:w-3 after:h-3 after:-translate-y-1/2 after:rotate-45 after:border-8 after:border-transparent after:transition-colors"
  };

  // Handlers para hover/focus/click
  const showTooltip = () => {
    if (disabled) return;
    if (trigger === "hover" && !fixed) {
      timeoutRef.current = setTimeout(() => setVisible(true), delay);
    }
  };
  
  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!fixed) setVisible(false);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    
    // Se for fixo, permitir ações dentro do tooltip
    if (fixed) {
      e.stopPropagation();
      return;
    }
    
    // Para tooltips normais com trigger click
    if (trigger === "click") {
      setVisible((v) => !v);
    }
  };

  // Close on outside click when trigger is 'click'
  React.useEffect(() => {
    if (trigger !== "click") return;

    const onDocClick = (ev: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(ev.target as Node)) return;
      setVisible(false);
    };

    if (visible) {
      document.addEventListener("click", onDocClick);
    }

    return () => document.removeEventListener("click", onDocClick);
  }, [visible, trigger]);

  const tooltipPointer = trigger === "click" ? "pointer-events-auto" : "pointer-events-none";

  // Gerar classes da seta baseado na variante
  const getArrowColor = () => {
    if (variant.endsWith('-gradient')) {
      // Para gradientes, usar a cor do 'from-' do gradiente
      const baseColor = variantClasses[variant].match(/from-([\w-]+)-\d+/)?.[1] || 'gray';
      return `after:bg-${baseColor}-500/95`;
    }
    // Para cores sólidas, usar a mesma cor do fundo
    const baseClass = variantClasses[variant];
    const bgColor = baseClass.match(/bg-([\w-]+)-\d+/)?.[1] || 'gray';
    return `after:bg-${bgColor}-${variant === 'default' ? (isDark ? '600' : '100') : '500'}/95`;
  };

  return (
    <span
      ref={wrapperRef}
      className={cn(
        "relative inline-block",
        fixed && "pointer-events-none"
      )}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onClick={handleToggleClick}
    >
      {children}
      <span
        className={cn(
          "absolute z-50 rounded font-medium transition-all duration-200 transform",
          "opacity-0 scale-95 pointer-events-none",
          visible && "opacity-100 scale-100",
          trigger === "click" && !fixed && "pointer-events-auto",
          sizeClasses[size],
          variantClasses[variant],
          positionClasses[position],
          showArrow && arrowClasses[position],
          showArrow && getArrowColor(),
          glass && variant.endsWith('-gradient') && "bg-opacity-90 backdrop-blur-sm",
          className
        )}
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
};

export default Tooltip;
