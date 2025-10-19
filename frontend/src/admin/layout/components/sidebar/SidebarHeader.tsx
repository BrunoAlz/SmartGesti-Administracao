import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { getThemeClasses } from "../../../../design-system";
import { SidebarHeaderProps } from "./types";

// ================================
// COMPONENTE SIDEBAR HEADER
// ================================

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  onToggle,
  branding,
}) => {
  const theme = useTheme();

  return (
    <div className="h-16 flex items-center justify-between px-4 border-b border-inherit flex-shrink-0">
      {/* Logo e Título */}
      {!isCollapsed && (
        <div className="flex items-center space-x-3">
          {/* Logo (se fornecido) */}
          {branding?.logo && (
            <div className="w-8 h-8 flex-shrink-0">
              <img
                src={branding.logo}
                alt={branding.title || "Logo"}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Título */}
          <div>
            <h2
              className={`font-bold text-lg leading-tight ${getThemeClasses(
                theme.theme,
                "text.primary"
              )}`}
            >
              {branding?.title || "Admin"}
            </h2>

            {/* Versão (se fornecida) */}
            {branding?.version && (
              <p
                className={`text-xs ${getThemeClasses(
                  theme.theme,
                  "text.muted"
                )}`}
              >
                v{branding.version}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Logo centrado quando collapsed */}
      {isCollapsed && branding?.logo && (
        <div className="w-8 h-8 mx-auto">
          <img
            src={branding.logo}
            alt={branding.title || "Logo"}
            className="w-full h-full object-contain"
            title={branding.title}
          />
        </div>
      )}

      {/* Botão Toggle */}
      <button
        onClick={onToggle}
        className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-105 ${getThemeClasses(
          theme.theme,
          "button.secondary"
        )} ${isCollapsed ? "mx-auto" : ""}`}
        title={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default SidebarHeader;
