import React from "react";
import { useButtonClasses, useIconClasses } from "../hooks";
import { cn } from "../theme-classes";

// ================================
// TIPOS
// ================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

interface IconButtonProps extends Omit<ButtonProps, "children" | "iconPosition"> {
  icon: React.ReactNode;
  "aria-label": string;
}

interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

// ================================
// COMPONENTE BUTTON PRINCIPAL
// ================================

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "sm",
  icon,
  iconPosition = "left",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const buttonClasses = useButtonClasses(variant, size);
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };
  
  const iconSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "md";
  const defaultIconClasses = useIconClasses("primary", iconSize);
  // Para botões primários, usar ícones brancos no modo claro
  const iconClasses = variant === "primary" 
    ? cn("text-white", size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5")
    : defaultIconClasses;
  
  const isDisabled = disabled || loading;
  
  return (
    <button
      className={cn(
        buttonClasses,
        sizeClasses[size],
        fullWidth && "w-full",
        isDisabled && "opacity-50 cursor-not-allowed",
        loading && "cursor-wait",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!loading && icon && iconPosition === "left" && (
          <span className={iconClasses}>{icon}</span>
        )}
        
        {children}
        
        {!loading && icon && iconPosition === "right" && (
          <span className={iconClasses}>{icon}</span>
        )}
      </span>
    </button>
  );
};

// ================================
// COMPONENTE ICON BUTTON
// ================================

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = "sm",
  variant = "ghost",
  className,
  ...props
}) => {
  const buttonClasses = useButtonClasses(variant, size);
  
  const sizeClasses = {
    sm: "p-1",
    md: "p-1.5",
    lg: "p-2",
  };
  
  const iconSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "md";
  const defaultIconClasses = useIconClasses("primary", iconSize);
  // Para botões primários, usar ícones brancos no modo claro
  const iconClasses = variant === "primary" 
    ? cn("text-white", size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5")
    : defaultIconClasses;
  
  return (
    <button
      className={cn(
        buttonClasses,
        sizeClasses[size],
        "rounded-full",
        className
      )}
      {...props}
    >
      <span className={iconClasses}>{icon}</span>
    </button>
  );
};

// ================================
// COMPONENTE BUTTON GROUP
// ================================

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = "horizontal",
  className,
}) => {
  const orientationClasses = {
    horizontal: "flex-row",
    vertical: "flex-col",
  };
  
  return (
    <div
      className={cn(
        "flex",
        orientationClasses[orientation],
        orientation === "horizontal" ? "space-x-2" : "space-y-2",
        className
      )}
    >
      {children}
    </div>
  );
};

// ================================
// COMPONENTES ESPECÍFICOS
// ================================

interface ActionButtonProps extends Omit<ButtonProps, "variant"> {
  action: "save" | "cancel" | "delete" | "edit" | "add" | "close";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  children,
  ...props
}) => {
  const actionVariants = {
    save: "primary",
    cancel: "secondary",
    delete: "danger",
    edit: "secondary",
    add: "primary",
    close: "ghost",
  } as const;
  
  const actionIcons = {
    save: "💾",
    cancel: "❌",
    delete: "🗑️",
    edit: "✏️",
    add: "➕",
    close: "✕",
  };
  
  return (
    <Button
      variant={actionVariants[action]}
      icon={actionIcons[action]}
      {...props}
    >
      {children}
    </Button>
  );
};

interface ToggleButtonProps extends Omit<ButtonProps, "variant"> {
  isActive: boolean;
  activeVariant?: ButtonProps["variant"];
  inactiveVariant?: ButtonProps["variant"];
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isActive,
  activeVariant = "primary",
  inactiveVariant = "secondary",
  ...props
}) => {
  return (
    <Button
      variant={isActive ? activeVariant : inactiveVariant}
      {...props}
    />
  );
};

// ================================
// COMPONENTE FLOATING ACTION BUTTON
// ================================

interface FloatingActionButtonProps extends Omit<IconButtonProps, "size"> {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  position = "bottom-right",
  className,
  ...props
}) => {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };
  
  return (
    <IconButton
      size="lg"
      variant="primary"
      className={cn(
        "fixed z-50 shadow-lg hover:shadow-xl",
        positionClasses[position],
        className
      )}
      {...props}
    />
  );
};

// ================================
// EXPORTS
// ================================

export default Button;
export { 
  IconButton, 
  ButtonGroup, 
  ActionButton, 
  ToggleButton, 
  FloatingActionButton 
};
