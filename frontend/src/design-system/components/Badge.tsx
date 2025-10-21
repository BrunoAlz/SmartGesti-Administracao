import React from "react";
import { X } from "lucide-react";
import { useBadgeClasses } from "../hooks";
import { cn } from "../index";

// ================================
// COMPONENTE BADGE 
// ================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 
    | "success" | "warning" | "error" | "info" | "purple" | "neutral"
    | "blue" | "green" | "yellow" | "red" | "pink" | "indigo" | "teal" | "orange" 
    | "blue-gradient" | "green-gradient" | "purple-gradient" | "pink-gradient" | "orange-gradient" | "teal-gradient";
  size?: "sm" | "md" | "lg";
  outlined?: boolean;
  rounded?: "md" | "lg" | "full";
  dot?: boolean;
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  removable?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
  onRemove?: () => void;
}

const Badge: React.FC<BadgeProps & React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
  variant = "neutral",
  size = "md",
  outlined = false,
  rounded = "lg",
  dot = false,
  icon,
  iconLeft,
  iconRight,
  removable = false,
  interactive = false,
  className,
  onClick,
  onRemove,
  ...rest
}) => {
  // Mapeamento de variants legados para o hook
  const getHookVariant = (variant: string): "success" | "warning" | "error" | "info" | "purple" | null => {
    const mapping: Record<string, "success" | "warning" | "error" | "info" | "purple"> = {
      success: "success",
      warning: "warning", 
      error: "error",
      info: "info",
      purple: "purple"
    };
    return mapping[variant] || null;
  };

  // SEMPRE chamar o hook primeiro (regra dos hooks)
  const hookVariant = getHookVariant(variant);
  const badgeSize = size === "lg" ? "md" : size; // Fallback para lg -> md pois useBadgeClasses só suporta sm|md
  const allHookClasses = useBadgeClasses(hookVariant || "info", badgeSize);

  // Classes de cores customizadas para as novas variantes
  const getCustomColorClasses = (variant: string, outlined: boolean) => {
    if (outlined) {
      const outlinedClasses: Record<string, string> = {
        blue: "bg-transparent border-blue-500 text-blue-600 dark:text-blue-400",
        green: "bg-transparent border-green-500 text-green-600 dark:text-green-400", 
        yellow: "bg-transparent border-yellow-500 text-yellow-600 dark:text-yellow-400",
        red: "bg-transparent border-red-500 text-red-600 dark:text-red-400",
        pink: "bg-transparent border-pink-500 text-pink-600 dark:text-pink-400",
        indigo: "bg-transparent border-indigo-500 text-indigo-600 dark:text-indigo-400",
        teal: "bg-transparent border-teal-500 text-teal-600 dark:text-teal-400",
        orange: "bg-transparent border-orange-500 text-orange-600 dark:text-orange-400",
      };
      return outlinedClasses[variant] || "";
    }

    const colorClasses: Record<string, string> = {
      blue: "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300",
      green: "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300",
      yellow: "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300", 
      red: "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300",
      pink: "bg-pink-100 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700 text-pink-700 dark:text-pink-300",
      indigo: "bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300",
      teal: "bg-teal-100 dark:bg-teal-900/30 border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300",
      orange: "bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-300",
      // Gradientes
      "blue-gradient": "bg-gradient-to-r from-blue-500 to-cyan-500 border-0 text-white",
      "green-gradient": "bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white",
      "purple-gradient": "bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white",
      "pink-gradient": "bg-gradient-to-r from-pink-500 to-rose-500 border-0 text-white",
      "orange-gradient": "bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white",
      "teal-gradient": "bg-gradient-to-r from-teal-500 to-cyan-500 border-0 text-white",
    };

    return colorClasses[variant] || "";
  };

  // Classes base apenas estruturais (sem cores)
  const baseClasses = cn(
    "inline-flex items-center font-medium transition-colors border",
    // Tamanho
    size === "sm" && "px-2 py-0.5 text-xs gap-1",
    size === "md" && "px-2.5 py-1 text-sm gap-1.5", 
    size === "lg" && "px-3 py-1.5 text-base gap-2",
    // Rounded
    rounded === "md" && "rounded-md",
    rounded === "lg" && "rounded-lg", 
    rounded === "full" && "rounded-full",
    // Interactive
    (onClick || interactive) && "cursor-pointer hover:opacity-80 transition-opacity",
    // Removable
    removable && "pr-1",
    className
  );

  // Classes de tamanho para ícones (container) e dot
  // o container do ícone é um inline-flex que centraliza o SVG
  const sizeConfig = {
    sm: { icon: "w-2.5 h-2.5 inline-flex items-center justify-center flex-shrink-0", dot: "w-1.5 h-1.5" },
    md: { icon: "w-3 h-3 inline-flex items-center justify-center flex-shrink-0", dot: "w-2 h-2" }, 
    lg: { icon: "w-3.5 h-3.5 inline-flex items-center justify-center flex-shrink-0", dot: "w-2.5 h-2.5" }
  };

  const config = sizeConfig[size];

  // Cores para variant neutral
  const neutralClasses = variant === "neutral" 
    ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
    : "";

  // Cores para dots baseadas na variante
  const getDotColor = (variant: string) => {
    const dotColors: Record<string, string> = {
      success: "bg-green-400",
      warning: "bg-yellow-400",
      error: "bg-red-400", 
      info: "bg-blue-400",
      purple: "bg-purple-400",
      neutral: "bg-slate-400",
      blue: "bg-blue-400",
      green: "bg-green-400",
      yellow: "bg-yellow-400",
      red: "bg-red-400",
      pink: "bg-pink-400", 
      indigo: "bg-indigo-400",
      teal: "bg-teal-400",
      orange: "bg-orange-400",
      // Gradientes usam branco
      "blue-gradient": "bg-white",
      "green-gradient": "bg-white", 
      "purple-gradient": "bg-white",
      "pink-gradient": "bg-white",
      "orange-gradient": "bg-white",
      "teal-gradient": "bg-white"
    };
    return dotColors[variant] || "bg-slate-400";
  };

  // Determinar quais classes usar baseado no variant
  const useHookClasses = hookVariant !== null;
  const hookVariantClasses = useHookClasses ? allHookClasses : "";
  const customColorClasses = !useHookClasses && variant !== "neutral"
    ? getCustomColorClasses(variant, outlined)
    : "";

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <span 
      className={cn(
        baseClasses,
        hookVariantClasses || customColorClasses || neutralClasses
      )}
      onClick={handleClick}
      {...rest}
    >
      {/* Dot indicator */}
      {dot && (
        <div className={cn(
          "rounded-full",
          config.dot,
          getDotColor(variant)
        )} />
      )}

      {/* Icon Left */}
      {(icon || iconLeft) && (
        <span className={config.icon}>
          {(() => {
            const el = (icon || iconLeft) as React.ReactNode;
            if (React.isValidElement(el)) {
              return React.cloneElement(el as React.ReactElement, {
                className: cn((el as any).props?.className, "w-full h-full text-current")
              });
            }
            return el;
          })()}
        </span>
      )}

      {/* Content */}
      <span className="truncate">
        {children}
      </span>

      {/* Icon Right */}
      {iconRight && (
        <span className={config.icon}>
          {(() => {
            const el = iconRight as React.ReactNode;
            if (React.isValidElement(el)) {
              return React.cloneElement(el as React.ReactElement, {
                className: cn((el as any).props?.className, "w-full h-full text-current")
              });
            }
            return el;
          })()}
        </span>
      )}

      {/* Remove button */}
      {removable && (
        <button
          onClick={handleRemove}
          className={cn(
            "ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors",
            config.icon
          )}
          aria-label="Remove badge"
        >
          {/* usar X com tamanho full para herdar do container */}
          <X className="w-full h-full text-current" />
        </button>
      )}
    </span>
  );
};

// ================================
// COMPONENTE BADGE GROUP
// ================================

interface BadgeGroupProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "tight" | "normal" | "loose";
}

const BadgeGroup: React.FC<BadgeGroupProps> = ({
  children,
  className,
  spacing = "normal"
}) => {
  const spacingClasses = {
    tight: "gap-1",
    normal: "gap-2", 
    loose: "gap-3"
  };

  return (
    <div className={cn("flex flex-wrap", spacingClasses[spacing], className)}>
      {children}
    </div>
  );
};

// ================================
// EXPORTS
// ================================

export { Badge, BadgeGroup };
export type { BadgeProps, BadgeGroupProps };