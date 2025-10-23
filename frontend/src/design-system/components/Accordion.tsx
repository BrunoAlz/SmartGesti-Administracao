import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useThemeClasses } from "../hooks";

// ================================
// TIPOS
// ================================

export type AccordionVariant = 
  | "default" | "bordered" | "ghost" | "elevated";

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  variant?: AccordionVariant;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  items: {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }[];
  variant?: AccordionVariant;
  defaultOpen?: string[];
  allowMultiple?: boolean;
  className?: string;
}

// ================================
// COMPONENTE ACCORDION ITEM
// ================================

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  variant = "default",
  className = "",
  titleClassName = "",
  contentClassName = "",
  icon,
}) => {
  const { get, cn, theme } = useThemeClasses();
  
  // Estilos para diferentes variantes
  const variantClasses = {
    default: cn(
      "border-b",
      get("border.primary"),
      "last:border-b-0",
    ),
    bordered: cn(
      "border rounded-lg my-2",
      get("border.primary"),
    ),
    ghost: cn(
      "bg-transparent hover:bg-opacity-5",
      get("hover.background"),
    ),
    elevated: cn(
      "rounded-lg my-2 shadow-sm",
      get("background.card"),
    ),
  };

  return (
    <div className={cn("overflow-hidden", variantClasses[variant], className)}>
      <button
        className={cn(
          "flex items-center justify-between w-full p-4 text-left transition-colors",
          get("text.primary"),
          isOpen ? get("background.active") : get("background.hover-light"),
          "hover:bg-opacity-5",
          titleClassName
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="font-medium">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 flex-shrink-0" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <div 
          className={cn(
            "p-4 pt-0",
            get("text.secondary"),
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// ================================
// COMPONENTE ACCORDION
// ================================

export const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = "default",
  defaultOpen = [],
  allowMultiple = false,
  className = "",
}) => {
  const { cn } = useThemeClasses();
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const handleToggle = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((itemId) => itemId !== id));
    } else {
      if (allowMultiple) {
        setOpenItems([...openItems, id]);
      } else {
        setOpenItems([id]);
      }
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openItems.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
          variant={variant}
          icon={item.icon}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;