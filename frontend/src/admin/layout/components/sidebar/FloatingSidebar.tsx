import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { getThemeClasses } from "../../../../design-system";
import { SimpleAdminSidebar } from "./SimpleAdminSidebar";
import { X } from "lucide-react";

// ================================
// TIPOS
// ================================

interface FloatingSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

// ================================
// COMPONENTE SIDEBAR FLUTUANTE
// ================================

export const FloatingSidebar: React.FC<FloatingSidebarProps> = ({
  isVisible,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const theme = useTheme();

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Overlay para fechar quando clicar fora */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar Flutuante */}
      <div
        className={`fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full">
          <SimpleAdminSidebar isCollapsed={isCollapsed} onToggle={onToggleCollapse} />
          
          {/* Botão para fechar */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-1.5 rounded-full ${
              getThemeClasses(theme.theme, "button.danger")
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingSidebar;