import React from "react";
import { AdminSidebar } from ".";
import { adminSidebarConfig } from "./menuConfig";

// ================================
// TIPOS
// ================================

interface SimpleAdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isRightSidebar?: boolean;
}

// ================================
// COMPONENTE SIDEBAR - USA CONFIGURAÇÃO DO menuConfig.ts
// ================================

export const SimpleAdminSidebar: React.FC<SimpleAdminSidebarProps> = ({
  isCollapsed,
  onToggle,
  isRightSidebar = false
}) => {
  console.log("SimpleAdminSidebar recebeu isCollapsed:", isCollapsed);
  return (
    <AdminSidebar
      isCollapsed={isCollapsed}
      onToggle={onToggle}
      config={adminSidebarConfig}
      className={isRightSidebar ? 'sidebar-right' : ''}
    />
  );
};

export default SimpleAdminSidebar;
