import React, { useState, useRef, useEffect } from 'react';
import { useThemeClasses } from '../hooks';
import { ButtonVariant } from './types';

export interface ActionMenuProps {
  content: React.ReactNode;
  children: React.ReactNode;
  variant?: ButtonVariant;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  mode?: 'click' | 'fixed';
  glass?: boolean;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  content,
  children,
  variant = 'default',
  position = 'bottom',
  className = '',
  mode = 'click',
  glass = false,
}) => {
  const { get, cn } = useThemeClasses();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Classes base para o container do menu
  const baseClasses = cn(
    'absolute z-50 rounded-lg shadow-lg transition-all duration-200 transform opacity-0 scale-95 pointer-events-none',
    glass ? 'backdrop-blur-md bg-opacity-90' : '',
    variant.includes('gradient') 
      ? get(`button.gradient.${variant}`)
      : get(`button.solid.${variant}`),
    isOpen && 'opacity-100 scale-100 pointer-events-auto',
    position === 'top' && 'left-0 bottom-full mb-2',
    position === 'bottom' && 'left-0 top-full mt-2',
    position === 'left' && 'right-full top-0 mr-2',
    position === 'right' && 'left-full top-0 ml-2',
    className
  );

  // Manipulador de clique fora para fechar
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (mode === 'click') {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, mode]);

  // Manipulador de toggle
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === 'fixed') {
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Trigger */}
      <div onClick={handleToggle} className="cursor-pointer">
        {children}
      </div>

      {/* Menu Content */}
      <div className={baseClasses}>
        {content}
      </div>
    </div>
  );
};