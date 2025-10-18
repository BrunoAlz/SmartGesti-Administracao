import React, { useState, useRef } from "react";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "info",
      title: "Novo agendamento",
      message: "Maria Silva agendou uma consulta para amanhã às 14:00",
      time: "Há 5 minutos",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Consulta próxima",
      message: "João Santos tem consulta em 30 minutos",
      time: "Há 10 minutos",
      read: false,
    },
    {
      id: "3",
      type: "success",
      title: "Pagamento recebido",
      message: "Pagamento de R$ 350,00 da consulta de Ana Costa foi confirmado",
      time: "Há 1 hora",
      read: false,
    },
    {
      id: "4",
      type: "error",
      title: "Cancelamento",
      message: "Pedro Oliveira cancelou sua consulta de hoje",
      time: "Há 2 horas",
      read: true,
    },
    {
      id: "5",
      type: "info",
      title: "Lembrete",
      message: "Não esqueça de atualizar o histórico médico dos pacientes",
      time: "Há 3 horas",
      read: true,
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = () => setIsOpen(!isOpen);

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

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-400 bg-green-50";
      case "warning":
        return "border-l-yellow-400 bg-yellow-50";
      case "error":
        return "border-l-red-400 bg-red-50";
      default:
        return "border-l-blue-400 bg-blue-50";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 group"
        title="Notificações"
      >
        <BellIcon className="w-6 h-6 transition-transform duration-300 group-hover:animate-swing" />

        {/* Badge de notificações não lidas */}
        {unreadCount > 0 && (
          <>
            {/* Indicador piscante de fundo */}
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] text-xs font-bold leading-none text-white bg-red-500 rounded-full z-10 animate-ping"></span>
            {/* Badge com número */}
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] text-xs font-bold leading-none text-white bg-red-500 rounded-full z-10">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Notificações
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary-600 hover:text-primary-800 font-medium"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>

          {/* Lista de notificações - Container com scroll */}
          <div className="h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Nenhuma notificação
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Você está em dia com suas notificações.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative px-4 py-3 hover:bg-gray-50 border-l-4 ${getNotificationColor(
                    notification.type
                  )} ${!notification.read ? "bg-blue-25" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <p
                          className={`text-sm font-medium ${
                            !notification.read
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>

                    {/* Botões de ação */}
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded"
                          title="Marcar como lida"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded"
                        title="Remover notificação"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer - Estático fora do scroll */}
          {notifications.length > 0 && (
            <div className="px-4 py-1 border-t border-gray-100 bg-gray-50">
              <button className="w-full text-center text-sm text-primary-600 hover:text-primary-800 font-medium">
                Ver todas as notificações
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
