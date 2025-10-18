// ================================
// COMPONENTES PRINCIPAIS
// ================================
export { AdminSidebar } from "./AdminSidebar";
export { MenuItem } from "./MenuItem";
export { SubMenu } from "./SubMenu";
export { SidebarHeader } from "./SidebarHeader";
export { SidebarFooter } from "./SidebarFooter";

// ================================
// HOOKS
// ================================
export { useSidebarMenu } from "./useSidebarMenu";

// ================================
// CONFIGURAÇÕES
// ================================
export { adminSidebarConfig } from "./menuConfig";

// ================================
// TIPOS E INTERFACES
// ================================
export type {
  SidebarProps,
  SidebarConfig,
  MenuItem as MenuItemType,
  SimpleMenuItem,
  MenuItemWithSubMenu,
  SubMenuItem,
  MenuSeparator,
  MenuSection,
  MenuItemProps,
  SubMenuProps,
  SidebarHeaderProps,
  SidebarFooterProps,
  UseSidebarMenuState,
} from "./types";

// ================================
// EXPORT DEFAULT
// ================================
export { AdminSidebar as default } from "./AdminSidebar";
