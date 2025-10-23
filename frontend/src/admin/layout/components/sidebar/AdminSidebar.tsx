import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { getThemeClasses } from "../../../../design-system";
import {
  SidebarProps,
  MenuItem as MenuItemType,
  MenuItemWithSubMenu,
} from "./types";
import { useSidebarMenu } from "./useSidebarMenu";
import { SidebarFooter } from "./SidebarFooter";
import { MenuItem } from "./MenuItem";
import { SubMenu } from "./SubMenu";
import "./sidebar-styles.css";

// ================================
// COMPONENTE ADMIN SIDEBAR PRINCIPAL
// ================================

export const AdminSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  config,
  className = "",
}) => {
  const theme = useTheme();
  const location = useLocation();
  const { isExpanded, toggleExpanded } = useSidebarMenu(config);

  const handleMenuItemClick = (item: MenuItemType) => {
    // Lógica adicional se necessário
    console.log("Menu item clicked:", item);
  };

  const handleSubMenuItemClick = (subItem: any) => {
    // Lógica adicional se necessário
    console.log("Submenu item clicked:", subItem);
  };

  const renderMenuItem = (item: MenuItemType) => {
    if (item.type === "submenu") {
      const submenuItem = item as MenuItemWithSubMenu;
      return (
        <SubMenu
          key={item.id}
          item={submenuItem}
          isCollapsed={isCollapsed}
          currentPath={location.pathname}
          isExpanded={isExpanded(item.id)}
          onToggleExpanded={() => toggleExpanded(item.id)}
          onItemClick={handleSubMenuItemClick}
          isRightSidebar={isRightSidebar}
        />
      );
    }

    return (
      <MenuItem
        key={item.id}
        item={item}
        isCollapsed={isCollapsed}
        currentPath={location.pathname}
        onItemClick={handleMenuItemClick}
        isRightSidebar={isRightSidebar}
      />
    );
  };

  // Garantir que o componente re-renderize quando isCollapsed mudar
  console.log("Sidebar isCollapsed state:", isCollapsed);
  
  // Forçar a largura com base no estado isCollapsed
  const sidebarWidth = isCollapsed ? '4rem' : '16rem'; // Equivalente a w-16 e w-64
  
  // Determinar se o sidebar está à direita baseado na classe
  const isRightSidebar = className?.includes('sidebar-right');

  return (
    <div
      className={`h-full ${isRightSidebar ? 'border-l' : 'border-r'} transition-all duration-300 ease-in-out flex flex-col w-full
        ${isCollapsed ? "sidebar-collapsed" : ""} 
        ${getThemeClasses(theme.theme, "sidebar")} ${className}`}
      style={{ 
        overflow: 'visible', // Garantir que o menu expandido não seja cortado
      }}
    >
      {/* Cabeçalho removido - controles movidos para o Navbar */}
      
      {/* Navigation */}
      <nav className={`p-4 space-y-2 flex-1 overflow-y-auto overflow-x-visible sidebar-scrollbar ${theme.isDark ? 'scrollbar-dark' : 'scrollbar-light'}`}>
        {config.sections.map((section) => (
          <div key={section.id} className="space-y-2">
            {/* Label da seção */}
            {section.label && !isCollapsed && (
              <div className="px-3 py-2">
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${getThemeClasses(
                    theme.theme,
                    "text.muted"
                  )}`}
                >
                  {section.label}
                </p>
              </div>
            )}

            {/* Items da seção */}
            <div className="space-y-1">{section.items.map(renderMenuItem)}</div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <SidebarFooter isCollapsed={isCollapsed} footer={config.footer} />
    </div>
  );
};

export default AdminSidebar;
