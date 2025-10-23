import React, { useState, useRef } from "react";
import {
  Layout,
  MenuSquare,
  SidebarClose,
  SidebarOpen,
  ArrowRightToLine,
  Maximize,
  EyeOff,
  Settings,
  Moon,
  Sun,
  PaintBucket,
  Palette,
  Monitor,
  Languages,
  Bell,
  BellOff,
  UserCog,
  Lock,
  Key
} from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { LayoutMode, useAdminLayout } from "../../../hooks/useAdminLayout";
import { getThemeClasses } from "../../../../design-system";
import DropdownOverlay from "../sidebar/DropdownOverlay";

// ================================
// COMPONENTE DE CONFIGURAÇÃO DE LAYOUT
// ================================

export const LayoutSettings: React.FC = () => {
  const theme = useTheme();
  const { layoutMode, changeLayoutMode } = useAdminLayout();
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Configurar a posição do dropdown quando o botão é clicado
  const handleShowDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 5,
        left: Math.max(10, rect.left - 280), // Posicionar à esquerda do botão, com pelo menos 10px da borda
      });
      setShowDropdown(true);
    }
  };

  // Opções de layout
  const layoutOptions = [
    {
      mode: "default" as LayoutMode,
      label: "Padrão",
      description: "Menu lateral expandido",
      icon: SidebarOpen
    },
    {
      mode: "right" as LayoutMode,
      label: "Direita",
      description: "Menu lateral à direita",
      icon: ArrowRightToLine
    },
    {
      mode: "top" as LayoutMode,
      label: "Superior",
      description: "Menu na barra superior",
      icon: MenuSquare
    }
  ];
  
  // Opções de tema
  const themeOptions = [
    {
      id: 'light',
      label: 'Claro',
      description: 'Tema padrão claro',
      icon: Sun
    },
    {
      id: 'dark',
      label: 'Escuro',
      description: 'Tema escuro noturno',
      icon: Moon
    },
    {
      id: 'system',
      label: 'Sistema',
      description: 'Seguir configuração do sistema',
      icon: Monitor
    }
  ];
  
  // Opções de personalização
  const customizationOptions = [
    {
      id: 'colors',
      label: 'Cores',
      description: 'Personalizar cores do sistema',
      icon: Palette
    },
    {
      id: 'language',
      label: 'Idioma',
      description: 'Alterar idioma da interface',
      icon: Languages
    }
  ];
  
  // Opções de notificação
  const notificationOptions = [
    {
      id: 'all',
      label: 'Todas',
      description: 'Receber todas as notificações',
      icon: Bell
    },
    {
      id: 'important',
      label: 'Importantes',
      description: 'Apenas notificações importantes',
      icon: BellOff
    }
  ];
  
  // Opções de segurança
  const securityOptions = [
    {
      id: 'profile',
      label: 'Perfil',
      description: 'Configurações de conta',
      icon: UserCog
    },
    {
      id: 'security',
      label: 'Segurança',
      description: 'Configurações de segurança',
      icon: Lock
    },
    {
      id: 'api',
      label: 'API Keys',
      description: 'Gerenciar chaves de API',
      icon: Key
    }
  ];

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleShowDropdown}
        className={`p-2 rounded-lg transition-all duration-200 ${getThemeClasses(
          theme.theme,
          "button.secondary"
        )}`}
        title="Configurações do sistema"
      >
        <Settings className="w-5 h-5" />
      </button>
      
      <DropdownOverlay
        isOpen={showDropdown}
        onClose={() => setShowDropdown(false)}
        position={dropdownPosition}
        width={380}
      >
        <div className={`p-4 max-h-[85vh] overflow-y-auto ${theme.isDark ? 'scrollbar-dark' : 'scrollbar-light'}`}>
          {/* Cabeçalho principal */}
          <div className="mb-4 pb-2 border-b border-slate-700/30">
            <div className="flex items-center mb-1">
              <Settings className={`w-5 h-5 mr-2 ${
                theme.isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <h3 className={`text-base font-medium ${getThemeClasses(theme.theme, "text.primary")}`}>
                Configurações do Sistema
              </h3>
            </div>
            <p className={`text-xs ${getThemeClasses(theme.theme, "text.secondary")}`}>
              Personalize sua experiência no SmartGesTI
            </p>
          </div>
          
          {/* Seção de Layout */}
          <div className="mb-5">
            <div className="flex items-center mb-3">
              <Layout className={`w-4 h-4 mr-2 ${
                theme.isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <h3 className={`text-sm font-medium ${getThemeClasses(theme.theme, "text.primary")}`}>
                Modo de Layout
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-2">
              {layoutOptions.map((option) => (
                <div
                  key={option.mode}
                  onClick={() => {
                    changeLayoutMode(option.mode);
                    setShowDropdown(false);
                  }}
                  className={`rounded-md p-2.5 cursor-pointer transition-all duration-200 
                    ${option.mode === layoutMode
                      ? theme.isDark 
                        ? 'bg-blue-900/30 border border-blue-700/50' 
                        : 'bg-blue-50 border border-blue-200/70'
                      : theme.isDark
                        ? 'bg-slate-800/70 border border-slate-700/50 hover:bg-slate-800'
                        : 'bg-white border border-slate-200/70 hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div className={`p-2.5 rounded ${
                      option.mode === layoutMode
                        ? theme.isDark
                          ? 'bg-blue-900/50 text-blue-400'
                          : 'bg-blue-100 text-blue-600'
                        : theme.isDark
                          ? 'bg-slate-800/90 text-slate-400'
                          : 'bg-slate-100 text-slate-500'
                    }`}>
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-3">
                      <div className={`text-xs font-medium ${
                        option.mode === layoutMode
                          ? theme.isDark
                            ? 'text-blue-400'
                            : 'text-blue-600'
                          : getThemeClasses(theme.theme, "text.primary")
                      }`}>
                        {option.label}
                      </div>
                      <div className={`text-[10px] ${getThemeClasses(theme.theme, "text.secondary")}`}>
                        {option.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Seção de Tema */}
          <div className="mb-5 pt-4 border-t border-slate-700/30">
            <div className="flex items-center mb-3">
              <PaintBucket className={`w-4 h-4 mr-2 ${
                theme.isDark ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <h3 className={`text-sm font-medium ${getThemeClasses(theme.theme, "text.primary")}`}>
                Tema
              </h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-2">
              {themeOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    if (option.id === 'dark' && !theme.isDark) {
                      theme.toggleTheme();
                    } else if (option.id === 'light' && theme.isDark) {
                      theme.toggleTheme();
                    }
                  }}
                  className={`rounded-md p-2 cursor-pointer transition-all duration-200 
                    ${(option.id === 'dark' && theme.isDark) || (option.id === 'light' && !theme.isDark)
                      ? theme.isDark 
                        ? 'bg-purple-900/30 border border-purple-700/50' 
                        : 'bg-purple-50 border border-purple-200/70'
                      : theme.isDark
                        ? 'bg-slate-800/70 border border-slate-700/50 hover:bg-slate-800'
                        : 'bg-white border border-slate-200/70 hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="flex flex-col items-center text-center p-1">
                    <div className={`p-2 rounded-full mb-1 ${
                      (option.id === 'dark' && theme.isDark) || (option.id === 'light' && !theme.isDark)
                        ? theme.isDark
                          ? 'bg-purple-900/50 text-purple-400'
                          : 'bg-purple-100 text-purple-600'
                        : theme.isDark
                          ? 'bg-slate-800/90 text-slate-400'
                          : 'bg-slate-100 text-slate-500'
                    }`}>
                      <option.icon className="w-7 h-7" />
                    </div>
                    <div className={`text-xs font-medium ${
                      (option.id === 'dark' && theme.isDark) || (option.id === 'light' && !theme.isDark)
                        ? theme.isDark
                          ? 'text-purple-400'
                          : 'text-purple-600'
                        : getThemeClasses(theme.theme, "text.primary")
                    }`}>
                      {option.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Seção de Personalização */}
          <div className="mb-5 pt-4 border-t border-slate-700/30">
            <div className="flex items-center mb-3">
              <Palette className={`w-4 h-4 mr-2 ${
                theme.isDark ? 'text-green-400' : 'text-green-600'
              }`} />
              <h3 className={`text-sm font-medium ${getThemeClasses(theme.theme, "text.primary")}`}>
                Personalização
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-2">
              {customizationOptions.map((option) => (
                <div
                  key={option.id}
                  className={`rounded-md p-2.5 cursor-pointer transition-all duration-200 
                    ${theme.isDark
                      ? 'bg-slate-800/70 border border-slate-700/50 hover:bg-slate-800'
                      : 'bg-white border border-slate-200/70 hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded ${
                      theme.isDark
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-3">
                      <div className={`text-xs font-medium ${getThemeClasses(theme.theme, "text.primary")}`}>
                        {option.label}
                      </div>
                      <div className={`text-[10px] ${getThemeClasses(theme.theme, "text.secondary")}`}>
                        {option.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Seção de Notificações */}
          <div className="mb-5 pt-4 border-t border-slate-700/30">
            <div className="flex items-center mb-3">
              <Bell className={`w-4 h-4 mr-2 ${
                theme.isDark ? 'text-amber-400' : 'text-amber-600'
              }`} />
              <h3 className={`text-sm font-medium ${getThemeClasses(theme.theme, "text.primary")}`}>
                Notificações
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-2">
              {notificationOptions.map((option) => (
                <div
                  key={option.id}
                  className={`rounded-md p-2.5 cursor-pointer transition-all duration-200 
                    ${theme.isDark
                      ? 'bg-slate-800/70 border border-slate-700/50 hover:bg-slate-800'
                      : 'bg-white border border-slate-200/70 hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded ${
                      theme.isDark
                        ? 'bg-amber-900/30 text-amber-400'
                        : 'bg-amber-100 text-amber-600'
                    }`}>
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-3">
                      <div className={`text-xs font-medium ${getThemeClasses(theme.theme, "text.primary")}`}>
                        {option.label}
                      </div>
                      <div className={`text-[10px] ${getThemeClasses(theme.theme, "text.secondary")}`}>
                        {option.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Seção de Segurança */}
          <div className="pt-4 border-t border-slate-700/30">
            <div className="flex items-center mb-3">
              <Lock className={`w-4 h-4 mr-2 ${
                theme.isDark ? 'text-red-400' : 'text-red-600'
              }`} />
              <h3 className={`text-sm font-medium ${getThemeClasses(theme.theme, "text.primary")}`}>
                Segurança & Conta
              </h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {securityOptions.map((option) => (
                <div
                  key={option.id}
                  className={`rounded-md p-2 cursor-pointer transition-all duration-200 
                    ${theme.isDark
                      ? 'bg-slate-800/70 border border-slate-700/50 hover:bg-slate-800'
                      : 'bg-white border border-slate-200/70 hover:bg-slate-50'
                    }
                  `}
                >
                  <div className="flex flex-col items-center text-center p-1">
                    <div className={`p-2 rounded-full mb-1 ${
                      theme.isDark
                        ? 'bg-red-900/30 text-red-400'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      <option.icon className="w-7 h-7" />
                    </div>
                    <div className={`text-xs font-medium ${getThemeClasses(theme.theme, "text.primary")}`}>
                      {option.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DropdownOverlay>
    </>
  );
};

export default LayoutSettings;