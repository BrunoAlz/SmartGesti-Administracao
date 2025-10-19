import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useCardClasses, useTextClasses, useIconClasses } from "../hooks";
import { cn } from "../theme-classes";
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";

// ================================
// TIPOS
// ================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "default" | "centered" | "sidebar";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "warning" | "success";
  loading?: boolean;
}

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  confirmText?: string;
}

// ================================
// HOOK PARA GERENCIAR MODAL
// ================================

const useModal = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

// ================================
// COMPONENTE MODAL PRINCIPAL
// ================================

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = "md",
  variant = "default",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Classes de tamanho
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4",
  };

  // Classes de variante
  const variantClasses = {
    default: "mx-auto my-8",
    centered: "mx-auto my-auto",
    sidebar: "ml-auto my-0 h-full",
  };

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={cn(
          "relative w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

// ================================
// COMPONENTE MODAL HEADER
// ================================

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className,
  showCloseButton = true,
  onClose,
}) => {
  const titleClasses = useTextClasses("primary", "text-lg font-semibold");
  const iconClasses = useIconClasses("primary", "md");

  return (
    <div className={cn("flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10", className)}>
      <div className={titleClasses}>
        {children}
      </div>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className={cn(
            iconClasses,
            "p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          )}
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

// ================================
// COMPONENTE MODAL CONTENT
// ================================

const ModalContent: React.FC<ModalContentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
};

// ================================
// COMPONENTE MODAL FOOTER
// ================================

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-white/10", className)}>
      {children}
    </div>
  );
};

// ================================
// COMPONENTE MODAL DE CONFIRMAÇÃO
// ================================

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  loading = false,
}) => {
  const iconClasses = useIconClasses("primary", "lg");
  
  const variantConfig = {
    default: {
      icon: <Info className="w-6 h-6 text-blue-500" />,
      confirmVariant: "primary" as const,
    },
    danger: {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      confirmVariant: "danger" as const,
    },
    warning: {
      icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
      confirmVariant: "secondary" as const,
    },
    success: {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      confirmVariant: "primary" as const,
    },
  };

  const config = variantConfig[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalContent>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {config.icon}
          </div>
          <h3 className={cn("text-lg font-semibold mb-2", useTextClasses("primary"))}>
            {title}
          </h3>
          <p className={cn("text-sm mb-6", useTextClasses("secondary"))}>
            {message}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-md transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={cn(
                "px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50",
                variant === "danger" 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              {loading ? "Carregando..." : confirmText}
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

// ================================
// COMPONENTE MODAL DE ALERTA
// ================================

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  confirmText = "OK",
}) => {
  const typeConfig = {
    info: {
      icon: <Info className="w-6 h-6 text-blue-500" />,
      bgColor: "bg-blue-50 dark:bg-blue-500/20",
      borderColor: "border-blue-200 dark:border-blue-400/30",
    },
    success: {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      bgColor: "bg-green-50 dark:bg-green-500/20",
      borderColor: "border-green-200 dark:border-green-400/30",
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      bgColor: "bg-yellow-50 dark:bg-yellow-500/20",
      borderColor: "border-yellow-200 dark:border-yellow-400/30",
    },
    error: {
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      bgColor: "bg-red-50 dark:bg-red-500/20",
      borderColor: "border-red-200 dark:border-red-400/30",
    },
  };

  const config = typeConfig[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalContent>
        <div className="text-center">
          <div className={cn("flex justify-center mb-4 p-3 rounded-full", config.bgColor)}>
            {config.icon}
          </div>
          <h3 className={cn("text-lg font-semibold mb-2", useTextClasses("primary"))}>
            {title}
          </h3>
          <p className={cn("text-sm mb-6", useTextClasses("secondary"))}>
            {message}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
};

// ================================
// COMPONENTE MODAL SIDEBAR
// ================================

interface SidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SidebarModal: React.FC<SidebarModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "w-80",
    md: "w-96",
    lg: "w-[28rem]",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="sidebar"
      size="full"
      className={cn(sizeClasses[size], className)}
    >
      {title && (
        <ModalHeader onClose={onClose}>
          {title}
        </ModalHeader>
      )}
      {children}
    </Modal>
  );
};

// ================================
// COMPONENTE MODAL DRAWER
// ================================

interface DrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  position?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const DrawerModal: React.FC<DrawerModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  position = "right",
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: position === "left" || position === "right" ? "w-80" : "h-80",
    md: position === "left" || position === "right" ? "w-96" : "h-96",
    lg: position === "left" || position === "right" ? "w-[28rem]" : "h-[28rem]",
  };

  const positionClasses = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div
        className={cn(
          "absolute bg-white dark:bg-gray-800 shadow-xl",
          sizeClasses[size],
          positionClasses[position],
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <ModalHeader onClose={onClose}>
            {title}
          </ModalHeader>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

// ================================
// EXPORTS
// ================================

export default Modal;
export {
  ModalHeader,
  ModalContent,
  ModalFooter,
  ConfirmModal,
  AlertModal,
  SidebarModal,
  DrawerModal,
  useModal,
};
