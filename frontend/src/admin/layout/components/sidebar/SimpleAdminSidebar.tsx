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
  mode?: 'default' | 'right' | 'top';
}

// ================================
// COMPONENTE SIDEBAR - USA CONFIGURAÇÃO DO menuConfig.ts
// ================================

export const SimpleAdminSidebar: React.FC<SimpleAdminSidebarProps> = ({
  isCollapsed,
  onToggle,
  isRightSidebar = false,
  mode = 'default'
}) => {
  const [internalState, setInternalState] = React.useState(isCollapsed);
  
  // Sincronizar estado interno quando a prop muda
  React.useEffect(() => {
    if (internalState !== isCollapsed) {
      console.log(`SimpleAdminSidebar atualizando estado interno: ${internalState} → ${isCollapsed}`);
      setInternalState(isCollapsed);
    }
  }, [isCollapsed, internalState]);
  
  // Handler para toggle de sidebar com logging
  const handleToggle = React.useCallback(() => {
    console.log("SimpleAdminSidebar - Toggle acionado. Estado atual:", internalState);
    onToggle();
  }, [onToggle, internalState]);
  
  return (
    <AdminSidebar
      isCollapsed={internalState}
      onToggle={handleToggle}
      config={adminSidebarConfig}
      className={isRightSidebar ? 'sidebar-right' : ''}
      mode={mode}
    />
  );
};

export default SimpleAdminSidebar;
