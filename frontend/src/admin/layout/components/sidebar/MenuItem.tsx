import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { getThemeClasses } from "../../../../design-system";
import { MenuItemProps, SimpleMenuItem, MenuSeparator } from "./types";

// ================================
// COMPONENTE MENU ITEM
// ================================

export const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isCollapsed,
  currentPath,
  onItemClick,
}) => {
  const theme = useTheme();

  // Renderizar separador
  if (item.type === "separator") {
    const separator = item as MenuSeparator;
    return (
      <div className="py-1">
        <div
          className={`border-t ${theme.isDark ? "border-white/5" : "border-gray-200"}`}
        />
        {separator.label && !isCollapsed && (
          <p
            className={`text-xs font-medium mt-2 px-3 ${getThemeClasses(
              theme.theme,
              "text.muted"
            )}`}
          >
            {separator.label}
          </p>
        )}
      </div>
    );
  }

  // Renderizar item de link
  if (item.type === "link") {
    const linkItem = item as SimpleMenuItem;
    const isActive = currentPath === linkItem.path;
    const Icon = linkItem.icon;

    const handleClick = () => {
      if (onItemClick) {
        onItemClick(item);
      }
    };

    return (
      <Link
        to={linkItem.path}
        onClick={handleClick}
        className={`flex items-center space-x-2 px-2 py-2 rounded-lg transition-all duration-200 group relative ${
          linkItem.disabled
            ? "opacity-50 cursor-not-allowed"
            : isActive
              ? theme.isDark
                ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                : "bg-blue-50 text-blue-600 border border-blue-200"
              : `hover:${theme.isDark ? "bg-white/5" : "bg-gray-50"} ${getThemeClasses(
                  theme.theme,
                  "text.secondary"
                )} hover:${getThemeClasses(theme.theme, "text.primary")}`
        }`}
        title={isCollapsed ? linkItem.label : linkItem.tooltip}
      >
        {/* Ícone */}
        <div className="relative flex-shrink-0">
          <Icon
            className={`w-4 h-4 ${
              isActive
                ? theme.isDark
                  ? "text-blue-300"
                  : "text-blue-600"
                : "group-hover:scale-110 transition-transform duration-200"
            }`}
          />

          {/* Badge no ícone quando collapsed */}
          {isCollapsed && linkItem.badge && (
            <div
              className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs font-medium ${
                theme.isDark ? "bg-red-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {typeof linkItem.badge === "number" && linkItem.badge > 99
                ? "99+"
                : linkItem.badge}
            </div>
          )}
        </div>

        {/* Label e Badge quando não collapsed */}
        {!isCollapsed && (
          <>
            <span className="text-sm font-medium flex-1">{linkItem.label}</span>

            {/* Badge */}
            {linkItem.badge && (
              <div
                className={`min-w-[20px] h-5 px-2 rounded-full flex items-center justify-center text-xs font-medium ${
                  theme.isDark
                    ? "bg-red-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {typeof linkItem.badge === "number" && linkItem.badge > 99
                  ? "99+"
                  : linkItem.badge}
              </div>
            )}

            {/* Indicador ativo */}
            {isActive && (
              <div
                className={`w-2 h-2 rounded-full ${
                  theme.isDark ? "bg-blue-300" : "bg-blue-600"
                }`}
              />
            )}
          </>
        )}
      </Link>
    );
  }

  return null;
};

export default MenuItem;
