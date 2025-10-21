import React from 'react';
import { toast, ToastOptions, TypeOptions } from 'react-toastify';
import { useThemeClasses } from '../index';

// ================================
// TIPOS PARA TOAST
// ================================

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface CustomToastOptions extends Partial<ToastOptions> {
  variant?: ToastVariant;
  title?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ================================
// CONFIGURAÇÕES DO TOAST
// ================================

const getToastConfig = (isDark: boolean): ToastOptions => ({
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: isDark ? "dark" : "light",
  style: {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    color: isDark ? '#f9fafb' : '#111827',
    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
    borderRadius: '8px',
    boxShadow: isDark 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)'
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  }
});

// ================================
// COMPONENTE TOAST CUSTOMIZADO
// ================================

interface ToastContentProps {
  title?: string;
  message: string;
  variant: ToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const ToastContent: React.FC<ToastContentProps> = ({ 
  title, 
  message, 
  variant, 
  action 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'text-green-600 dark:text-green-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="flex-1">
      {title && (
        <div className="font-semibold text-sm mb-1">
          {title}
        </div>
      )}
      <div className="text-sm opacity-90">
        {message}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className={`mt-2 text-xs font-medium underline hover:no-underline ${getVariantClasses()}`}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

// ================================
// HOOK PERSONALIZADO PARA TOAST
// ================================

export const useToast = () => {
  const { isDark } = useThemeClasses();
  
  const showToast = (
    message: string, 
    options: CustomToastOptions = {}
  ) => {
    const { variant = 'info', title, action, ...toastOptions } = options;
    
    const config = {
      ...getToastConfig(isDark),
      ...toastOptions
    };

    const content = (
      <ToastContent
        title={title}
        message={message}
        variant={variant}
        action={action}
      />
    );

    switch (variant) {
      case 'success':
        return toast.success(content, config);
      case 'error':
        return toast.error(content, config);
      case 'warning':
        return toast.warning(content, config);
      case 'info':
        return toast.info(content, config);
      default:
        return toast(content, config);
    }
  };

  const success = (message: string, options?: Omit<CustomToastOptions, 'variant'>) =>
    showToast(message, { ...options, variant: 'success' });

  const error = (message: string, options?: Omit<CustomToastOptions, 'variant'>) =>
    showToast(message, { ...options, variant: 'error' });

  const warning = (message: string, options?: Omit<CustomToastOptions, 'variant'>) =>
    showToast(message, { ...options, variant: 'warning' });

  const info = (message: string, options?: Omit<CustomToastOptions, 'variant'>) =>
    showToast(message, { ...options, variant: 'info' });

  const dismiss = (toastId?: string | number) => toast.dismiss(toastId);
  const dismissAll = () => toast.dismiss();

  return {
    toast: showToast,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll
  };
};

// ================================
// CONFIGURAÇÃO GLOBAL DO TOAST
// ================================

export const getGlobalToastConfig = (isDark: boolean) => ({
  position: "top-right" as const,
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: isDark ? "dark" as const : "light" as const,
  toastStyle: {
    backgroundColor: isDark ? '#1f2937' : '#ffffff',
    color: isDark ? '#f9fafb' : '#111827',
    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
    borderRadius: '8px',
  }
});

// ================================
// EXPORTAÇÕES
// ================================

export type { ToastVariant, CustomToastOptions, ToastContentProps };