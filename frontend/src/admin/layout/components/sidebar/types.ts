import { LucideIcon } from "lucide-react";

// ================================
// INTERFACES PARA MENU ITEMS
// ================================

export interface BaseMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
  badge?: string | number;
  tooltip?: string;
}

export interface SimpleMenuItem extends BaseMenuItem {
  type: "link";
  path: string;
}

export interface MenuItemWithSubMenu extends BaseMenuItem {
  type: "submenu";
  children: SubMenuItem[];
  defaultExpanded?: boolean;
}

export interface SubMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: LucideIcon;
  disabled?: boolean;
  badge?: string | number;
  tooltip?: string;
}

export interface MenuSeparator {
  type: "separator";
  id: string;
  label?: string;
}

export interface MenuSection {
  id: string;
  label?: string;
  items: MenuItem[];
}

// ================================
// UNION TYPES
// ================================

export type MenuItem = SimpleMenuItem | MenuItemWithSubMenu | MenuSeparator;

// ================================
// SIDEBAR CONFIG
// ================================

export interface SidebarConfig {
  sections: MenuSection[];
  branding?: {
    title: string;
    version?: string;
    logo?: string;
  };
  footer?: {
    showVersion?: boolean;
    customContent?: React.ReactNode;
  };
}

// ================================
// COMPONENT PROPS
// ================================

export interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  config: SidebarConfig;
  className?: string;
}

export interface MenuItemProps {
  item: MenuItem;
  isCollapsed: boolean;
  currentPath: string;
  onItemClick?: (item: MenuItem) => void;
}

export interface SubMenuProps {
  item: MenuItemWithSubMenu;
  isCollapsed: boolean;
  currentPath: string;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onItemClick?: (item: SubMenuItem) => void;
}

export interface SidebarFooterProps {
  isCollapsed: boolean;
  footer?: SidebarConfig["footer"];
}

// ================================
// HOOKS TYPES
// ================================

export interface UseSidebarMenuState {
  expandedMenus: Set<string>;
  toggleExpanded: (menuId: string) => void;
  isExpanded: (menuId: string) => boolean;
  expandAll: () => void;
  collapseAll: () => void;
}
