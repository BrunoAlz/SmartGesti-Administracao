import { useState, useCallback } from "react";
import { MenuItemWithSubMenu, SidebarConfig, UseSidebarMenuState } from "./types";

// ================================
// HOOK PARA GERENCIAR ESTADO DOS SUBMENUS
// ================================

export const useSidebarMenu = (config: SidebarConfig): UseSidebarMenuState => {
  // Inicializar menus expandidos baseado na configuração defaultExpanded
  const getInitialExpandedMenus = (): Set<string> => {
    const expanded = new Set<string>();
    
    config.sections.forEach(section => {
      section.items.forEach(item => {
        if (item.type === "submenu") {
          const submenuItem = item as MenuItemWithSubMenu;
          if (submenuItem.defaultExpanded) {
            expanded.add(submenuItem.id);
          }
        }
      });
    });
    
    return expanded;
  };

  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(getInitialExpandedMenus);

  const toggleExpanded = useCallback((menuId: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  }, []);

  const isExpanded = useCallback((menuId: string) => {
    return expandedMenus.has(menuId);
  }, [expandedMenus]);

  const expandAll = useCallback(() => {
    const allSubmenuIds = new Set<string>();
    
    config.sections.forEach(section => {
      section.items.forEach(item => {
        if (item.type === "submenu") {
          allSubmenuIds.add(item.id);
        }
      });
    });
    
    setExpandedMenus(allSubmenuIds);
  }, [config]);

  const collapseAll = useCallback(() => {
    setExpandedMenus(new Set());
  }, []);

  return {
    expandedMenus,
    toggleExpanded,
    isExpanded,
    expandAll,
    collapseAll,
  };
};

export default useSidebarMenu;
