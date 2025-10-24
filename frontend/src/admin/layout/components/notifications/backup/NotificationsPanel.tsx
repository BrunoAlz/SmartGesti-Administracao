import React, { ReactElement } from "react";
import { Bell, X, CheckCircle2 } from "lucide-react";
import { Badge, Button } from "@/design-system";
import { useThemeClasses } from "@/design-system/theme/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { INotification, NotificationType } from "../types";
import { NotificationIcon } from "../NotificationIcon";

const mockNotifications: INotification[] = [
  {
    id: "1",
    type: "warning",
    title: "Atualização Pendente",
    message: "Nova versão do sistema disponível. Atualize para acessar os novos recursos.",
    time: "Agora",
    read: false,
    icon: <NotificationIcon type="warning" />
  },
  {
    id: "2",
    type: "success",
    title: "Backup Realizado",
    message: "Backup automático do sistema concluído com sucesso.",
    time: "2h atrás",
    read: false,
    icon: <NotificationIcon type="success" />
  },
  {
    id: "3",
    type: "info",
    title: "Novo Usuário",
    message: "João Silva foi adicionado como administrador.",
    time: "5h atrás",
    read: false,
    icon: <NotificationIcon type="info" />
  },
  {
    id: "4",
    type: "error",
    title: "Erro no Sistema",
    message: "Falha na sincronização de dados. Tente novamente.",
    time: "1d atrás",
    read: true,
    icon: <NotificationIcon type="error" />
  },
  {
    id: "5",
    type: "info",
    title: "Manutenção Programada",
    message: "Sistema entrará em manutenção em 2 horas.",
    time: "3d atrás",
    read: true,
    icon: <NotificationIcon type="info" />
  }
];

// ================================
// COMPONENTE PAINEL DE NOTIFICAÇÕES
// ================================

export function NotificationsPanel(): ReactElement {
  const { get, cn, isDark } = useThemeClasses();
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<INotification[]>(mockNotifications);

  // Calcula o número de notificações não lidas
  const unreadCount = notifications.filter(n => !n.read).length;

  // Função para marcar todas as notificações como lidas
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Função para marcar uma notificação como lida
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <>
      {/* Botão de Notificações com Badge */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "p-2 rounded-lg transition-all relative",
          get("button.secondary")
        )}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 ? (
          <span className="absolute -top-1 -right-1">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className={cn(
                "flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
                "bg-red-500 text-white",
                "animate-pulse shadow-lg shadow-red-500/30"
              )}
            >
              {unreadCount}
            </motion.div>
          </span>
        ) : (
          <span className="absolute -top-1 -right-1">
            <div className={cn(
              "flex items-center justify-center w-4 h-4 rounded-full",
              "bg-green-500 text-white"
            )}>
              <CheckCircle2 className="w-3 h-3" />
            </div>
          </span>
        )}
      </button>

      {/* Painel de Notificações */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Painel Lateral */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={cn(
                "fixed top-0 right-0 h-full w-full sm:w-96 z-50",
                "border-l shadow-2xl",
                isDark 
                  ? "bg-slate-900 border-slate-800" 
                  : "bg-white border-slate-200"
              )}
            >
              {/* Header */}
              <div className={cn(
                "flex items-center justify-between p-4 border-b",
                isDark ? "border-slate-800" : "border-slate-200"
              )}>
                <div className="flex items-center space-x-2">
                  <Bell className={cn("w-5 h-5", get("text.primary"))} />
                  <h2 className={cn("text-lg font-semibold", get("text.primary"))}>
                    Notificações
                  </h2>
                  {unreadCount > 0 && (
                    <Badge variant="error" size="sm" className="animate-pulse">
                      {unreadCount} nova{unreadCount > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    get("button.ghost"),
                    "hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Ações */}
              {unreadCount > 0 && (
                <div className={cn(
                  "p-3 border-b",
                  isDark ? "border-slate-800" : "border-slate-200"
                )}>
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
              <div className="overflow-y-auto h-[calc(100vh-180px)]">
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={!notification.read ? { backgroundColor: isDark ? "#0f172a" : "#f8fafc" } : {}}
                      animate={{ backgroundColor: "transparent" }}
                      transition={{ duration: 1.5 }}
                      className={cn(
                        "p-4 transition-colors relative",
                        !notification.read && (isDark ? "bg-slate-900" : "bg-slate-50"),
                        "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      )}
                    >
                      <div className="flex gap-3">
                        {/* Ícone */}
                        <div className={cn(
                          "flex-shrink-0 rounded-full p-2",
                          isDark ? "bg-slate-800" : "bg-slate-100"
                        )}>
                          {notification.icon}
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
                        <>
                          <div className="absolute right-4 top-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full mt-2 justify-center text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Marcar como lida
                          </Button>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 p-4 border-t",
                isDark ? "border-slate-800" : "border-slate-200",
                "bg-inherit"
              )}>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Configurar Notificações
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};