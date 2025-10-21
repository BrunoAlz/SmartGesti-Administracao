import React, { useState } from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X,
  ExternalLink
} from "lucide-react";
import { useThemeClasses, cn } from "../index";

// ================================
// TIPOS
// ================================

type AlertVariant = "success" | "error" | "warning" | "info";
type AlertSize = "sm" | "md" | "lg";

interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

interface AlertModalProps extends Omit<AlertProps, 'dismissible'> {
  isOpen: boolean;
  onClose: () => void;
  width?: "sm" | "md" | "lg" | "xl";
  centered?: boolean;
}

interface AlertBannerProps extends Omit<AlertProps, 'size'> {
  position?: "top" | "bottom";
  fullWidth?: boolean;
  sticky?: boolean;
}

// ================================
// CONFIGURAÇÕES DE ESTILO
// ================================

const alertVariants = {
  success: {
    light: "bg-green-100 border-green-400 text-green-800",
    dark: "bg-green-900/40 border-green-700 text-green-100"
  },
  error: {
    light: "bg-red-100 border-red-400 text-red-800", 
    dark: "bg-red-900/40 border-red-700 text-red-100"
  },
  warning: {
    light: "bg-amber-100 border-amber-400 text-amber-800",
    dark: "bg-amber-900/40 border-amber-700 text-amber-100"
  },
  info: {
    light: "bg-sky-100 border-sky-400 text-sky-800",
    dark: "bg-sky-900/40 border-sky-700 text-sky-100"
  }
};

const alertSizes = {
  sm: "p-3 text-sm",
  md: "p-4 text-base", 
  lg: "p-6 text-lg"
};

const modalWidths = {
  sm: "max-w-sm",
  md: "max-w-md", 
  lg: "max-w-lg",
  xl: "max-w-xl"
};

const defaultIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
};

// ================================
// HOOK PARA CLASSES DE ALERT
// ================================

function useAlertClasses(variant: AlertVariant, size: AlertSize, className?: string) {
  const { get, isDark } = useThemeClasses();
  
  const variantClasses = alertVariants[variant];
  const themeClasses = isDark ? variantClasses.dark : variantClasses.light;
  const sizeClasses = alertSizes[size];
  
  return cn(
    // Base classes
    "border rounded-lg transition-all duration-300 ease-in-out",
    // Tema e variante
    themeClasses,
    // Tamanho
    sizeClasses,
    // Classes customizadas
    className
  );
}

// ================================
// COMPONENTE ALERT BÁSICO
// ================================

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  size = "md",
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  actions,
  className
}) => {
  const { get } = useThemeClasses();
  const [isVisible, setIsVisible] = useState(true);
  
  const alertClasses = useAlertClasses(variant, size, className);
  const IconComponent = icon ? () => <>{icon}</> : defaultIcons[variant];
  
  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(() => onDismiss(), 300); // Aguarda animação
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div className={cn(
      alertClasses,
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    )}>
      <div className="flex items-start space-x-3">
        {/* Ícone */}
        <div className="flex-shrink-0">
          <IconComponent className="w-5 h-5" />
        </div>
        
        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="font-medium mb-1">
              {title}
            </h3>
          )}
          <div className={cn(
            title ? "text-sm" : "",
            get("text.secondary")
          )}>
            {children}
          </div>
          
          {/* Ações */}
          {actions && (
            <div className="mt-3 flex space-x-2">
              {actions}
            </div>
          )}
        </div>
        
        {/* Botão de fechar */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={cn(
              "flex-shrink-0 p-1 rounded-md transition-colors duration-200",
              "hover:bg-black/10 dark:hover:bg-white/10",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
            )}
            aria-label="Fechar alerta"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// ================================
// COMPONENTE ALERT MODAL
// ================================

export const AlertModal: React.FC<AlertModalProps> = ({
  variant = "info",
  size = "md", 
  title,
  children,
  onClose,
  isOpen,
  width = "md",
  centered = true,
  icon,
  actions,
  className
}) => {
  const { get } = useThemeClasses();
  const alertClasses = useAlertClasses(variant, size, className);
  const IconComponent = icon ? () => <>{icon}</> : defaultIcons[variant];
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={cn(
        "relative min-h-full flex items-center justify-center p-4",
        centered ? "items-center" : "items-start pt-16"
      )}>
        <div className={cn(
          "relative w-full rounded-lg shadow-xl transform transition-all duration-300",
          modalWidths[width],
          get("card"),
          "animate-in fade-in zoom-in-95 duration-300"
        )}>
          {/* Header com ícone e título */}
          <div className="flex items-start space-x-3 p-6 pb-4">
            <div className="flex-shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex-1">
              {title && (
                <h3 className={cn("text-lg font-semibold", get("text.primary"))}>
                  {title}
                </h3>
              )}
            </div>
            <button
              onClick={onClose}
              className={cn(
                "flex-shrink-0 p-1 rounded-md transition-colors duration-200",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                get("text.secondary")
              )}
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Conteúdo */}
          <div className="px-6 pb-4">
            <div className={cn("text-sm", get("text.secondary"))}>
              {children}
            </div>
          </div>
          
          {/* Ações */}
          {actions && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-end space-x-3">
                {actions}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ================================
// COMPONENTE ALERT BANNER
// ================================

export const AlertBanner: React.FC<AlertBannerProps> = ({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  position = "top",
  fullWidth = true,
  sticky = false,
  icon,
  actions,
  className
}) => {
  const { isDark } = useThemeClasses();
  const [isVisible, setIsVisible] = useState(true);
  
  const IconComponent = icon ? () => <>{icon}</> : defaultIcons[variant];
  
  // Usar EXATAMENTE as mesmas cores dos alerts normais
  const variantClasses = alertVariants[variant];
  const themeClasses = isDark ? variantClasses.dark : variantClasses.light;
  
  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(() => onDismiss(), 300);
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div className={cn(
      // Posicionamento
      sticky ? "fixed z-40" : "relative",
      position === "top" ? "top-0" : "bottom-0",
      fullWidth ? "left-0 right-0" : "",
      // Estilo base
      "border-l-4 shadow-sm transition-all duration-300",
      // USAR EXATAMENTE AS MESMAS CORES DOS ALERTS NORMAIS
      themeClasses,
      // Padding
      "p-4",
      className,
      // Animação
      isVisible ? "translate-y-0 opacity-100" : 
        position === "top" ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
    )}>
      <div className="flex items-start space-x-3">
        {/* Ícone */}
        <div className="flex-shrink-0">
          <IconComponent className="w-5 h-5" />
        </div>
        
        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="font-medium text-sm mb-1">
              {title}
            </h3>
          )}
          <div className="text-sm">
            {children}
          </div>
          
          {/* Ações inline para banner */}
          {actions && (
            <div className="mt-2 flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
        
        {/* Botão de fechar */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded-md transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="Fechar banner"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// ================================
// EXPORTAÇÕES
// ================================

export type { AlertProps, AlertModalProps, AlertBannerProps, AlertVariant, AlertSize };