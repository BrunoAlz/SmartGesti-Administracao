import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { getThemeClasses } from '../../../../design-system';
import { adminSidebarConfig } from '../../components/sidebar/menuConfig';
import { MenuItem, SimpleMenuItem, MenuItemWithSubMenu, MenuSection } from '../../components/sidebar/types';

// ================================
// COMPONENTE DE NAVEGAÇÃO SUPERIOR ELEGANTE
// ================================

export const TopNavigation: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  
  // Verifica se um item está ativo (rota atual)
  const isActive = (path: string): boolean => {
    return path ? location.pathname === path || location.pathname.startsWith(`${path}/`) : false;
  };
  
  // Verifica se uma seção tem pelo menos um item visível
  const hasVisibleItems = (section: MenuSection): boolean => {
    return section.items.some((item: MenuItem) => item.type !== 'separator');
  };
  
  // Gerencia o hover/clique nas seções
  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    // Resetamos os menus expandidos quando mudamos de seção
    setExpandedMenus(new Set());
  };
  
  // Gerencia a expansão de um submenu
  const toggleSubmenu = (itemId: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };
  
  // Verifica se um submenu está expandido
  const isSubmenuExpanded = (itemId: string): boolean => {
    return expandedMenus.has(itemId);
  };
  
  // Fecha todos os menus ao clicar em um link
  const handleNavigate = () => {
    setActiveSection(null);
    setExpandedMenus(new Set());
  };
  
  // Pega o gradiente de fundo adequado ao tema
  const getMenuBackdrop = () => {
    return theme.isDark 
      ? 'bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700'
      : 'bg-gradient-to-b from-white to-slate-50 shadow-xl border border-slate-200/70';
  };
  
  // Estilo de item ativo
  const getActiveItemStyle = () => {
    return theme.isDark
      ? 'bg-primary-900/30 text-primary-400 border-l-2 border-primary-500'
      : 'bg-primary-50 text-primary-600 border-l-2 border-primary-500';
  };
  
  // Estilo de hover para os itens
  const getHoverStyle = () => {
    return theme.isDark
      ? 'hover:bg-slate-700/50'
      : 'hover:bg-slate-100';
  };

  return (
    <div className="flex items-center justify-center mx-2">
      {/* Navegação principal */}
      <div className="flex items-center gap-1">
        {adminSidebarConfig.sections
          .filter(hasVisibleItems)
          .map(section => (
            <div key={section.id} className="relative group">
              {/* Botão da seção */}
              <button
                onClick={() => toggleSection(section.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                  ${activeSection === section.id
                    ? theme.isDark
                      ? 'bg-slate-800 text-white shadow-md shadow-slate-900/50 border-b border-slate-700'
                      : 'bg-white text-slate-800 shadow-md border-b border-slate-200/70'
                    : theme.isDark
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-white/80'
                  }
                `}
              >
                {/* Ícone da seção (primeiro ícone não-separador encontrado) */}
                {section.items.some(item => item.type !== 'separator' && 'icon' in item) && (
                  React.createElement(
                    (section.items.find(
                      item => item.type !== 'separator' && 'icon' in item
                    ) as any)?.icon || 'div',
                    { className: 'w-4 h-4 mr-2' }
                  )
                )}
                <span className="whitespace-nowrap">{section.label || 'Menu'}</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 ml-1.5 transition-transform duration-300 ${
                    activeSection === section.id ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Mega Menu da seção - só aparece quando a seção estiver ativa */}
              <div 
                className={`absolute left-1/2 transform -translate-x-1/2 mt-1 z-[100] rounded-lg overflow-hidden
                  ${getMenuBackdrop()}
                  ${activeSection === section.id ? 'animate-scaleIn' : 'opacity-0 invisible pointer-events-none'}
                  origin-top min-w-[300px] max-w-[96vw]
                `}
              >
                  <div className="p-3">
                    {/* Título da seção no menu */}
                    <div className={`mb-2 pb-2 px-2 font-medium ${
                      theme.isDark ? 'border-b border-slate-700/70 text-white' : 'border-b border-slate-200 text-slate-700'
                    }`}>
                      {section.label || 'Menu'}
                    </div>
                    
                    {/* Grid de itens/submenus */}
                    <div className="grid grid-cols-1 gap-1">
                      {section.items
                        .filter(item => item.type !== 'separator')
                        .map(item => {
                          // Item com submenu
                          if (item.type === 'submenu') {
                            const submenuItem = item as MenuItemWithSubMenu;
                            const expanded = isSubmenuExpanded(item.id);
                            
                            return (
                              <div key={item.id} className="rounded-md overflow-hidden">
                                {/* Cabeçalho do submenu (clicável) */}
                                <button
                                  onClick={() => toggleSubmenu(item.id)}
                                  className={`w-full flex items-center justify-between p-2 text-left text-sm transition-all
                                    ${theme.isDark 
                                      ? 'hover:bg-slate-700/50 text-slate-200' 
                                      : 'hover:bg-slate-100 text-slate-700'
                                    }
                                    ${expanded ? (theme.isDark ? 'bg-slate-700/30' : 'bg-slate-100/70') : ''}
                                  `}
                                >
                                  <div className="flex items-center">
                                    {submenuItem.icon && React.createElement(submenuItem.icon, { 
                                      className: 'w-4 h-4 mr-2 opacity-80' 
                                    })}
                                    <span>{submenuItem.label}</span>
                                  </div>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                                      expanded ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                                
                                {/* Itens do submenu - animação de expansão */}
                                <div 
                                  className={`overflow-hidden transition-all duration-300 ease-in-out
                                    ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                  `}
                                >
                                  <div className={`pl-4 py-1 ${theme.isDark ? 'bg-slate-800/50' : 'bg-slate-50/70'}`}>
                                    {submenuItem.children.map(subItem => (
                                      <Link
                                        key={subItem.id}
                                        to={subItem.path || '#'}
                                        className={`flex items-center px-2 py-1.5 text-sm rounded-md my-0.5 transition-colors
                                          ${isActive(subItem.path) 
                                            ? getActiveItemStyle()
                                            : theme.isDark 
                                              ? 'text-slate-300 ' + getHoverStyle()
                                              : 'text-slate-700 ' + getHoverStyle()
                                          }
                                        `}
                                        onClick={handleNavigate}
                                      >
                                        {subItem.icon && React.createElement(subItem.icon, { 
                                          className: `w-3.5 h-3.5 mr-2 ${
                                            isActive(subItem.path)
                                              ? 'text-primary-400'
                                              : 'opacity-70'
                                          }` 
                                        })}
                                        <span className="truncate">{subItem.label}</span>
                                        
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
                              </div>
                            );
                          }
                          
                          // Item normal (link simples)
                          if (item.type === 'link') {
                            const linkItem = item as SimpleMenuItem;
                            return (
                              <Link
                                key={item.id}
                                to={linkItem.path || '#'}
                                className={`flex items-center p-2 text-sm rounded-md transition-colors
                                  ${isActive(linkItem.path) 
                                    ? getActiveItemStyle()
                                    : theme.isDark 
                                      ? 'text-slate-300 ' + getHoverStyle()
                                      : 'text-slate-700 ' + getHoverStyle()
                                  }
                                `}
                                onClick={handleNavigate}
                              >
                                {linkItem.icon && React.createElement(linkItem.icon, { 
                                  className: `w-4 h-4 mr-2 ${
                                    isActive(linkItem.path)
                                      ? 'text-primary-400'
                                      : 'opacity-70'
                                  }` 
                                })}
                                <span>{linkItem.label}</span>
                                
                                {/* Badge se existir */}
                                {linkItem.badge && (
                                  <span className={`ml-auto px-1.5 py-0.5 text-xs rounded-full ${
                                    theme.isDark 
                                      ? 'bg-primary-900/50 text-primary-400' 
                                      : 'bg-primary-100 text-primary-700'
                                  }`}>
                                    {linkItem.badge}
                                  </span>
                                )}
                              </Link>
                            );
                          }
                          
                          return null;
                        })}
                    </div>
                  </div>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopNavigation;