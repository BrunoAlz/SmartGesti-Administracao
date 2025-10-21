import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../../contexts/ThemeContext";

interface DropdownOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position: {
    top: number;
    left: number;
  };
  width?: number;
}

/**
 * Componente que cria um overlay para os menus dropdown
 * renderizando-os diretamente no body para evitar problemas de z-index
 */
export const DropdownOverlay: React.FC<DropdownOverlayProps> = ({
  isOpen,
  onClose,
  children,
  position,
  width = 180
}) => {
  const theme = useTheme();
  
  // Pega o gradiente de fundo adequado ao tema
  const getMenuBackdrop = () => {
    return theme.isDark 
      ? 'bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700'
      : 'bg-gradient-to-b from-white to-slate-50 shadow-xl border border-slate-200/70';
  };
  
  // Fechar menu quando clicar fora ou pressionar ESC
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      onClose();
    };
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    // Atrasar um pouco o evento para não fechar imediatamente ao clicar para abrir
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }, 100);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Overlay transparente que cobre toda a página para capturar cliques */}
      <div
        className="fixed inset-0 z-[99998]"
        onClick={onClose}
      />
      
      {/* Conteúdo do dropdown */}
      <div
        className={`fixed z-[99999] animate-fadeInFast rounded-lg overflow-hidden ${getMenuBackdrop()}`}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${width}px`,
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

export default DropdownOverlay;