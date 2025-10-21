import React from "react";
import { AdminSidebar } from ".";
import { adminSidebarConfig } from "./menuConfig";

// ================================
// TIPOS
// ================================

interface SimpleAdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

// ================================
// COMPONENTE SIDEBAR - USA CONFIGURAÇÃO DO menuConfig.ts
// ================================

export const SimpleAdminSidebar: React.FC<SimpleAdminSidebarProps> = ({
  isCollapsed,
  onToggle,
}) => {
  console.log("SimpleAdminSidebar recebeu isCollapsed:", isCollapsed);
  return (
    <AdminSidebar
      isCollapsed={isCollapsed}
      onToggle={onToggle}
      config={adminSidebarConfig}
    />
  );
};

export default SimpleAdminSidebar;
