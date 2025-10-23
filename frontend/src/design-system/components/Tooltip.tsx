import React, { useState, useRef } from "react";
import { useThemeClasses } from "../hooks";

export type TooltipVariant = "default" | "info" | "success" | "danger" | "warning";
export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  variant?: TooltipVariant;
  position?: TooltipPosition;
  className?: string;
  delay?: number;
  disabled?: boolean;
  trigger?: "hover" | "click";
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  variant = "default",
  position = "top",
  className = "",
  delay = 250,
  disabled = false,
  trigger = "hover",
}) => {
  const { get, cn, isDark } = useThemeClasses();
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  // Classes de variantes
  const variantClasses = {
    default: cn(
      isDark ? "bg-blue-900 border border-blue-700" : get("background.tooltip"),
      get("text.primary"),
      "shadow-lg"
    ),
    info: cn(get("background.info"), get("text.primary"), "shadow-lg"),
    success: cn(get("background.success"), get("text.primary"), "shadow-lg"),
    danger: cn(get("background.danger"), get("text.primary"), "shadow-lg"),
    warning: cn(get("background.warning"), get("text.primary"), "shadow-lg"),
  };

  // Classes de posição
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  // Handlers para hover/focus
  const showTooltip = () => {
    if (disabled) return;
    if (trigger === "hover") {
      timeoutRef.current = setTimeout(() => setVisible(true), delay);
    }
  };
  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    if (trigger === "click") {
      setVisible((v) => !v);
    }
  };

  // Close on outside click when trigger is 'click'
  React.useEffect(() => {
    if (trigger !== "click") return;

    const onDocClick = (ev: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(ev.target as Node)) return;
      setVisible(false);
    };

    if (visible) {
      document.addEventListener("click", onDocClick);
    }

    return () => document.removeEventListener("click", onDocClick);
  }, [visible, trigger]);

  return (
    <span
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onClick={handleToggleClick}
    >
      {children}
      {visible && (
        <span
          className={cn(
            "absolute z-50 px-3 py-2 rounded text-xs font-medium transition-opacity duration-200 pointer-events-none",
            variantClasses[variant],
            positionClasses[position],
            className
          )}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
