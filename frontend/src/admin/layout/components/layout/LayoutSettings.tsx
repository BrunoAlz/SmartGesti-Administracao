import React, { useState, useRef, useEffect } from "react";
import {
  Layout,
  MenuSquare,
  SidebarClose,
  SidebarOpen,
  ArrowRightToLine,
  Maximize,
  EyeOff,
  Settings
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

  const layoutOptions = [
    {
      mode: "default" as LayoutMode,
      label: "Padrão",
      description: "Menu lateral expandido",
      icon: SidebarOpen
    },
    {
      mode: "compact" as LayoutMode,
      label: "Compacto",
      description: "Menu com ícones pequenos",
      icon: SidebarClose
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
    },
    {
      mode: "floating" as LayoutMode,
      label: "Flutuante",
      description: "Menu oculto e flutuante",
      icon: Maximize
    },
    {
      mode: "hidden" as LayoutMode,
      label: "Oculto",
      description: "Sem menu lateral",
      icon: EyeOff
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
        title="Configurações de layout"
      >
        <Settings className="w-5 h-5" />
      </button>
      
      <DropdownOverlay
        isOpen={showDropdown}
        onClose={() => setShowDropdown(false)}
        position={dropdownPosition}
        width={320}
      >
        <div className="p-3">
          {/* Cabeçalho */}
          <div className="mb-3 pb-2 border-b border-slate-700/30">
            <div className="flex items-center mb-1">
              <Layout className={`w-4 h-4 mr-2 ${
                theme.isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <h3 className={`text-sm font-medium ${getThemeClasses(theme.theme, "text.primary")}`}>
                Modo de Layout
              </h3>
            </div>
            <p className={`text-xs ${getThemeClasses(theme.theme, "text.secondary")}`}>
              Escolha como deseja visualizar a interface
            </p>
          </div>
          
          {/* Grid de opções de layout */}
          <div className="grid grid-cols-2 gap-2">
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
                  <div className={`p-2 rounded ${
                    option.mode === layoutMode
                      ? theme.isDark
                        ? 'bg-blue-900/50 text-blue-400'
                        : 'bg-blue-100 text-blue-600'
                      : theme.isDark
                        ? 'bg-slate-800/90 text-slate-400'
                        : 'bg-slate-100 text-slate-500'
                  }`}>
                    <option.icon className="w-4 h-4" />
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      option.mode === layoutMode
                        ? theme.isDark
                          ? 'text-blue-400'
                          : 'text-blue-600'
                        : getThemeClasses(theme.theme, "text.primary")
                    }`}>
                      {option.label}
                    </div>
                    <div className={`text-xs ${getThemeClasses(theme.theme, "text.secondary")}`}>
                      {option.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DropdownOverlay>
    </>
  );
};

export default LayoutSettings;