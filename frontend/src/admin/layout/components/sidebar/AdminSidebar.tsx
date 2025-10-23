import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { getThemeClasses } from "../../../../design-system";
import { ChevronLeft, ChevronRight, PanelLeft, PanelRight, PanelTop } from "lucide-react";
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
  mode = "default",
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
  
  // Forçar uma classe CSS que reflita o estado isCollapsed
  React.useEffect(() => {
    console.log("AdminSidebar useEffect - isCollapsed changed to:", isCollapsed);
  }, [isCollapsed]);
  
  // Determinar se o sidebar está à direita baseado na classe
  const isRightSidebar = className?.includes('sidebar-right');

  return (
    <div
      className={`h-full ${isRightSidebar ? 'border-l' : 'border-r'} transition-all duration-300 ease-in-out flex flex-col w-full
        ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"} 
        ${getThemeClasses(theme.theme, "sidebar")} ${className}`}
      data-collapsed={isCollapsed}
      data-testid="admin-sidebar"
      style={{ 
        width: isCollapsed ? '4rem' : '16rem',
        maxWidth: isCollapsed ? '4rem' : '16rem',
        minWidth: isCollapsed ? '4rem' : '16rem',
        overflow: 'visible', // Garantir que o menu expandido não seja cortado
        position: 'relative', // Para posicionamento absoluto do botão de toggle
      }}
    >
      {/* Botão de toggle na própria sidebar (estilo simplificado) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(`Toggle sidebar botão interno (modo: ${mode})`);
          onToggle();
        }}
        className={`absolute sidebar-toggle-btn ${isRightSidebar ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} top-4 z-10 p-2 rounded-lg ${getThemeClasses(theme.theme, 'button.secondary')} shadow-sm hover:shadow-md focus:outline-none`}
        title={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
        data-testid="sidebar-toggle-internal"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
      
      {/* Navigation - com espaço adicional no topo para acomodar o botão quando colapsado */}
      <nav className={`p-4 pt-8 space-y-2 flex-1 overflow-y-auto overflow-x-visible sidebar-scrollbar ${theme.isDark ? 'scrollbar-dark' : 'scrollbar-light'}`}>
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
