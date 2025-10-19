import React from "react";
import { useCardClasses, useTextClasses } from "../hooks";
import { cn } from "../theme-classes";

// ================================
// TIPOS
// ================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
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

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  padding = "md",
  hover = false,
  onClick,
}) => {
  const cardClasses = useCardClasses();
  
  const variantClasses = {
    default: "",
    elevated: "shadow-lg",
    outlined: "border-2",
    filled: "bg-opacity-50",
  };
  
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  };
  
  const hoverClasses = hover ? "hover:scale-105 hover:shadow-xl cursor-pointer" : "";
  
  return (
    <div
      className={cn(
        cardClasses,
        variantClasses[variant],
        paddingClasses[padding],
        hoverClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
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
  const titleClasses = useTextClasses("primary", "text-lg font-semibold");
  const subtitleClasses = useTextClasses("secondary", "text-sm");
  
  return (
    <div className={cn("flex items-start justify-between mb-4", className)}>
      <div className="flex-1">
        {title && <h3 className={titleClasses}>{title}</h3>}
        {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
        {children}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
};

// ================================
// COMPONENTE CARD CONTENT
// ================================

const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex-1", className)}>
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
  return (
    <div className={cn("mt-4 pt-4 border-t border-gray-200 dark:border-white/5", className)}>
      {children}
    </div>
  );
};

// ================================
// COMPONENTE STAT CARD (PARA DASHBOARD)
// ================================

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  className,
  onClick,
}) => {
  const titleClasses = useTextClasses("secondary", "text-sm font-medium mb-1");
  const valueClasses = useTextClasses("primary", "text-3xl font-bold mb-2");
  
  const changeClasses = {
    positive: "text-green-400",
    negative: "text-red-400", 
    neutral: "text-gray-400",
  };
  
  return (
    <Card 
      hover={!!onClick}
      onClick={onClick}
      className={cn("transition-all duration-200", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={titleClasses}>{title}</p>
          <p className={valueClasses}>{value}</p>
          {change && (
            <p className={cn("text-sm", changeClasses[changeType])}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
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
export { CardHeader, CardContent, CardFooter, StatCard, FeatureCard };
