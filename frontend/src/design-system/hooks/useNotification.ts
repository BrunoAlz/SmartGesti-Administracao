import React, { useState } from 'react';
import { useToast } from '../components/Toast';
import type { 
  AlertVariant, 
  AlertModalProps, 
  AlertBannerProps 
} from '../components/Alert';
import type { CustomToastOptions } from '../components/Toast';

// ================================
// TIPOS PARA NOTIFICAÇÕES
// ================================

interface NotificationOptions {
  title?: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ModalNotificationOptions extends NotificationOptions {
  width?: "sm" | "md" | "lg" | "xl";
  centered?: boolean;
  actions?: React.ReactNode;
}

interface BannerNotificationOptions extends NotificationOptions {
  position?: "top" | "bottom";
  fullWidth?: boolean;
  sticky?: boolean;
  actions?: React.ReactNode;
}

interface NotificationState {
  modals: Array<{
    id: string;
    variant: AlertVariant;
    title?: string;
    message: string;
    options: ModalNotificationOptions;
  }>;
  banners: Array<{
    id: string;
    variant: AlertVariant;
    title?: string;
    message: string;
    options: BannerNotificationOptions;
  }>;
}

// ================================
// HOOK DE NOTIFICAÇÕES UNIFICADO
// ================================

export const useNotification = () => {
  const toast = useToast();
  const [state, setState] = useState<NotificationState>({
    modals: [],
    banners: []
  });

  // ================================
  // TOAST NOTIFICATIONS
  // ================================

  const showToast = {
    success: (message: string, options?: NotificationOptions) => {
      return toast.success(message, {
        title: options?.title,
        autoClose: options?.duration,
        action: options?.action
      });
    },

    error: (message: string, options?: NotificationOptions) => {
      return toast.error(message, {
        title: options?.title,
        autoClose: options?.duration,
        action: options?.action
      });
    },

    warning: (message: string, options?: NotificationOptions) => {
      return toast.warning(message, {
        title: options?.title,
        autoClose: options?.duration,
        action: options?.action
      });
    },

    info: (message: string, options?: NotificationOptions) => {
      return toast.info(message, {
        title: options?.title,
        autoClose: options?.duration,
        action: options?.action
      });
    }
  };

  // ================================
  // MODAL NOTIFICATIONS
  // ================================

  const showModal = {
    success: (message: string, options?: ModalNotificationOptions) => {
      const id = `modal-${Date.now()}-${Math.random()}`;
      setState(prev => ({
        ...prev,
        modals: [...prev.modals, {
          id,
          variant: 'success',
          title: options?.title,
          message,
          options: options || {}
        }]
      }));
      return id;
    },

    error: (message: string, options?: ModalNotificationOptions) => {
      const id = `modal-${Date.now()}-${Math.random()}`;
      setState(prev => ({
        ...prev,
        modals: [...prev.modals, {
          id,
          variant: 'error',
          title: options?.title,
          message,
          options: options || {}
        }]
      }));
      return id;
    },

    warning: (message: string, options?: ModalNotificationOptions) => {
      const id = `modal-${Date.now()}-${Math.random()}`;
      setState(prev => ({
        ...prev,
        modals: [...prev.modals, {
          id,
          variant: 'warning',
          title: options?.title,
          message,
          options: options || {}
        }]
      }));
      return id;
    },

    info: (message: string, options?: ModalNotificationOptions) => {
      const id = `modal-${Date.now()}-${Math.random()}`;
      setState(prev => ({
        ...prev,
        modals: [...prev.modals, {
          id,
          variant: 'info',
          title: options?.title,
          message,
          options: options || {}
        }]
      }));
      return id;
    }
  };

  // ================================
  // BANNER NOTIFICATIONS
  // ================================

  const showBanner = {
    success: (message: string, options?: BannerNotificationOptions) => {
      const id = `banner-${Date.now()}-${Math.random()}`;
      setState(prev => ({
        ...prev,
        banners: [...prev.banners, {
          id,
          variant: 'success',
          title: options?.title,
          message,
          options: options || {}
        }]
      }));
      return id;
    },

    error: (message: string, options?: BannerNotificationOptions) => {
      const id = `banner-${Date.now()}-${Math.random()}`;
      setState(prev => ({
        ...prev,
        banners: [...prev.banners, {
          id,
          variant: 'error',
          title: options?.title,
          message,
          options: options || {}
        }]
      }));
      return id;
    },

    warning: (message: string, options?: BannerNotificationOptions) => {
      const id = `banner-${Date.now()}-${Math.random()}`;
      setState(prev => ({
        ...prev,
        banners: [...prev.banners, {
          id,
          variant: 'warning',
          title: options?.title,
          message,
          options: options || {}
        }]
      }));
      return id;
    },

    info: (message: string, options?: BannerNotificationOptions) => {
      const id = `banner-${Date.now()}-${Math.random()}`;
      setState(prev => ({
        ...prev,
        banners: [...prev.banners, {
          id,
          variant: 'info',
          title: options?.title,
          message,
          options: options || {}
        }]
      }));
      return id;
    }
  };

  // ================================
  // CONFIRMAÇÃO E PROMPT
  // ================================

  const confirm = (
    message: string, 
    options?: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
      variant?: AlertVariant;
    }
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = `confirm-${Date.now()}-${Math.random()}`;
      
      // Armazenar as callbacks para serem usadas no componente
      const handleConfirm = () => {
        dismissModal(id);
        resolve(true);
      };
      
      const handleCancel = () => {
        dismissModal(id);
        resolve(false);
      };

      setState(prev => ({
        ...prev,
        modals: [...prev.modals, {
          id,
          variant: options?.variant || 'info',
          title: options?.title || 'Confirmação',
          message,
          options: {
            width: 'md',
            centered: true,
            // Armazenar callbacks para uso no render do modal
            confirmText: options?.confirmText || 'Confirmar',
            cancelText: options?.cancelText || 'Cancelar',
            onConfirm: handleConfirm,
            onCancel: handleCancel
          }
        }]
      }));
    });
  };

  // ================================
  // FUNÇÕES DE CONTROLE
  // ================================

  const dismissModal = (id: string) => {
    setState(prev => ({
      ...prev,
      modals: prev.modals.filter(modal => modal.id !== id)
    }));
  };

  const dismissBanner = (id: string) => {
    setState(prev => ({
      ...prev,
      banners: prev.banners.filter(banner => banner.id !== id)
    }));
  };

  const dismissAllModals = () => {
    setState(prev => ({ ...prev, modals: [] }));
  };

  const dismissAllBanners = () => {
    setState(prev => ({ ...prev, banners: [] }));
  };

  const dismissAllToasts = () => {
    toast.dismissAll();
  };

  const dismissAll = () => {
    dismissAllModals();
    dismissAllBanners();
    dismissAllToasts();
  };

  // ================================
  // API SIMPLIFICADA
  // ================================

  const notify = {
    // Toast (pequenas notificações no canto)
    toast: showToast,
    
    // Modal (alertas centralizados grandes)
    modal: showModal,
    
    // Banner (alertas no topo/bottom da página)
    banner: showBanner,
    
    // Confirmação
    confirm,
    
    // Controles
    dismiss: {
      modal: dismissModal,
      banner: dismissBanner,
      allModals: dismissAllModals,
      allBanners: dismissAllBanners,
      allToasts: dismissAllToasts,
      all: dismissAll
    }
  };

  // ================================
  // ESTADO E RETORNO
  // ================================

  return {
    notify,
    state,
    // Funções individuais para compatibilidade
    showToast,
    showModal,
    showBanner,
    confirm,
    dismissModal,
    dismissBanner,
    dismissAll
  };
};

// ================================
// EXPORTAÇÕES
// ================================

export type { 
  NotificationOptions, 
  ModalNotificationOptions, 
  BannerNotificationOptions,
  NotificationState 
};