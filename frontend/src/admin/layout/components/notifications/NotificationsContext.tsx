import React, { createContext, useContext, useState, ReactNode } from "react";
import { INotification } from "./types";
import { NotificationIcon } from "./NotificationIcon";

interface NotificationsContextData {
  notifications: INotification[];
  unreadCount: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addNotification: (notification: Omit<INotification, "id" | "icon">) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const NotificationsContext = createContext<NotificationsContextData | undefined>(undefined);

// Hook personalizado para acessar o contexto
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications deve ser usado dentro de um NotificationsProvider");
  }
  return context;
};

// Estado inicial do contexto
export const initialNotifications: Omit<INotification, "icon">[] = [
  {
    id: "1",
    type: "warning",
    title: "Atualização Disponível",
    message: "Uma nova versão do sistema está disponível. Clique para atualizar.",
    time: "1h atrás",
    read: false
  },
  {
    id: "2",
    type: "success",
    title: "Backup Realizado",
    message: "Backup automático do sistema concluído com sucesso.",
    time: "2h atrás",
    read: false
  }
];

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>(
    initialNotifications.map(notification => ({
      ...notification,
      icon: <NotificationIcon type={notification.type} />
    }))
  );
  const [isOpen, setIsOpen] = useState(false);

  // Calcula o número de notificações não lidas
  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<INotification, "id" | "icon">) => {
    const newNotification: INotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      icon: <NotificationIcon type={notification.type} />,
      read: false
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        isOpen,
        setIsOpen,
        addNotification,
        removeNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
