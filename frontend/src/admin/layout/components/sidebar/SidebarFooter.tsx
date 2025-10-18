import React from "react";
import { useTheme, getThemeClasses } from "../../../contexts/ThemeContext";
import { SidebarFooterProps } from "./types";

// ================================
// COMPONENTE SIDEBAR FOOTER
// ================================

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  isCollapsed,
  footer,
}) => {
  const theme = useTheme();

  // Não renderizar se collapsed ou se não há configuração de footer
  if (isCollapsed || !footer) {
    return null;
  }

  return (
    <div className="p-4 flex-shrink-0">
      {/* Conteúdo customizado */}
      {footer.customContent ? (
        <div>{footer.customContent}</div>
      ) : (
        /* Conteúdo padrão */
        <div
          className={`p-3 rounded-lg text-center ${
            theme.isDark
              ? "bg-white/5 border border-white/10"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          {/* Versão do sistema */}
          {footer.showVersion !== false && (
            <p
              className={`text-xs ${getThemeClasses(
                theme.theme,
                "text.muted"
              )}`}
            >
              SmartGesTI Admin v1.0
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;
