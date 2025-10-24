import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export type NotificationType = "info" | "warning" | "success" | "error";

export interface INotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: ReactNode;
  unread?: boolean; // Opcional para manter compatibilidade
}

export type BadgeStatusType = "error" | "success";