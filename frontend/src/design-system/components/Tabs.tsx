import React, { useState } from 'react';
import { useThemeClasses } from '../hooks';

export type TabVariant = 
  | 'default' 
  | 'underline'
  | 'pills'
  | 'boxed'
  | 'gradient';

export type TabColor = 
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'purple'
  | 'pink'
  | 'indigo'
  | 'teal';

export interface TabProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export interface TabsProps {
  variant?: TabVariant;
  color?: TabColor;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactElement<TabProps>[];
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export const Tabs: React.FC<TabsProps> = ({ 
  variant = 'default',
  color = 'primary',
  size = 'md',
  className = '',
  children 
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const { cn } = useThemeClasses();

  const getTabListClasses = () => {
    return cn(
      'flex gap-1 relative',
      variant === 'pills' && 'bg-gray-100 dark:bg-gray-800 rounded-lg p-1',
      variant === 'boxed' && 'border-b border-gray-200 dark:border-gray-700',
      className
    );
  };

  const getTabClasses = (isActive: boolean) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    };

    const colorClasses = {
      primary: isActive && (variant === 'gradient' 
        ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500'
        : 'bg-blue-500 dark:bg-blue-600'),
      secondary: isActive && 'bg-gray-500 dark:bg-gray-600',
      info: isActive && (variant === 'gradient'
        ? 'bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500'
        : 'bg-blue-500 dark:bg-blue-600'),
      success: isActive && (variant === 'gradient'
        ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500'
        : 'bg-green-500 dark:bg-green-600'),
      warning: isActive && (variant === 'gradient'
        ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500'
        : 'bg-yellow-500 dark:bg-yellow-600'),
      danger: isActive && (variant === 'gradient'
        ? 'bg-gradient-to-r from-red-500 via-rose-500 to-pink-500'
        : 'bg-red-500 dark:bg-red-600'),
      purple: isActive && (variant === 'gradient'
        ? 'bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500'
        : 'bg-purple-500 dark:bg-purple-600'),
      pink: isActive && (variant === 'gradient'
        ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500'
        : 'bg-pink-500 dark:bg-pink-600'),
      indigo: isActive && (variant === 'gradient'
        ? 'bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500'
        : 'bg-indigo-500 dark:bg-indigo-600'),
      teal: isActive && (variant === 'gradient'
        ? 'bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500'
        : 'bg-teal-500 dark:bg-teal-600')
    };

    return cn(
      // Base styles
      'flex items-center gap-2 font-medium rounded-lg transition-all duration-200',
      sizeClasses[size],
      
      // Variant specific styles
      variant === 'default' && cn(
        'border border-transparent',
        isActive 
          ? cn('text-white', colorClasses[color])
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      ),
      
      variant === 'underline' && cn(
        'border-b-2',
        isActive 
          ? cn('border-current text-current', `text-${color}-500`)
          : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
      ),
      
      variant === 'pills' && cn(
        isActive 
          ? cn('text-white', colorClasses[color])
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      ),
      
      variant === 'boxed' && cn(
        'border-b-2 -mb-px',
        isActive 
          ? cn(`border-${color}-500 text-${color}-500`)
          : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
      ),
      
      variant === 'gradient' && cn(
        isActive 
          ? cn('text-white', colorClasses[color])
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      )
    );
  };

  return (
    <div className="w-full">
      {/* Tab List */}
      <div className={getTabListClasses()} role="tablist">
        {React.Children.map(children, (child, index) => (
          <button
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tab-panel-${index}`}
            className={getTabClasses(activeTab === index)}
            onClick={() => setActiveTab(index)}
          >
            {child.props.icon && (
              <span className="text-current">{child.props.icon}</span>
            )}
            {child.props.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {React.Children.map(children, (child, index) => (
          <div
            role="tabpanel"
            id={`tab-panel-${index}`}
            className={cn(
              'transition-all duration-200',
              activeTab === index ? 'opacity-100' : 'opacity-0 hidden'
            )}
          >
            {child.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};