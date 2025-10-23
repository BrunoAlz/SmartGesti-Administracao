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
}) => {
  const { get, cn, isDark, styles, gradients } = useThemeClasses();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  // Classes base e normalização
  const baseVariant = "shadow-lg";
  const normalizeClasses = (s: string) => s.replace(/\/\d+\b/g, "");

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
    ? cn("bg-blue-600 text-white", baseVariant, "shadow-sm border-0")
    : cn("bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white", baseVariant, "shadow-sm border-0");

  // Classes de posição
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  // Handlers para hover/focus
  const showTooltip = () => {
    if (disabled) return;
    if (trigger === "hover") {
      timeoutRef.current = setTimeout(() => setVisible(true), delay);
    }
  };
  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
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

  return (
    <span
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onClick={handleToggleClick}
    >
      {children}
      {visible && (
        <span
          className={cn(
            "absolute z-50 px-3 py-2 rounded text-xs font-medium transition-opacity duration-200",
            variantClasses[variant],
            positionClasses[position],
            tooltipPointer,
            className
          )}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
