import React, { ReactElement } from "react";
import { Bell, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Badge } from "@/design-system";
import { useThemeClasses } from "@/design-system/theme/hooks";
import { useNotifications } from "./NotificationsContext";
import DropdownOverlay from "../sidebar/DropdownOverlay";

export function NotificationsPanel(): ReactElement {
  const { get, cn, isDark } = useThemeClasses();
  const { notifications, unreadCount, isOpen, setIsOpen, markAsRead, markAllAsRead } = useNotifications();

  return (
    <DropdownOverlay
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position={{ top: 60, left: window.innerWidth - 420 }} // Posicionar à direita, abaixo da navbar
      width={400}
    >
      <div className={`p-4 max-h-[85vh] overflow-y-auto ${isDark ? 'scrollbar-dark' : 'scrollbar-light'}`}>
        {/* Cabeçalho principal */}
        <div className="mb-4 pb-2 border-b border-slate-700/30">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Bell className={`w-5 h-5 mr-2 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <h3 className={`text-base font-medium ${get("text.primary")}`}>
                Notificações
              </h3>
              {unreadCount > 0 && (
                <Badge variant="error" size="sm" className="ml-2 animate-pulse">
                  {unreadCount} nova{unreadCount > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={cn(
                "p-1 rounded-lg transition-colors",
                get("button.ghost"),
                "hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className={`text-xs ${get("text.secondary")}`}>
            Suas notificações do sistema
          </p>
        </div>

        {/* Ações */}
        {unreadCount > 0 && (
          <div className="mb-4 pb-3 border-b border-slate-700/30">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          </div>
        )}

        {/* Lista de Notificações */}
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                isDark ? "bg-slate-800/50" : "bg-slate-100/70"
              )}>
                <Bell className={`w-8 h-8 ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`} />
              </div>
              <p className={`text-sm ${get("text.secondary")}`}>
                Nenhuma notificação
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={!notification.read ? { backgroundColor: isDark ? "#0f172a" : "#f8fafc" } : {}}
                animate={{ backgroundColor: "transparent" }}
                transition={{ duration: 1.5 }}
                className={cn(
                  "rounded-md p-3 transition-colors relative",
                  !notification.read && (isDark ? "bg-slate-900/50" : "bg-slate-50/70"),
                  "hover:bg-slate-50 dark:hover:bg-slate-800/50",
                  "border border-slate-200/70 dark:border-slate-700/50"
                )}
              >
                <div className="flex gap-3">
                  {/* Ícone */}
                  <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                    // Cores baseadas no tipo de notificação
                    notification.type === 'warning' && (isDark ? "bg-yellow-900/30" : "bg-yellow-100/80"),
                    notification.type === 'success' && (isDark ? "bg-green-900/30" : "bg-green-100/80"),
                    notification.type === 'info' && (isDark ? "bg-blue-900/30" : "bg-blue-100/80"),
                    notification.type === 'error' && (isDark ? "bg-red-900/30" : "bg-red-100/80"),
                    // Fallback para tipos não definidos
                    !['warning', 'success', 'info', 'error'].includes(notification.type) && (isDark ? "bg-slate-800/70" : "bg-slate-100/70")
                  )}>
                    <div className="w-5 h-5 flex items-center justify-center">
                      {notification.icon}
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={cn(
                        "text-sm font-semibold truncate",
                        get("text.primary")
                      )}>
                        {notification.title}
                      </h3>
                      <span className={cn(
                        "text-xs whitespace-nowrap ml-2",
                        get("text.muted")
                      )}>
                        {notification.time}
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm",
                      get("text.secondary")
                    )}>
                      {notification.message}
                    </p>
                  </div>
                </div>

                {/* Indicador de não lida */}
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 justify-center text-xs"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Marcar como lida
                  </Button>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-700/30">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={() => setIsOpen(false)}
          >
            Configurar Notificações
          </Button>
        </div>
      </div>
    </DropdownOverlay>
  );
}