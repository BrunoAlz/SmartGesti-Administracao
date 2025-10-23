import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { MenuItemProps, SimpleMenuItem, MenuSeparator } from "./types";
import DropdownOverlay from "./DropdownOverlay";

// ================================
// COMPONENTE MENU ITEM
// ================================

export const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isCollapsed,
  currentPath,
  onItemClick,
  isRightSidebar = false,
}) => {
  const theme = useTheme();
  const itemRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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
            className={`text-xs font-medium mt-2 px-3 ${
              theme.isDark ? "text-gray-300" : "text-gray-500"
            }`}
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

      // Versão normal (não collapsed)
      if (!isCollapsed) {
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
                  : `hover:${theme.isDark ? "bg-white/5" : "bg-gray-100"} ${
                      theme.isDark ? "text-white" : "text-gray-600"
                    } hover:${theme.isDark ? "text-white" : "text-gray-600"}`
            }`}
            title={linkItem.tooltip}
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
            </div>

            {/* Label e Badge */}
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
          </Link>
        );
      }
      
      // Versão collapsed (apenas ícone com dropdown hover)
      return (
        <div className="relative">
          {/* Ícone visível quando collapsed */}
          <div
            ref={itemRef}
            className={`flex items-center justify-center px-2 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
              linkItem.disabled
                ? "opacity-50 cursor-not-allowed"
                : isActive
                  ? theme.isDark
                    ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                    : "bg-blue-50 text-blue-600 border border-blue-200"
                  : `hover:${theme.isDark ? "bg-white/5" : "bg-gray-100"} ${
                      theme.isDark ? "text-white" : "text-gray-600"
                    }`
            }`}
            title={linkItem.label}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
          >
            <div className="relative">
              <Icon
                className={`w-4 h-4 ${
                  isActive
                    ? theme.isDark
                      ? "text-blue-300"
                      : "text-blue-600"
                    : ""
                }`}
              />
              
              {/* Badge no ícone */}
              {linkItem.badge && (
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
          </div>
          
          {/* Menu dropdown usando Portal para garantir que apareça acima de todos os elementos */}
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
              {/* Título no menu */}
              <div className={`mb-2 pb-2 px-2 font-medium ${
                theme.isDark ? 'border-b border-slate-700/70 text-white' : 'border-b border-slate-200 text-slate-700'
              }`}>
                {linkItem.label}
              </div>
              
              {/* Link principal */}
              <Link
                to={linkItem.path}
                onClick={() => {
                  handleClick();
                  setShowDropdown(false);
                }}
                className={`flex items-center p-2 text-sm rounded-md transition-colors
                  ${isActive 
                    ? theme.isDark
                      ? 'bg-primary-900/30 text-primary-400 border-l-2 border-primary-500'
                      : 'bg-primary-50 text-primary-600 border-l-2 border-primary-500'
                    : theme.isDark 
                      ? 'text-slate-300 hover:bg-slate-700/50' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                {/* Ícone */}
                <Icon className={`w-4 h-4 mr-2 ${
                  isActive
                    ? 'text-primary-400'
                    : 'opacity-70'
                }`} />
                
                <span className="flex-1">Acessar {linkItem.label}</span>
                
                {/* Badge se existir */}
                {linkItem.badge && (
                  <span className={`ml-auto px-1.5 py-0.5 text-xs rounded-full ${
                    theme.isDark 
                      ? 'bg-primary-900/50 text-primary-400' 
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {typeof linkItem.badge === "number" && linkItem.badge > 99
                      ? "99+"
                      : linkItem.badge}
                  </span>
                )}
              </Link>
            </div>
          </DropdownOverlay>
        </div>
      );
    }  return null;
};

export default MenuItem;
