import React, { forwardRef, useState, useId } from "react";
import { useTextClasses, useThemeClasses } from "../hooks";
import { cn } from "../theme/classes";
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
  size = "sm",
  variant = "default",
  state = "default",
  fullWidth = false,
  className,
  disabled,
  ...props
}, ref) => {
  // Classes base para inputs seguindo o padrão do template
  const { get } = useThemeClasses();
  const baseInputClasses = cn(
    "w-full border transition-all duration-300 ease-in-out focus:outline-none",
    "design-system-input", // Classe específica para prioridade CSS
    get("input"),
    "focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
  );
  
  // Determinar estado visual
  const visualState = error ? "error" : success ? "success" : state;
  
  // Classes de tamanho
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-base",
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
    error: "!border-red-500 focus:!border-red-500 focus:!ring-red-500/30",
    success: "!border-green-500 focus:!border-green-500 focus:!ring-green-500/30",
    warning: "!border-yellow-500 focus:!border-yellow-500 focus:!ring-yellow-500/30",
  };
  
  // Classes de posicionamento dos ícones
  const leftIconClasses = cn(
    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
  );
  const rightIconClasses = cn(
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
  );
  
  // Classes de texto
  const labelClasses = useTextClasses("primary", "text-sm font-medium mb-1");
  const helperClasses = useTextClasses("muted", "text-xs mt-1");
  const errorClasses = cn("text-xs mt-1 text-red-600 dark:text-red-400");
  const successClasses = cn("text-xs mt-1 text-green-600 dark:text-green-400");
  
  const isDisabled = disabled || loading;
  const inputId = useId();
  
  return (
    <div className={cn("relative", fullWidth && "w-full", className)}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={cn(labelClasses, "block cursor-pointer")}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className={leftIconClasses}>
            {React.isValidElement(leftIcon) 
              ? React.cloneElement(leftIcon as React.ReactElement, { 
                  className: cn("w-4 h-4", (leftIcon as any).props?.className) 
                })
              : leftIcon
            }
          </div>
        )}
        
        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            baseInputClasses,
            sizeClasses[size],
            variantClasses[variant],
            stateClasses[visualState],
            leftIcon ? "pl-10" : "",
            (rightIcon || loading) ? "pr-10" : "",
            isDisabled ? "opacity-50 cursor-not-allowed" : "",
            "rounded-md"
          )}
          disabled={isDisabled}
          {...props}
        />
        
        {/* Right Icon / Loading / State Icon */}
        <div className={rightIconClasses}>
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : rightIcon ? (
            React.isValidElement(rightIcon) 
              ? React.cloneElement(rightIcon as React.ReactElement, { 
                  className: cn("w-4 h-4", (rightIcon as any).props?.className) 
                })
              : rightIcon
          ) : visualState === "error" ? (
            <AlertCircle className="w-4 h-4 text-red-500" />
          ) : visualState === "success" ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
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
  size = "sm",
  variant = "default",
  state = "default",
  fullWidth = false,
  className,
  disabled,
  ...props
}, ref) => {
  // Classes base para textarea seguindo o padrão do template
  const { get } = useThemeClasses();
  const baseInputClasses = cn(
    "w-full border transition-all duration-300 ease-in-out focus:outline-none",
    "design-system-input", // Classe específica para prioridade CSS
    get("input"),
    "focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
  );
  
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
    error: "!border-red-500 focus:!border-red-500 focus:!ring-red-500/30",
    success: "!border-green-500 focus:!border-green-500 focus:!ring-green-500/30",
    warning: "!border-yellow-500 focus:!border-yellow-500 focus:!ring-yellow-500/30",
  };
  
  // Classes de texto
  const labelClasses = useTextClasses("primary", "text-sm font-medium mb-1");
  const helperClasses = useTextClasses("muted", "text-xs mt-1");
  const errorClasses = cn("text-xs mt-1 text-red-600 dark:text-red-400");
  const successClasses = cn("text-xs mt-1 text-green-600 dark:text-green-400");
  
  const isDisabled = disabled || loading;
  const textareaId = useId();
  
  return (
    <div className={cn("relative", fullWidth && "w-full", className)}>
      {/* Label */}
      {label && (
        <label htmlFor={textareaId} className={cn(labelClasses, "block cursor-pointer")}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Textarea Container */}
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            baseInputClasses,
            sizeClasses[size],
            variantClasses[variant],
            stateClasses[visualState],
            isDisabled ? "opacity-50 cursor-not-allowed" : "",
            "rounded-md resize-vertical min-h-[80px]"
          )}
          disabled={isDisabled}
          {...props}
        />
        
        {/* Loading Indicator */}
        {loading && (
          <div className="absolute right-3 top-3">
            <Loader2 className="w-4 h-4 animate-spin text-gray-500 dark:text-gray-300" />
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
// COMPONENTE SELECT
// ================================

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outlined";
  state?: "default" | "error" | "success" | "warning";
  fullWidth?: boolean;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  helperText,
  error,
  success,
  loading = false,
  size = "sm",
  variant = "default",
  state = "default",
  fullWidth = false,
  placeholder,
  children,
  className,
  disabled,
  ...props
}, ref) => {
  // Classes base para select seguindo o padrão do template
  const { get } = useThemeClasses();
  const baseInputClasses = cn(
    "w-full border transition-all duration-300 ease-in-out focus:outline-none",
    "design-system-input", // Classe específica para prioridade CSS
    get("input"),
    "focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
  );
  
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
    error: "!border-red-500 focus:!border-red-500 focus:!ring-red-500/30",
    success: "!border-green-500 focus:!border-green-500 focus:!ring-green-500/30",
    warning: "!border-yellow-500 focus:!border-yellow-500 focus:!ring-yellow-500/30",
  };
  
  // Classes de texto
  const labelClasses = useTextClasses("primary", "text-sm font-medium mb-1");
  const helperClasses = useTextClasses("muted", "text-xs mt-1");
  const errorClasses = cn("text-xs mt-1 text-red-600 dark:text-red-400");
  const successClasses = cn("text-xs mt-1 text-green-600 dark:text-green-400");
  
  const isDisabled = disabled || loading;
  const selectId = useId();
  
  return (
    <div className={cn("relative", fullWidth && "w-full", className)}>
      {/* Label */}
      {label && (
        <label htmlFor={selectId} className={cn(labelClasses, "block cursor-pointer")}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Select Container */}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            baseInputClasses,
            sizeClasses[size],
            variantClasses[variant],
            stateClasses[visualState],
            loading ? "pr-10" : "pr-8",
            isDisabled ? "opacity-50 cursor-not-allowed" : "",
            "rounded-md appearance-none cursor-pointer"
          )}
          disabled={isDisabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        
        {/* Dropdown Arrow / Loading */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-gray-500 dark:text-gray-300" />
          ) : (
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
        
        {/* State Icon */}
        {visualState === "error" && !loading && (
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
        )}
        {visualState === "success" && !loading && (
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <CheckCircle className="w-4 h-4 text-green-500" />
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

Select.displayName = "Select";

// ================================
// COMPONENTE CHECKBOX
// ================================

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined";
  indeterminate?: boolean;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  helperText,
  error,
  size = "md",
  variant = "default",
  indeterminate = false,
  className,
  disabled,
  ...props
}, ref) => {
  const { get, cn } = useThemeClasses();
  
  // Classes de tamanho
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  
  const labelSizeClasses = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  };
  
  // Classes de variante
  const variantClasses = {
    default: cn(
      "rounded border-2 transition-all duration-200",
      get("input"),
      "focus:ring-1 focus:ring-blue-500/20",
      "checked:bg-blue-600 checked:border-blue-600",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ),
    outlined: cn(
      "rounded border-2 bg-transparent transition-all duration-200",
      "border-gray-300 dark:border-white/20",
      "focus:ring-1 focus:ring-blue-500/20",
      "checked:bg-blue-600 checked:border-blue-600",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ),
  };
  
  // Classes de texto
  const labelClasses = useTextClasses("primary", cn("font-medium", labelSizeClasses[size]));
  const helperClasses = useTextClasses("muted", "text-xs mt-1");
  const errorClasses = cn("text-xs mt-1 text-red-600 dark:text-red-400");
  
  React.useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);
  
  const checkboxId = useId();
  
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-start space-x-3">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(
            variantClasses[variant],
            sizeClasses[size],
            error ? "!border-red-500 focus:!border-red-500 focus:!ring-red-500/30" : "",
            "mt-0.5"
          )}
          disabled={disabled}
          {...props}
        />
        
        <div className="flex-1">
          {label && (
            <label htmlFor={checkboxId} className={cn(labelClasses, "block cursor-pointer")}>
              {label}
            </label>
          )}
          
          {helperText && !error && <p className={helperClasses}>{helperText}</p>}
          {error && <p className={errorClasses}>{error}</p>}
        </div>
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

// ================================
// COMPONENTE RADIO
// ================================

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined";
  className?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  helperText,
  error,
  size = "md",
  variant = "default",
  className,
  disabled,
  ...props
}, ref) => {
  const { get, cn } = useThemeClasses();
  
  // Classes de tamanho
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  
  const labelSizeClasses = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  };
  
  // Classes de variante
  const variantClasses = {
    default: cn(
      "rounded-full border-2 transition-all duration-200",
      get("input"),
      "focus:ring-1 focus:ring-blue-500/20",
      "checked:bg-blue-600 checked:border-blue-600",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ),
    outlined: cn(
      "rounded-full border-2 bg-transparent transition-all duration-200",
      "border-gray-300 dark:border-white/20",
      "focus:ring-1 focus:ring-blue-500/20",
      "checked:bg-blue-600 checked:border-blue-600",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ),
  };
  
  // Classes de texto
  const labelClasses = useTextClasses("primary", cn("font-medium", labelSizeClasses[size]));
  const helperClasses = useTextClasses("muted", "text-xs mt-1");
  const errorClasses = cn("text-xs mt-1 text-red-600 dark:text-red-400");
  
  const radioId = useId();
  
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-start space-x-3">
        <input
          ref={ref}
          id={radioId}
          type="radio"
          className={cn(
            variantClasses[variant],
            sizeClasses[size],
            error ? "!border-red-500 focus:!border-red-500 focus:!ring-red-500/30" : "",
            "mt-0.5"
          )}
          disabled={disabled}
          {...props}
        />
        
        <div className="flex-1">
          {label && (
            <label htmlFor={radioId} className={cn(labelClasses, "block cursor-pointer")}>
              {label}
            </label>
          )}
          
          {helperText && !error && <p className={helperClasses}>{helperText}</p>}
          {error && <p className={errorClasses}>{error}</p>}
        </div>
      </div>
    </div>
  );
});

Radio.displayName = "Radio";

// ================================
// COMPONENTE SWITCH
// ================================

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  helperText,
  size = "md",
  variant = "default",
  className,
  disabled,
  checked,
  ...props
}, ref) => {
  const { cn } = useThemeClasses();
  
  // Classes de tamanho
  const switchSizes = {
    sm: {
      container: "w-8 h-4",
      thumb: "w-3 h-3",
      translate: "translate-x-4",
    },
    md: {
      container: "w-11 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-5",
    },
    lg: {
      container: "w-14 h-8",
      thumb: "w-6 h-6",
      translate: "translate-x-6",
    },
  };
  
  const labelSizeClasses = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  };
  
  // Classes de variante
  const variantClasses = {
    default: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    danger: "bg-red-600",
  };
  
  // Classes de texto
  const labelClasses = useTextClasses("primary", cn("font-medium", labelSizeClasses[size]));
  const helperClasses = useTextClasses("muted", "text-xs mt-1");
  
  const { container, thumb, translate } = switchSizes[size];
  const switchId = useId();
  
  const handleToggle = () => {
    if (!disabled && props.onChange) {
      const event = {
        target: { checked: !checked }
      } as React.ChangeEvent<HTMLInputElement>;
      props.onChange(event);
    }
  };
  
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          className={cn(
            "relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
            container,
            "focus:outline-none focus:ring-1 focus:ring-blue-500/20",
            checked 
              ? variantClasses[variant]
              : "bg-gray-200 dark:bg-white/20",
            disabled ? "opacity-50 cursor-not-allowed" : ""
          )}
          onClick={handleToggle}
        >
          <span
            className={cn(
              "pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0 transition duration-200 ease-in-out",
              thumb,
              checked ? translate : "translate-x-0"
            )}
          />
        </button>
        
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={handleToggle}
          {...props}
        />
        
        <div className="flex-1">
          {label && (
            <label htmlFor={switchId} className={cn(labelClasses, "block cursor-pointer")}>
              {label}
            </label>
          )}
          
          {helperText && <p className={helperClasses}>{helperText}</p>}
        </div>
      </div>
    </div>
  );
});

Switch.displayName = "Switch";

// ================================
// COMPONENTE RADIO GROUP
// ================================

interface RadioGroupProps {
  children: React.ReactNode;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  name,
  value,
  onChange,
  label,
  helperText,
  error,
  className,
}) => {
  const labelClasses = useTextClasses("primary", "text-sm font-medium mb-2");
  const helperClasses = useTextClasses("muted", "text-xs mt-1");
  const errorClasses = cn("text-xs mt-1 text-red-600 dark:text-red-400");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      {label && <div className={cn(labelClasses, "block")}>{label}</div>}
      
      <div className="space-y-2">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Radio) {
            return React.cloneElement(child as React.ReactElement<RadioProps>, {
              ...child.props, // Preserve existing props first
              name, // Override with the group name for mutual exclusion
              checked: child.props.value === value,
              onChange: handleChange,
            });
          }
          return child;
        })}
      </div>
      
      {error && <p className={errorClasses}>{error}</p>}
      {helperText && !error && <p className={helperClasses}>{helperText}</p>}
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
  Select,
  Checkbox,
  Radio,
  Switch,
  RadioGroup,
  InputGroup, 
  InputAddon 
};
