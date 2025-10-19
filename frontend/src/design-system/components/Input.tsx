import React, { forwardRef, useState } from "react";
import { useInputClasses, useTextClasses, useIconClasses } from "../hooks";
import { cn } from "../theme-classes";
import { Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

// ================================
// TIPOS
// ================================

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outlined";
  state?: "default" | "error" | "success" | "warning";
  fullWidth?: boolean;
  className?: string;
}

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outlined";
  state?: "default" | "error" | "success" | "warning";
  fullWidth?: boolean;
  className?: string;
}

interface PasswordInputProps extends Omit<InputProps, 'type'> {
  showPasswordToggle?: boolean;
}

interface SearchInputProps extends Omit<InputProps, 'type'> {
  onSearch?: (value: string) => void;
  searchIcon?: boolean;
}

// ================================
// COMPONENTE INPUT PRINCIPAL
// ================================

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  success,
  loading = false,
  leftIcon,
  rightIcon,
  size = "md",
  variant = "default",
  state = "default",
  fullWidth = false,
  className,
  disabled,
  ...props
}, ref) => {
  const inputClasses = useInputClasses();
  
  // Determinar estado visual
  const visualState = error ? "error" : success ? "success" : state;
  
  // Classes de tamanho
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };
  
  // Classes de variante
  const variantClasses = {
    default: "",
    filled: "bg-gray-100 dark:bg-white/10",
    outlined: "border-2",
  };
  
  // Classes de estado
  const stateClasses = {
    default: "",
    error: "border-red-500 focus:border-red-500 focus:ring-red-500",
    success: "border-green-500 focus:border-green-500 focus:ring-green-500",
    warning: "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500",
  };
  
  // Classes de ícone
  const iconSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "md";
  const leftIconClasses = useIconClasses("primary", iconSize, "absolute left-3 top-1/2 transform -translate-y-1/2");
  const rightIconClasses = useIconClasses("primary", iconSize, "absolute right-3 top-1/2 transform -translate-y-1/2");
  
  // Classes de texto
  const labelClasses = useTextClasses("primary", "text-sm font-medium mb-1");
  const helperClasses = useTextClasses("muted", "text-xs mt-1");
  const errorClasses = cn("text-xs mt-1 text-red-600 dark:text-red-400");
  const successClasses = cn("text-xs mt-1 text-green-600 dark:text-green-400");
  
  const isDisabled = disabled || loading;
  
  return (
    <div className={cn("relative", fullWidth && "w-full", className)}>
      {/* Label */}
      {label && (
        <label className={cn(labelClasses, "block")}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className={leftIconClasses}>
            {leftIcon}
          </div>
        )}
        
        {/* Input */}
        <input
          ref={ref}
          className={cn(
            inputClasses,
            sizeClasses[size],
            variantClasses[variant],
            stateClasses[visualState],
            leftIcon ? "pl-10" : "",
            (rightIcon || loading) ? "pr-10" : "",
            isDisabled ? "opacity-50 cursor-not-allowed" : "",
            fullWidth ? "w-full" : "",
            "rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          )}
          disabled={isDisabled}
          {...props}
        />
        
        {/* Right Icon / Loading / State Icon */}
        <div className={rightIconClasses}>
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : rightIcon ? (
            rightIcon
          ) : visualState === "error" ? (
            <AlertCircle className="text-red-500" />
          ) : visualState === "success" ? (
            <CheckCircle className="text-green-500" />
          ) : null}
        </div>
      </div>
      
      {/* Helper Text / Error / Success */}
      {error && <p className={errorClasses}>{error}</p>}
      {success && !error && <p className={successClasses}>{success}</p>}
      {helperText && !error && !success && <p className={helperClasses}>{helperText}</p>}
    </div>
  );
});

Input.displayName = "Input";

// ================================
// COMPONENTE TEXTAREA
// ================================

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  helperText,
  error,
  success,
  loading = false,
  size = "md",
  variant = "default",
  state = "default",
  fullWidth = false,
  className,
  disabled,
  ...props
}, ref) => {
  const inputClasses = useInputClasses();
  
  // Determinar estado visual
  const visualState = error ? "error" : success ? "success" : state;
  
  // Classes de tamanho
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };
  
  // Classes de variante
  const variantClasses = {
    default: "",
    filled: "bg-gray-100 dark:bg-white/10",
    outlined: "border-2",
  };
  
  // Classes de estado
  const stateClasses = {
    default: "",
    error: "border-red-500 focus:border-red-500 focus:ring-red-500",
    success: "border-green-500 focus:border-green-500 focus:ring-green-500",
    warning: "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500",
  };
  
  // Classes de texto
  const labelClasses = useTextClasses("primary", "text-sm font-medium mb-1");
  const helperClasses = useTextClasses("muted", "text-xs mt-1");
  const errorClasses = cn("text-xs mt-1 text-red-600 dark:text-red-400");
  const successClasses = cn("text-xs mt-1 text-green-600 dark:text-green-400");
  
  const isDisabled = disabled || loading;
  
  return (
    <div className={cn("relative", fullWidth && "w-full", className)}>
      {/* Label */}
      {label && (
        <label className={cn(labelClasses, "block")}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Textarea Container */}
      <div className="relative">
        <textarea
          ref={ref}
          className={cn(
            inputClasses,
            sizeClasses[size],
            variantClasses[variant],
            stateClasses[visualState],
            isDisabled ? "opacity-50 cursor-not-allowed" : "",
            fullWidth ? "w-full" : "",
            "rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-vertical min-h-[80px]"
          )}
          disabled={isDisabled}
          {...props}
        />
        
        {/* Loading Indicator */}
        {loading && (
          <div className="absolute right-3 top-3">
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>
      
      {/* Helper Text / Error / Success */}
      {error && <p className={errorClasses}>{error}</p>}
      {success && !error && <p className={successClasses}>{success}</p>}
      {helperText && !error && !success && <p className={helperClasses}>{helperText}</p>}
    </div>
  );
});

Textarea.displayName = "Textarea";

// ================================
// COMPONENTE PASSWORD INPUT
// ================================

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  showPasswordToggle = true,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Input
      ref={ref}
      type={showPassword ? "text" : "password"}
      rightIcon={
        showPasswordToggle ? (
          <button
            type="button"
            onClick={togglePassword}
            className="focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        ) : undefined
      }
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";

// ================================
// COMPONENTE SEARCH INPUT
// ================================

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  onSearch,
  searchIcon = true,
  rightIcon,
  ...props
}, ref) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(e.currentTarget.value);
    }
  };
  
  return (
    <Input
      ref={ref}
      type="search"
      leftIcon={searchIcon ? <SearchIcon /> : undefined}
      rightIcon={rightIcon}
      onKeyPress={handleKeyPress}
      {...props}
    />
  );
});

SearchInput.displayName = "SearchInput";

// ================================
// COMPONENTE SEARCH ICON
// ================================

const SearchIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

// ================================
// COMPONENTE INPUT GROUP
// ================================

interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ children, className }) => {
  return (
    <div className={cn("flex", className)}>
      {children}
    </div>
  );
};

// ================================
// COMPONENTE INPUT ADDON
// ================================

interface InputAddonProps {
  children: React.ReactNode;
  position?: "left" | "right";
  className?: string;
}

const InputAddon: React.FC<InputAddonProps> = ({ 
  children, 
  position = "left", 
  className 
}) => {
  const addonClasses = cn(
    "px-3 py-2 border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-sm",
    position === "left" ? "rounded-l-md border-r-0" : "rounded-r-md border-l-0",
    className
  );
  
  return (
    <div className={addonClasses}>
      {children}
    </div>
  );
};

// ================================
// EXPORTS
// ================================

export default Input;
export { 
  Textarea, 
  PasswordInput, 
  SearchInput, 
  InputGroup, 
  InputAddon 
};
