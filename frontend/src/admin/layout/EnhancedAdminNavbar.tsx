import React from "react";
import { Link } from "react-router-dom";
import { Bell, Settings, LogOut, Moon, Sun, User, Menu as MenuIcon, ChevronDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeClasses } from "../../design-system";
import { TopNavigation } from "./components/navigation/TopNavigation";
import { useAdminLayout } from "../hooks/useAdminLayout";
import { adminSidebarConfig } from "./components/sidebar/menuConfig";
import { MenuItem, MenuSection, SubMenuItem } from "./components/sidebar/types";

// ================================
// TIPOS
// ================================

interface EnhancedAdminNavbarProps {
  user: any;
  onLogout: () => void;
}

// ================================
// COMPONENTE NAVBAR APRIMORADO COM MODOS DE LAYOUT
// ================================

export const EnhancedAdminNavbar: React.FC<EnhancedAdminNavbarProps> = ({
  user,
  onLogout,
}) => {
  const theme = useTheme();
  const { 
    layoutMode, 
    changeLayoutMode, 
    toggleSidebar, 
    isSidebarVisible, 
    isTopNavigation,
    toggleFloatingSidebar,
    isFloatingMode
  } = useAdminLayout();

  return (
    <div
      className={`h-16 border-b flex items-center justify-between px-6 relative ${getThemeClasses(
        theme.theme,
        "navbar"
      )}`}
    >
      {/* Logo/Title e Menu Toggle */}
      <div className="flex items-center space-x-4">
        {/* Toggle para sidebar quando visível */}
        {(isSidebarVisible || isFloatingMode) && (
          <button
            onClick={isFloatingMode ? toggleFloatingSidebar : toggleSidebar}
            className={`p-2 rounded-lg transition-all ${getThemeClasses(
              theme.theme,
              "button.secondary"
            )}`}
            title="Alternar menu lateral"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        )}
        
        {/* Título do sistema */}
        <h1
          className={`text-xl font-bold ${getThemeClasses(theme.theme, "text.primary")}`}
        >
          SmartGesTI Admin
        </h1>
      </div>
      
      {/* Menu de navegação horizontal quando no modo top - Centro da navbar */}
      {isTopNavigation && (
        <div className="hidden md:flex flex-1 justify-center overflow-visible">
          <TopNavigation />
        </div>
      )}
      
      {/* Menu móvel para modo top em telas pequenas */}
      {isTopNavigation && (
        <div className="md:hidden flex-1 flex justify-end mr-4">
          <div className="relative">
            <button
              onClick={() => document.getElementById('mobile-menu-dropdown')?.classList.toggle('hidden')}
              className={`p-2 rounded-lg transition-all ${
                theme.isDark 
                  ? 'bg-slate-800/50 text-slate-200 hover:bg-slate-700' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
              aria-label="Menu de navegação"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            
            {/* Dropdown móvel com menu de navegação */}
            <div 
              id="mobile-menu-dropdown"
              className={`hidden absolute right-0 mt-2 w-72 rounded-lg shadow-lg z-50 overflow-hidden animate-fadeInDown
                ${theme.isDark 
                  ? 'bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700' 
                  : 'bg-white border border-slate-200 shadow-xl'
                }
              `}
            >
              <div className="py-3 px-2 max-h-[80vh] overflow-y-auto">
                {/* Header do menu móvel */}
                <div className={`px-3 mb-2 pb-2 ${
                  theme.isDark ? 'border-b border-slate-700/50' : 'border-b border-slate-200/70'
                }`}>
                  <div className={`text-sm font-medium ${
                    theme.isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    Menu de Navegação
                  </div>
                </div>
              
                {/* Seções de navegação */}
                <div className="space-y-3">
                  {adminSidebarConfig.sections
                    .filter((section: MenuSection) => section.items.some((item: MenuItem) => item.type !== 'separator'))
                    .map((section: MenuSection) => (
                      <div key={section.id} className="px-2">
                        {/* Título da seção */}
                        {section.label && (
                          <div className={`flex items-center gap-2 text-xs uppercase font-semibold px-2 py-1.5 mb-1.5 ${
                            theme.isDark ? 'text-slate-400 bg-slate-800/50 rounded' : 'text-slate-500 bg-slate-100/70 rounded'
                          }`}>
                            {section.items.some(item => item.type !== 'separator' && 'icon' in item) && (
                              React.createElement(
                                (section.items.find(
                                  item => item.type !== 'separator' && 'icon' in item
                                ) as any)?.icon || 'div',
                                { className: 'w-3.5 h-3.5 opacity-70' }
                              )
                            )}
                            {section.label}
                          </div>
                        )}
                        
                        {/* Itens da seção */}
                        <div className="space-y-0.5">
                          {section.items
                            .filter((item: MenuItem) => item.type !== 'separator')
                            .map((item: MenuItem) => {
                              if (item.type === 'link') {
                                return (
                                  <Link 
                                    key={item.id}
                                    to={item.path || '#'}
                                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                                      theme.isDark 
                                        ? 'text-slate-300 hover:bg-slate-800/80' 
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                    onClick={() => document.getElementById('mobile-menu-dropdown')?.classList.add('hidden')}
                                  >
                                    {item.icon && React.createElement(item.icon, { 
                                      className: `w-4 h-4 mr-2 ${theme.isDark ? 'opacity-70' : ''}` 
                                    })}
                                    {item.label}
                                    
                                    {item.badge && (
                                      <span className={`ml-auto px-1.5 py-0.5 text-xs rounded-full ${
                                        theme.isDark 
                                          ? 'bg-primary-900/50 text-primary-400' 
                                          : 'bg-primary-100 text-primary-700'
                                      }`}>
                                        {item.badge}
                                      </span>
                                    )}
                                  </Link>
                                );
                              }
                              
                              if (item.type === 'submenu') {
                                return (
                                  <div key={item.id} className="mb-1 rounded-md overflow-hidden">
                                    <div 
                                      className={`flex items-center justify-between px-3 py-1.5 text-sm cursor-pointer ${
                                        theme.isDark 
                                          ? 'text-slate-200 hover:bg-slate-800/70' 
                                          : 'text-slate-800 hover:bg-slate-50/80'
                                      }`}
                                      onClick={(e) => {
                                        e.currentTarget.nextElementSibling?.classList.toggle('hidden');
                                      }}
                                    >
                                      <div className="flex items-center">
                                        {item.icon && React.createElement(item.icon, { 
                                          className: `w-4 h-4 mr-2 ${theme.isDark ? 'opacity-80' : ''}`
                                        })}
                                        <span className="font-medium">{item.label}</span>
                                      </div>
                                      <ChevronDown className="w-3.5 h-3.5 transform transition-transform" />
                                    </div>
                                    
                                    <div className={`hidden pl-3 ${
                                      theme.isDark ? 'bg-slate-800/30' : 'bg-slate-50/70'
                                    }`}>
                                      {(item.type === 'submenu' ? item.children : []).map((subItem: SubMenuItem) => (
                                        <Link
                                          key={subItem.id}
                                          to={subItem.path || '#'}
                                          className={`flex items-center px-3 py-1.5 text-sm ${
                                            theme.isDark 
                                              ? 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-300' 
                                              : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-800'
                                          }`}
                                          onClick={() => document.getElementById('mobile-menu-dropdown')?.classList.add('hidden')}
                                        >
                                          {subItem.icon && React.createElement(subItem.icon, { 
                                            className: 'w-3.5 h-3.5 mr-2 opacity-70' 
                                          })}
                                          {subItem.label}
                                          
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
                                );
                              }
                              
                              return null;
                            })}
                        </div>
                      </div>
                    ))}
                </div>
                
                {/* Rodapé do menu móvel */}
                <div className={`mt-4 px-3 pt-3 ${
                  theme.isDark ? 'border-t border-slate-700/50' : 'border-t border-slate-200/70'
                }`}>
                  <div className="flex justify-between">
                    <button 
                      className={`px-3 py-2 rounded-md text-xs font-medium ${
                        theme.isDark 
                          ? 'bg-slate-800 text-slate-400' 
                          : 'bg-slate-100 text-slate-600'
                      }`}
                      onClick={() => document.getElementById('mobile-menu-dropdown')?.classList.add('hidden')}
                    >
                      Fechar Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Botão de configurações - sem controles de layout */}
        <div className="relative group">
          <button
            className={`p-2 rounded-lg transition-all duration-200 ${getThemeClasses(
              theme.theme,
              "button.secondary"
            )}`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={theme.toggleTheme}
          className={`p-2 rounded-lg transition-all duration-200 ${getThemeClasses(
            theme.theme,
            "button.secondary"
          )}`}
          title={theme.isDark ? "Ativar modo claro" : "Ativar modo escuro"}
        >
          {theme.isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <button
          className={`p-2 rounded-lg transition-all duration-200 ${getThemeClasses(
            theme.theme,
            "button.secondary"
          )}`}
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p
              className={`text-sm font-medium ${getThemeClasses(theme.theme, "text.primary")}`}
            >
              {user?.first_name || "Admin"} {user?.last_name || "User"}
            </p>
            <p
              className={`text-xs ${getThemeClasses(theme.theme, "text.secondary")}`}
            >
              {user?.email || "admin@smartgesti.com.br"}
            </p>
          </div>

          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              theme.isDark ? "bg-blue-500/20 backdrop-blur-sm" : "bg-blue-100"
            }`}
          >
            <User
              className={`w-5 h-5 ${
                theme.isDark ? "text-blue-400" : "text-blue-600"
              }`}
            />
          </div>

          <button
            onClick={onLogout}
            className={`p-2 rounded-lg transition-all duration-200 hover:bg-red-500/20 ${getThemeClasses(
              theme.theme,
              "text.muted"
            )} hover:text-red-400`}
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminNavbar;