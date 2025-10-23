import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { getThemeClasses } from "../../../../design-system";
import { SubMenuProps, SubMenuItem } from "./types";
import DropdownOverlay from "./DropdownOverlay";

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
  isRightSidebar = false,
}) => {
  const theme = useTheme();
  const Icon = item.icon;
  const itemRef = useRef<HTMLButtonElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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

  // Se não estiver collapsed, usamos o comportamento normal
  if (!isCollapsed) {
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

        {/* Tooltip expandido ao passar o mouse - apenas quando collapsed */}
        {isCollapsed && (
          <div className={`absolute ${isRightSidebar ? 'right-full mr-2' : 'left-full ml-2'} top-0 hidden group-hover:flex z-[9999]`} style={{ pointerEvents: 'auto' }}>
            <div className={`rounded-lg py-2 px-3 shadow-xl ${theme.isDark 
              ? 'bg-slate-800 border border-slate-700' 
              : 'bg-white border border-slate-200'} min-w-[180px]`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${theme.isDark ? "text-white" : "text-gray-700"}`}>
                  {item.label}
                </span>
                {item.badge && (
                  <div className="ml-2 min-w-[20px] h-5 px-2 rounded-full flex items-center justify-center text-xs font-medium bg-red-500 text-white">
                    {typeof item.badge === "number" && item.badge > 99 ? "99+" : item.badge}
                  </div>
                )}
              </div>

              {/* Subitems no tooltip */}
              <div className={`space-y-1 pl-2 border-l ${theme.isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                {item.children.map(subItem => (
                  <Link 
                    key={subItem.id}
                    to={subItem.path}
                    onClick={() => handleSubItemClick(subItem)}
                    className={`block py-1 px-2 rounded text-sm ${
                      currentPath === subItem.path
                        ? theme.isDark
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-blue-50 text-blue-600'
                        : `hover:${theme.isDark ? 'bg-slate-700' : 'bg-slate-100'}`
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

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
              ) : isRightSidebar ? (
                <ChevronLeft className="w-4 h-4" />
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
  }
  
  // Versão quando está collapsed (similar ao TopNavigation)
  return (
    <div className="relative">
      {/* Item principal apenas com ícone */}
      <button
        ref={itemRef}
        className={`w-full flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
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
        title={item.label}
        disabled={item.disabled}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
      >
        <div className="relative">
          <Icon
            className={`w-4 h-4 ${
              isParentActive
                ? theme.isDark
                  ? "text-blue-300"
                  : "text-blue-600"
                : "transition-transform duration-200"
            }`}
          />
          
          {/* Badge no ícone */}
          {item.badge && (
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
      </button>
      
      {/* Dropdown renderizado como Portal para garantir z-index correto */}
      <DropdownOverlay
        isOpen={showDropdown}
        onClose={() => setShowDropdown(false)}
        position={isRightSidebar ? {
          top: itemRef.current?.getBoundingClientRect().top || 0,
          left: (itemRef.current?.getBoundingClientRect().left || 0) - 228
        } : {
          top: itemRef.current?.getBoundingClientRect().top || 0,
          left: (itemRef.current?.getBoundingClientRect().right || 0) + 8
        }}
        width={220}
      >
        <div className="p-3">
          {/* Título da seção no menu */}
          <div className={`mb-2 pb-2 px-2 font-medium ${
            theme.isDark ? 'border-b border-slate-700/70 text-white' : 'border-b border-slate-200 text-slate-700'
          }`}>
            {item.label}
            {item.badge && (
              <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full inline-block ${
                theme.isDark 
                  ? 'bg-primary-900/50 text-primary-400' 
                  : 'bg-primary-100 text-primary-700'
              }`}>
                {typeof item.badge === "number" && item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
          </div>
          
          {/* Lista de subitens */}
          <div className="grid grid-cols-1 gap-1">
            {item.children.map(subItem => (
              <Link 
                key={subItem.id}
                to={subItem.path}
                onClick={() => {
                  handleSubItemClick(subItem);
                  setShowDropdown(false);
                }}
                className={`flex items-center p-2 text-sm rounded-md transition-colors
                  ${currentPath === subItem.path 
                    ? theme.isDark
                      ? 'bg-primary-900/30 text-primary-400 border-l-2 border-primary-500'
                      : 'bg-primary-50 text-primary-600 border-l-2 border-primary-500'
                    : theme.isDark 
                      ? 'text-slate-300 hover:bg-slate-700/50' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                {subItem.icon && (
                  <subItem.icon className={`w-4 h-4 mr-2 ${
                    currentPath === subItem.path
                      ? 'text-primary-400'
                      : 'opacity-70'
                  }`} />
                )}
                <span className="flex-1">{subItem.label}</span>
                
                {/* Badge se existir */}
                {subItem.badge && (
                  <span className={`ml-auto px-1.5 py-0.5 text-xs rounded-full ${
                    theme.isDark 
                      ? 'bg-primary-900/50 text-primary-400' 
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {subItem.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </DropdownOverlay>
    </div>
  );
};

export default SubMenu;
