import React from 'react';
import SimpleAdminNavbar from './SimpleAdminNavbar';

interface NotificationsNavbarProps {
  user: any;
  onLogout: () => void;
}

export const NotificationsNavbar: React.FC<NotificationsNavbarProps> = ({ user, onLogout }) => {
  return <SimpleAdminNavbar user={user} onLogout={onLogout} />;
};