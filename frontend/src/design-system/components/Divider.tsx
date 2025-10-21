import React from 'react';
import { useThemeClasses } from '../hooks';

export interface DividerProps {
  /**
   * Orientação do divisor
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Estilo visual do divisor
   * @default 'solid'
   */
  variant?: 'solid' | 'dotted' | 'dashed';
  
  /**
   * Espaçamento ao redor do divisor
   * @default 'md'
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * Componente Divider - Cria linhas divisórias com suporte a temas claro/escuro
 */
export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'md',
  className,
}: DividerProps) {
  const { get, cn } = useThemeClasses();
  
  const spacingClasses = {
    none: '',
    xs: orientation === 'horizontal' ? 'my-1' : 'mx-1',
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    xl: orientation === 'horizontal' ? 'my-8' : 'mx-8',
  };
  
  // Usar classes com espessura e contraste ajustados para garantir visibilidade
  const variantClass = variant === 'dotted' 
    ? 'border-t-[1px] border-dotted border-[var(--dotted-color)]'
    : variant === 'dashed'
    ? 'border-t-[1px] border-dashed border-[var(--dashed-color)]'
    : orientation === 'horizontal'
    ? 'h-[1px] w-full bg-[var(--divider-color)]' 
    : 'w-[1px] h-full bg-[var(--divider-color)]';
  
  return (
    <div 
      className={cn(
        variantClass,
        spacingClasses[spacing],
        className
      )} 
    />
  );
}

export default Divider;