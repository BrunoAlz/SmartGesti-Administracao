import React from "react";
import { useTextClasses, useThemeClasses } from "../hooks";
import { cn } from "../theme/classes";

// ================================
// TIPOS
// ================================

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  border?: boolean;
  elevation?: 0 | 1 | 2;
  interactive?: boolean;
  as?: React.ElementType;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

// ================================
// COMPONENTE CARD PRINCIPAL
// ================================

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  padding = "md",
  hover = false,
  border = true,
  elevation = 0,
  interactive = false,
  as: Component = "div",
  onClick,
  ...props
}) => {
  const { get, cn } = useThemeClasses();
  
  const baseClasses = "rounded-lg transition-all duration-200";
  
  const cardBaseClasses = get("card") || "bg-white dark:bg-gray-900";
  const borderClasses = border ? `border ${get("border.secondary")}` : "";
  
  const variantClasses = {
    default: cn(cardBaseClasses, "shadow-sm shadow-slate-200/50 dark:shadow-md hover:shadow-md hover:shadow-slate-300/50 dark:hover:shadow-lg"),
    elevated: cn(cardBaseClasses, "shadow-md shadow-slate-300/50 dark:shadow-lg hover:shadow-lg hover:shadow-slate-400/50 dark:hover:shadow-xl"),
    outlined: cn(cardBaseClasses, "border-2 shadow-sm shadow-slate-200/40 dark:shadow-md hover:shadow-md hover:shadow-slate-300/50 dark:hover:shadow-lg"),
    filled: cn(cardBaseClasses, "bg-opacity-50 shadow-sm shadow-slate-200/40 dark:shadow-md hover:shadow-md hover:shadow-slate-300/50 dark:hover:shadow-lg"),
  };  const shadowClasses = {
    0: "",
    1: "shadow-md hover:shadow-lg",
    2: "shadow-lg hover:shadow-xl",
  };
  
  const paddingClasses = {
    none: "",
    sm: "p-2",
    md: "p-3",
    lg: "p-6",
  };

  const hoverClasses = hover ? "hover:bg-slate-100/70 dark:hover:bg-white/10 hover:scale-[1.02] transition-all duration-200" : "";
  const interactiveClasses = interactive ? "cursor-pointer" : "";  return (
    <Component
      className={cn(
        baseClasses,
        variantClasses[variant],
        borderClasses,
        shadowClasses[elevation],
        paddingClasses[padding],
        hoverClasses,
        interactiveClasses,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

// ================================
// COMPONENTE CARD HEADER
// ================================

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  title,
  subtitle,
  action,
}) => {
  const { cn, get } = useThemeClasses();
  const titleClasses = useTextClasses("primary", "text-base font-semibold");
  const subtitleClasses = useTextClasses("secondary", "text-xs");
  
  return (
    <div className={cn(`flex items-start justify-between pb-2 border-b ${get("border.subtle")}`, className)}>
      <div className="flex-1">
        {title && <h3 className={titleClasses}>{title}</h3>}
        {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
        {children}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
};

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { cn, get } = useThemeClasses();
  return <h3 className={cn("text-base font-semibold", get("text.primary"), className)}>{children}</h3>;
};

const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { cn, get } = useThemeClasses();
  return <p className={cn("text-sm", get("text.secondary"), className)}>{children}</p>;
};

// ================================
// COMPONENTE CARD CONTENT
// ================================

const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
}) => {
  const { cn } = useThemeClasses();
  return (
    <div className={cn("p-3", className)}>
      {children}
    </div>
  );
};

// ================================
// COMPONENTE CARD FOOTER
// ================================

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
}) => {
  const { cn, get } = useThemeClasses();
  return (
    <div className={cn(`p-3 border-t ${get("border.subtle")}`, className)}>
      {children}
    </div>
  );
};

// ================================
// COMPONENTE STAT CARD (PARA DASHBOARD)
// ================================

interface StatCardProps {
  title: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ReactElement;
  iconColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted';
  iconClassName?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  isLoading?: boolean;
  align?: 'start' | 'center';
  size?: 'sm' | 'md';
  border?: boolean;
  className?: string;
  onClick?: () => void;
}

const iconColorMap = (get: (k: string) => string) => ({
  primary: 'text-blue-600 dark:text-blue-400',
  success: 'text-emerald-600 dark:text-emerald-400', 
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-rose-600 dark:text-rose-400',
  info: 'text-sky-600 dark:text-sky-400',
  muted: get('text.secondary')
});

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconColor,
  iconClassName,
  change,
  changeType = "neutral",
  isLoading = false,
  align = 'start',
  size = 'md',
  border = true,
  className,
  onClick,
}) => {
  const { cn, get } = useThemeClasses();
  
  // Clone icon with appropriate classes, preserving existing className
  const iconNode = icon ? React.cloneElement(icon, {
    className: cn(
      // Size based on card size - smaller icons
      size === 'sm' ? 'w-4 h-4' : 'w-5 h-5',
      // Apply semantic color only if iconColor is defined
      iconColor ? iconColorMap(get)[iconColor] : '',
      // NEVER force text-* by default here; let existing className win
      icon.props.className,
      iconClassName
    )
  }) : null;
  
  const changeColor = 
    changeType === 'positive' ? 'text-emerald-600 dark:text-emerald-400' :
    changeType === 'negative' ? 'text-rose-600 dark:text-rose-400' :
    get('text.secondary');
    
  const contentAlign = align === 'center' ? 'flex-col items-center text-center' : 'flex-row items-center';
  const gap = size === 'sm' ? 'gap-1.5' : 'gap-2';
  const valueSize = size === 'sm' ? 'text-base' : 'text-lg';
  
  if (isLoading) {
    return (
      <Card border={border} className={cn(className)} padding="none">
        <CardContent className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 w-20 bg-slate-200 dark:bg-white/10 rounded animate-pulse mb-2" />
            <div className="h-6 w-12 bg-slate-300 dark:bg-white/20 rounded animate-pulse" />
          </div>
          <div className="w-6 h-6 rounded-md bg-slate-200 dark:bg-white/10 animate-pulse" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card
      border={border}
      hover={!!onClick}
      interactive={!!onClick}
      onClick={onClick}
      className={cn(className)}
      padding="none"
    >
      <CardContent className={cn('flex', contentAlign, gap)}>
        {align === 'center' && iconNode && (
          <div className="flex items-center justify-center mb-1">
            {iconNode}
          </div>
        )}
        <div className="flex-1">
          <div className={cn('text-xs font-medium mb-0.5', get('text.secondary'))}>
            {title}
          </div>
          <div className={cn(valueSize, 'font-bold mb-0.5', get('text.primary'))}>
            {value}
          </div>
          {change && (
            <div className={cn('text-xs font-medium', changeColor)}>
              {change}
            </div>
          )}
        </div>
        {align === 'start' && iconNode && (
          <div className="shrink-0">
            {iconNode}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// ================================
// COMPONENTE STAT CARD CENTRALIZADO
// ================================

const StatCardCentered: React.FC<Omit<StatCardProps, 'align' | 'size'>> = (props) => {
  return <StatCard align="center" size="sm" {...props} />;
};

// ================================
// COMPONENTE SECTION CARD
// ================================

interface SectionCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  border?: boolean;
  children: React.ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  actions,
  border = true,
  children,
  className
}) => {
  const { cn } = useThemeClasses();
  return (
    <Card border={border} className={cn(className)} padding="none">
      <CardHeader className="flex items-start justify-between gap-2 p-4 pb-3">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {actions}
      </CardHeader>
      <CardContent className="px-4 pb-4">{children}</CardContent>
    </Card>
  );
};

// ================================
// COMPONENTE FEATURE CARD (PARA LANDING)
// ================================

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits?: string[];
  color?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  benefits = [],
  color = "from-blue-500 to-cyan-500",
  className,
}) => {
  const titleClasses = useTextClasses("primary", "text-xl font-semibold mb-2");
  const descriptionClasses = useTextClasses("secondary", "text-base mb-4");
  const benefitClasses = useTextClasses("muted", "text-sm");
  
  return (
    <Card 
      variant="elevated"
      hover
      className={cn("group", className)}
    >
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      
      <h3 className={titleClasses}>{title}</h3>
      <p className={descriptionClasses}>{description}</p>
      
      {benefits.length > 0 && (
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className={cn(benefitClasses, "flex items-center")}>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              {benefit}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

// ================================
// EXPORTS
// ================================

export default Card;
export { 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
  StatCard, 
  StatCardCentered, 
  SectionCard, 
  FeatureCard 
};
