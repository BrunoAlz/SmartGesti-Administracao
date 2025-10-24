import React from 'react';
import { AlertCircle, CheckCircle2, User } from 'lucide-react';
import { NotificationType } from './types';

interface NotificationIconProps {
  type: NotificationType;
  className?: string;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({ type, className }) => {
  switch (type) {
    case 'warning':
      return <AlertCircle className={`${className} text-yellow-500`} />;
    case 'success':
      return <CheckCircle2 className={`${className} text-green-500`} />;
    case 'info':
      return <User className={`${className} text-blue-500`} />;
    case 'error':
      return <AlertCircle className={`${className} text-red-500`} />;
  }
};
