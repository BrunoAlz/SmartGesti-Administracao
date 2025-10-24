import React from 'react';
import { Bell } from 'lucide-react';
import { useThemeContext as useTheme } from "@/design-system";
import { useNotifications } from './NotificationsContext';
import { getThemeClasses } from "@/design-system";

export const NotificationsBadge: React.FC = () => {
  const theme = useTheme();
  const { unreadCount, setIsOpen } = useNotifications();

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
      {unreadCount > 0 && (
        <span
          className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 
            flex items-center justify-center w-5 h-5 text-xs font-bold text-white 
            rounded-full bg-blue-500`}
        >
          {unreadCount}
        </span>
      )}
    </button>
  );
};