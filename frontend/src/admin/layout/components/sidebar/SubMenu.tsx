import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { getThemeClasses } from "../../../../design-system";
import { SubMenuProps, SubMenuItem } from "./types";

// ================================
// COMPONENTE SUB MENU
// ================================

export const SubMenu: React.FC<SubMenuProps> = ({
  item,
  isCollapsed,
  currentPath,
  isExpanded,
  onToggleExpanded,
  onItemClick,
}) => {
  const theme = useTheme();
  const Icon = item.icon;

  // Verificar se algum submenu está ativo
  const hasActiveChild = item.children.some(
    (child) => currentPath === child.path
  );
  const isParentActive = hasActiveChild;

  const handleParentClick = () => {
    if (!isCollapsed) {
      onToggleExpanded();
    }
  };

  const handleSubItemClick = (subItem: SubMenuItem) => {
    if (onItemClick) {
      onItemClick(subItem);
    }
  };

  return (
    <div className="space-y-1">
      {/* Item principal do submenu */}
      <button
        onClick={handleParentClick}
        disabled={item.disabled}
        className={`w-full flex items-center space-x-2 px-2 py-2 rounded-lg transition-all duration-200 group relative ${
          item.disabled
            ? "opacity-50 cursor-not-allowed"
            : isParentActive
              ? theme.isDark
                ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                : "bg-blue-50 text-blue-600 border border-blue-200"
              : `hover:${theme.isDark ? "bg-white/5" : "bg-gray-50"} ${getThemeClasses(
                  theme.theme,
                  "text.secondary"
                )} hover:${getThemeClasses(theme.theme, "text.primary")}`
        }`}
        title={isCollapsed ? item.label : item.tooltip}
      >
        {/* Ícone */}
        <div className="relative flex-shrink-0">
          <Icon
            className={`w-4 h-4 ${
              isParentActive
                ? theme.isDark
                  ? "text-blue-300"
                  : "text-blue-600"
                : "group-hover:scale-110 transition-transform duration-200"
            }`}
          />

          {/* Badge no ícone quando collapsed */}
          {isCollapsed && item.badge && (
            <div
              className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-xs font-medium ${
                theme.isDark ? "bg-red-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {typeof item.badge === "number" && item.badge > 99
                ? "99+"
                : item.badge}
            </div>
          )}
        </div>

        {/* Label, Badge e Chevron quando não collapsed */}
        {!isCollapsed && (
          <>
            <span className="text-sm font-medium flex-1 text-left">{item.label}</span>

            {/* Badge */}
            {item.badge && (
              <div
                className={`min-w-[20px] h-5 px-2 rounded-full flex items-center justify-center text-xs font-medium ${
                  theme.isDark
                    ? "bg-red-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {typeof item.badge === "number" && item.badge > 99
                  ? "99+"
                  : item.badge}
              </div>
            )}

            {/* Chevron para indicar expansão */}
            <div
              className={`transition-transform duration-200 ${
                isExpanded ? "rotate-0" : ""
              }`}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>

            {/* Indicador ativo */}
            {isParentActive && (
              <div
                className={`w-2 h-2 rounded-full ${
                  theme.isDark ? "bg-blue-300" : "bg-blue-600"
                }`}
              />
            )}
          </>
        )}
      </button>

      {/* Subitens - só mostra quando não collapsed e expanded */}
      {!isCollapsed && isExpanded && (
        <div
          className={`ml-8 space-y-1 overflow-hidden transition-all duration-300 ease-in-out`}
        >
          {item.children.map((subItem) => {
            const isSubItemActive = currentPath === subItem.path;
            const SubIcon = subItem.icon;

            return (
              <Link
                key={subItem.id}
                to={subItem.path}
                onClick={() => handleSubItemClick(subItem)}
                className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg transition-all duration-200 group relative ${
                  subItem.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSubItemActive
                      ? theme.isDark
                        ? "bg-blue-500/10 text-blue-300 border-l-2 border-blue-400"
                        : "bg-blue-25 text-blue-600 border-l-2 border-blue-500"
                      : `hover:${theme.isDark ? "bg-white/5" : "bg-gray-50"} ${getThemeClasses(
                          theme.theme,
                          "text.muted"
                        )} hover:${getThemeClasses(theme.theme, "text.secondary")}`
                }`}
                title={subItem.tooltip}
              >
                {/* Ícone do subitem (opcional) */}
                {SubIcon && (
                  <div className="relative flex-shrink-0">
                    <SubIcon
                      className={`w-3 h-3 ${
                        isSubItemActive
                          ? theme.isDark
                            ? "text-blue-300"
                            : "text-blue-600"
                          : "group-hover:scale-110 transition-transform duration-200"
                      }`}
                    />
                  </div>
                )}

                {/* Label do subitem */}
                <span className="text-xs font-medium flex-1">
                  {subItem.label}
                </span>

                {/* Badge do subitem */}
                {subItem.badge && (
                  <div
                    className={`min-w-[18px] h-4 px-1.5 rounded-full flex items-center justify-center text-xs font-medium ${
                      theme.isDark
                        ? "bg-red-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {typeof subItem.badge === "number" && subItem.badge > 99
                      ? "99+"
                      : subItem.badge}
                  </div>
                )}

                {/* Indicador ativo do subitem */}
                {isSubItemActive && (
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      theme.isDark ? "bg-blue-300" : "bg-blue-600"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubMenu;
