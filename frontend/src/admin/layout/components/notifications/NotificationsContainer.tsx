import React from 'react';
import { useNotifications } from './NotificationsContext';
import { NotificationsPanel } from './NotificationsPanel';
import { NotificationsBadge } from './NotificationsBadge';

export const NotificationsContainer: React.FC = () => {
  const { isOpen, setIsOpen } = useNotifications();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Badge + Icon */}
      <NotificationsBadge />

      {/* Panel */}
      <NotificationsPanel />
    </div>
  );
};