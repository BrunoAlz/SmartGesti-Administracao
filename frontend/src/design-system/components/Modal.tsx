import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { X } from "lucide-react";
import { useThemeClasses } from "../hooks";
import { cn } from "../theme-classes";

export type ModalVariant = "success" | "error" | "warning" | "info" | "question";

interface BaseModalOptions {
  title?: string;
  text?: string;
  variant?: ModalVariant;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export interface ConfirmModalOptions extends BaseModalOptions {
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  dangerMode?: boolean;
}

export interface AlertModalOptions extends BaseModalOptions {
  onClose?: () => void;
}

const getThemeConfig = (isDark: boolean) => {
  return {
    background: isDark ? '#1f2937' : '#ffffff',
    color: isDark ? '#f9fafb' : '#111827',
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280',
    customClass: {
      popup: isDark ? 'dark-popup' : '',
      confirmButton: 'swal2-confirm',
      cancelButton: 'swal2-cancel'
    },
    buttonsStyling: true,
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    }
  };
};

const variantConfig = {
  success: { icon: 'success' as const, confirmButtonColor: '#10b981' },
  error: { icon: 'error' as const, confirmButtonColor: '#ef4444' },
  warning: { icon: 'warning' as const, confirmButtonColor: '#f59e0b' },
  info: { icon: 'info' as const, confirmButtonColor: '#3b82f6' },
  question: { icon: 'question' as const, confirmButtonColor: '#8b5cf6' }
};

export const useModal = () => {
  const { isDark } = useThemeClasses();
  
  const getBaseConfig = (options: BaseModalOptions) => {
    const themeConfig = getThemeConfig(isDark);
    const variant = options.variant || 'info';
    const variantStyle = variantConfig[variant];
    
    return {
      ...themeConfig,
      ...variantStyle,
      title: options.title,
      text: options.text,
      showCancelButton: options.showCancelButton || false,
      confirmButtonText: options.confirmButtonText || 'OK',
      cancelButtonText: options.cancelButtonText || 'Cancelar'
    };
  };

  const alert = async (options: AlertModalOptions) => {
    const config = getBaseConfig(options);
    const result = await Swal.fire(config);
    
    if (result.isConfirmed && options.onClose) {
      options.onClose();
    }
    
    return result;
  };

  const confirm = async (options: ConfirmModalOptions) => {
    const config = getBaseConfig({
      ...options,
      showCancelButton: true,
      variant: options.dangerMode ? 'warning' : options.variant
    });
    
    if (options.dangerMode) {
      config.confirmButtonColor = '#ef4444';
      config.confirmButtonText = options.confirmButtonText || 'Sim, deletar';
    }
    
    const result = await Swal.fire(config);
    
    if (result.isConfirmed && options.onConfirm) {
      await options.onConfirm();
    } else if (result.isDismissed && options.onCancel) {
      options.onCancel();
    }
    
    return result;
  };

  const confirmDelete = async (
    title: string = "Confirmar exclusão",
    text: string = "Esta ação não pode ser desfeita!"
  ) => {
    return confirm({
      title,
      text,
      variant: "warning",
      dangerMode: true,
      confirmButtonText: "Sim, deletar",
      cancelButtonText: "Cancelar"
    });
  };

  const success = (title: string, text?: string) => {
    return alert({
      title,
      text,
      variant: "success"
    });
  };

  const error = (title: string, text?: string) => {
    return alert({
      title,
      text,
      variant: "error"
    });
  };

  return {
    alert,
    confirm,
    confirmDelete,
    success,
    error
  };
};

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const modalWidths = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg", 
  xl: "max-w-xl"
};

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  width = "md",
  className
}) => {
  const { get } = useThemeClasses();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      
      <div className="flex items-center justify-center min-h-full p-4">
        <div className={cn(
          "relative w-full rounded-lg shadow-xl",
          modalWidths[width],
          get("card"),
          className
        )}>
          {title && (
            <div className="flex items-center justify-between p-6 pb-4">
              <h3 className={cn("text-lg font-semibold", get("text.primary"))}>
                {title}
              </h3>
              <button
                onClick={onClose}
                className={cn("p-1 rounded-md", get("text.secondary"))}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <div className="px-6 pb-4">
            {children}
          </div>
          
          {actions && (
            <div className={cn("px-6 py-4 border-t", get("border"))}>
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
