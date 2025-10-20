import React from "react";
import { useThemeClasses } from "../hooks";

// ================================
// TIPOS
// ================================

interface SectionDividerProps {
  title: string;
  icon: React.ReactNode;
  badge?: React.ReactNode | string;
  badgeColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

// ================================
// COMPONENTE SECTION DIVIDER
// ================================

const SectionDivider: React.FC<SectionDividerProps> = ({
  title,
  icon,
  badge,
  badgeColor = 'blue',
  className,
  spacing = 'md'
}) => {
  const { get, cn } = useThemeClasses();
  
  const spacingClasses = {
    sm: 'mb-4',
    md: 'mb-6', 
    lg: 'mb-8'
  };
  
  const iconContainerColors = {
    blue: 'bg-blue-100 dark:bg-blue-500/20',
    green: 'bg-green-100 dark:bg-green-500/20',
    purple: 'bg-purple-100 dark:bg-purple-500/20',
    orange: 'bg-orange-100 dark:bg-orange-500/20',
    red: 'bg-red-100 dark:bg-red-500/20'
  };
  
  const iconColors = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    red: 'text-red-600 dark:text-red-400'
  };
  
  const badgeColors = {
    blue: 'bg-blue-200 text-blue-900 border border-blue-400 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20',
    green: 'bg-green-200 text-green-900 border border-green-400 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/20',
    purple: 'bg-purple-200 text-purple-900 border border-purple-400 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20',
    orange: 'bg-orange-200 text-orange-900 border border-orange-400 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/20',
    red: 'bg-red-200 text-red-900 border border-red-400 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20'
  };
  
  return (
    <div className={cn(spacingClasses[spacing], className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
          iconContainerColors[badgeColor]
        )}>
          <div className={cn("w-4 h-4 flex items-center justify-center", iconColors[badgeColor])}>
            {icon}
          </div>
        </div>
        
        <h2 className={cn("text-lg font-semibold flex-shrink-0", get("text.primary"))}>
          {title}
        </h2>
        
        <div className="flex-1 h-px mx-4 bg-slate-300 dark:bg-white/10"></div>
        
        {badge && (
          <div className={cn(
            "text-sm px-3 py-1.5 rounded-full font-medium flex-shrink-0",
            badgeColors[badgeColor]
          )}>
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};

// ================================
// EXPORT
// ================================

export default SectionDivider;
export { SectionDivider };
export type { SectionDividerProps };