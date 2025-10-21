// ================================
// SISTEMA DE BOTÕES - SmartGesTI
// ================================

import React from 'react';
import { AriaAttributes } from 'react';
import { useThemeClasses, cn } from '..';
import { useButtonClasses } from '../hooks';
import { ButtonVariant } from './types';

export type ButtonSize = "sm" | "md" | "lg";
export type IconPosition = "left" | "right";

// ================================
// TIPOS DE BOTÕES
// ================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, AriaAttributes {
  /**
   * A variante visual do botão
   */
  variant?: ButtonVariant;
  
  /**
   * O tamanho do botão
   */
  size?: ButtonSize;
  
  /**
   * Ícone opcional para o botão
   */
  icon?: React.ReactNode;
  
  /**
   * Posição do ícone (esquerda ou direita)
   */
  iconPosition?: IconPosition;
  
  /**
   * Estado de carregamento
   */
  loading?: boolean;
  
  /**
   * Define se o botão ocupa a largura total do container
   */
  fullWidth?: boolean;
  
  /**
   * Conteúdo do botão (texto ou elementos)
   */
  children: React.ReactNode;
  
  /**
   * Classes CSS adicionais
   */
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
  const { get } = useThemeClasses();
  const buttonClasses = useButtonClasses(variant, size);
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };
  
  // Função para determinar a cor do ícone baseada no variant
  const getIconClasses = (variant: string, size: string) => {
    const sizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";
    
    // Para botões com estilo ghost use a cor do texto secundário, demais botões sempre com texto branco
    if (variant === "ghost") {
      return cn(sizeClass, get("text.secondary"));
    } else {
      // Todos os outros botões (incluindo secondary) têm texto branco
      return cn(sizeClass, "text-white");
    }
  };
  
  const iconClasses = getIconClasses(variant, size);
  
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
// COMPONENTE BUTTON ICON
// ================================

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon' | 'iconPosition'> {
  icon: React.ReactNode;
  tooltip?: string;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = "primary",
  size = "sm",
  loading = false,
  className,
  tooltip,
  tooltipPosition = "top",
  ...props
}) => {
  const { get } = useThemeClasses();
  const buttonClasses = useButtonClasses(variant, size);
  
  const sizeClasses = {
    sm: "p-1",
    md: "p-1.5",
    lg: "p-2",
  };
  
  // Função para determinar a cor do ícone baseada no variant
  const getIconClasses = (variant: string, size: string) => {
    const sizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";
    
    // Para botões com estilo ghost use a cor do texto secundário, demais botões sempre com texto branco
    if (variant === "ghost") {
      return cn(sizeClass, get("text.secondary"));
    } else {
      // Todos os outros botões (incluindo secondary) têm texto branco
      return cn(sizeClass, "text-white");
    }
  };
  
  const iconClasses = getIconClasses(variant, size);
  
  const tooltipClasses = {
    base: "absolute bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };
  
  return (
    <div className="relative inline-flex group">
      <button
        className={cn(
          buttonClasses,
          sizeClasses[size],
          "rounded-full",
          className
        )}
        {...props}
      >
        {loading ? (
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
        ) : (
          <span className={iconClasses}>{icon}</span>
        )}
      </button>
      {tooltip && (
        <div className={cn(tooltipClasses.base, tooltipClasses[tooltipPosition])}>
          {tooltip}
        </div>
      )}
    </div>
  );
};

// ================================
// COMPONENTE BUTTON GROUP
// ================================

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = "horizontal",
  className,
}) => {
  // Classes base para os grupos de botões
  const baseClasses = "flex overflow-hidden";
  
  // Classes específicas para orientação
  const orientationClasses = {
    horizontal: "flex-row",
    vertical: "flex-col",
  };
  
  // Classes para estilizar botões dentro do grupo
  const childClasses = {
    horizontal: "first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none first:border-r-0 last:border-l-0",
    vertical: "first:rounded-b-none last:rounded-t-none [&:not(:first-child):not(:last-child)]:rounded-none first:border-b-0 last:border-t-0",
  };
  
  // Processar os filhos para adicionar classes necessárias
  const processedChildren = React.Children.map(children, child => {
    // Verificar se o filho é um elemento válido do React (botão)
    if (React.isValidElement(child)) {
      // Tipagem corrigida para o cloneElement
      return React.cloneElement(child, {
        className: cn(
          child.props.className || '',
          childClasses[orientation],
        )
      } as React.HTMLAttributes<HTMLElement>);
    }
    return child;
  });
  
  return (
    <div className={cn(baseClasses, orientationClasses[orientation], className)}>
      {processedChildren}
    </div>
  );
};

// ================================
// COMPONENTE ACTION BUTTON
// ================================

export interface ActionButtonProps extends Omit<ButtonProps, 'variant'> {
  action: 'save' | 'delete' | 'cancel' | 'edit';
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  action, 
  children, 
  ...props 
}) => {
  const variantMap: Record<string, ButtonVariant> = {
    save: 'success',
    delete: 'danger',
    cancel: 'ghost',
    edit: 'primary',
  };
  
  const iconMap: Record<string, React.ReactNode> = {
    save: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    delete: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    cancel: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    edit: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  };
  
  return (
    <Button
      variant={variantMap[action]}
      icon={iconMap[action]}
      {...props}
    >
      {children}
    </Button>
  );
};

// ================================
// COMPONENTE TOGGLE BUTTON
// ================================

export interface ToggleButtonProps extends Omit<ButtonProps, 'variant'> {
  isActive: boolean;
  activeVariant?: ButtonVariant;
  inactiveVariant?: ButtonVariant;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isActive,
  activeVariant = 'primary',
  inactiveVariant = 'ghost',
  children,
  ...props
}) => {
  return (
    <Button
      variant={isActive ? activeVariant : inactiveVariant}
      {...props}
    >
      {children}
    </Button>
  );
};

// ================================
// COMPONENTE FLOATING ACTION BUTTON
// ================================

export interface FloatingActionButtonProps extends Omit<IconButtonProps, 'tooltip'> {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  position = 'bottom-right',
  variant = 'primary',
  size = 'lg',
  ...props
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <IconButton
      className={`fixed shadow-xl ${positionClasses[position]} z-50`}
      variant={variant}
      size={size}
      {...props}
    />
  );
};

// ================================
// Exportar todos os componentes
// ================================

export default Button;
