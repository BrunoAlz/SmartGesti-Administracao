import React from 'react';
import { Bell, Check } from 'lucide-react';
import { useThemeContext as useTheme } from "@/design-system";
import { useNotifications } from './NotificationsContext';
import { getThemeClasses } from "@/design-system";
import { cn } from "@/design-system";

export const NotificationsBadge: React.FC = () => {
  const theme = useTheme();
  const { unreadCount, setIsOpen } = useNotifications();
  const isDark = theme.theme === 'dark';

  return (
    <button
      onClick={() => setIsOpen(true)}
      className={`p-2 rounded-lg transition-all duration-200 relative ${getThemeClasses(
        theme.theme,
        "button.secondary"
      )}`}
      title="Notificações"
    >
      <Bell className="w-5 h-5" />
      
      {/* Badge com notificações não lidas - VERMELHO */}
      {unreadCount > 0 && (
        <span
          className={cn(
            "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2",
            "flex items-center justify-center w-5 h-5 text-xs font-bold text-white",
            "rounded-full animate-pulse",
            // Modo claro: vermelho normal
            !isDark && "bg-red-500",
            // Modo escuro: gradiente vermelho
            isDark && "bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-lg shadow-red-500/50"
          )}
        >
          {unreadCount}
        </span>
      )}
      
      {/* Badge quando não há notificações - VERDE */}
      {unreadCount === 0 && (
        <span
          className={cn(
            "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2",
            "flex items-center justify-center w-5 h-5 text-xs font-bold text-white",
            "rounded-full",
            // Modo claro: verde normal
            !isDark && "bg-green-500",
            // Modo escuro: gradiente verde
            isDark && "bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-lg shadow-green-500/50"
          )}
        >
          <Check className="w-3 h-3" />
        </span>
      )}
    </button>
  );
};