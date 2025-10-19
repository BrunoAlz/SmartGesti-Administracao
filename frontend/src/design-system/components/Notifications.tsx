import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useThemeClasses } from "../hooks";
import { cn } from "../theme-classes";
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X, 
  Bell,
  BellOff,
  Settings
} from "lucide-react";

// ================================
// TIPOS
// ================================

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
  timestamp: Date;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  variant?: "primary" | "secondary" | "danger";
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
  isEnabled: boolean;
  toggleNotifications: () => void;
}

// ================================
// CONTEXTO DE NOTIFICAÇÕES
// ================================

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

// ================================
// PROVIDER DE NOTIFICAÇÕES
// ================================

interface NotificationProviderProps {
  children: React.ReactNode;
  maxNotifications?: number;
  defaultDuration?: number;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  maxNotifications = 5,
  defaultDuration = 5000,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp">) => {
    if (!isEnabled) return "";

    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? defaultDuration,
      timestamp: new Date(),
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      return updated.slice(0, maxNotifications);
    });

    // Auto remove se não for persistente
    if (!notification.persistent && newNotification.duration! > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, [isEnabled, defaultDuration, maxNotifications]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    // Implementar lógica de leitura se necessário
  }, []);

  const markAllAsRead = useCallback(() => {
    // Implementar lógica de leitura se necessário
  }, []);

  const toggleNotifications = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  const unreadCount = notifications.length;

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    markAsRead,
    markAllAsRead,
    unreadCount,
    isEnabled,
    toggleNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// ================================
// COMPONENTE NOTIFICATION ITEM
// ================================

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRemove,
}) => {
  const { get } = useThemeClasses();

  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-50 dark:bg-green-500/20",
      borderColor: "border-green-200 dark:border-green-400/30",
      iconColor: "text-green-600 dark:text-green-400",
      titleColor: "text-green-800 dark:text-green-200",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-50 dark:bg-red-500/20",
      borderColor: "border-red-200 dark:border-red-400/30",
      iconColor: "text-red-600 dark:text-red-400",
      titleColor: "text-red-800 dark:text-red-200",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-50 dark:bg-yellow-500/20",
      borderColor: "border-yellow-200 dark:border-yellow-400/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      titleColor: "text-yellow-800 dark:text-yellow-200",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50 dark:bg-blue-500/20",
      borderColor: "border-blue-200 dark:border-blue-400/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-800 dark:text-blue-200",
    },
  };

  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative p-4 rounded-lg border shadow-lg transition-all duration-300 ease-in-out transform",
        config.bgColor,
        config.borderColor,
        "hover:scale-105 hover:shadow-xl"
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", config.iconColor)} />
        
        <div className="flex-1 min-w-0">
          <h4 className={cn("text-sm font-medium", config.titleColor)}>
            {notification.title}
          </h4>
          {notification.message && (
            <p className={cn("text-sm mt-1", get("text.secondary"))}>
              {notification.message}
            </p>
          )}
          
          {notification.actions && notification.actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {notification.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                    action.variant === "danger"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : action.variant === "primary"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={() => onRemove(notification.id)}
          className="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
        </button>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {notification.timestamp.toLocaleTimeString()}
      </div>
    </div>
  );
};

// ================================
// COMPONENTE NOTIFICATION CONTAINER
// ================================

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>,
    document.body
  );
};

// ================================
// COMPONENTE NOTIFICATION BELL
// ================================

interface NotificationBellProps {
  className?: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  className,
}) => {
  const { unreadCount, toggleNotifications, isEnabled } = useNotifications();
  const { get } = useThemeClasses();

  return (
    <button
      onClick={toggleNotifications}
      className={cn(
        "relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors",
        className
      )}
    >
      {isEnabled ? (
        <Bell className={cn("w-5 h-5", get("text.primary"))} />
      ) : (
        <BellOff className={cn("w-5 h-5", get("text.muted"))} />
      )}
      
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
};

// ================================
// COMPONENTE NOTIFICATION PANEL
// ================================

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const { notifications, clearAllNotifications, removeNotification } = useNotifications();
  const { get } = useThemeClasses();

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className={cn(
          "absolute top-4 right-4 w-80 max-h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-white/10",
          className
        )}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center justify-between">
            <h3 className={cn("text-lg font-semibold", get("text.primary"))}>
              Notificações
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={clearAllNotifications}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Limpar todas
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className={cn("text-sm", get("text.secondary"))}>
                Nenhuma notificação
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRemove={removeNotification}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// ================================
// HOOKS DE CONVENIÊNCIA
// ================================

const useNotificationActions = () => {
  const { addNotification } = useNotifications();

  const showSuccess = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({
      type: "success",
      title,
      message,
      ...options,
    });
  }, [addNotification]);

  const showError = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({
      type: "error",
      title,
      message,
      persistent: true,
      ...options,
    });
  }, [addNotification]);

  const showWarning = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({
      type: "warning",
      title,
      message,
      ...options,
    });
  }, [addNotification]);

  const showInfo = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({
      type: "info",
      title,
      message,
      ...options,
    });
  }, [addNotification]);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

// ================================
// EXPORTS
// ================================

export default NotificationProvider;
export {
  NotificationProvider,
  NotificationContainer,
  NotificationBell,
  NotificationPanel,
  useNotifications,
  useNotificationActions,
};
