import React from "react";
import { useThemeClasses } from "../hooks";
import { cn } from "../theme-classes";
import { Loader2, RefreshCw, Zap, Clock, CheckCircle, AlertCircle } from "lucide-react";

// ================================
// TIPOS
// ================================

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  className?: string;
}

interface LoadingDotsProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  className?: string;
}

interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: "text" | "rectangular" | "circular";
  animation?: "pulse" | "wave";
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface LoadingCardProps {
  loading: boolean;
  children: React.ReactNode;
  skeletonCount?: number;
  className?: string;
}

interface LoadingStateProps {
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  error?: string | null;
  empty?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  className?: string;
}

// ================================
// COMPONENTE LOADING SPINNER
// ================================

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "primary",
  className,
}) => {
  const { get } = useThemeClasses();

  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-blue-600 dark:text-blue-400",
    secondary: "text-gray-600 dark:text-gray-400",
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    error: "text-red-600 dark:text-red-400",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2
        className={cn(
          "animate-spin",
          sizeClasses[size],
          colorClasses[color]
        )}
      />
    </div>
  );
};

// ================================
// COMPONENTE LOADING DOTS
// ================================

const LoadingDots: React.FC<LoadingDotsProps> = ({
  size = "md",
  color = "primary",
  className,
}) => {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  const colorClasses = {
    primary: "bg-blue-600 dark:bg-blue-400",
    secondary: "bg-gray-600 dark:bg-gray-400",
    success: "bg-green-600 dark:bg-green-400",
    warning: "bg-yellow-600 dark:bg-yellow-400",
    error: "bg-red-600 dark:bg-red-400",
  };

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div
        className={cn(
          "rounded-full animate-bounce",
          sizeClasses[size],
          colorClasses[color]
        )}
        style={{ animationDelay: "0ms" }}
      />
      <div
        className={cn(
          "rounded-full animate-bounce",
          sizeClasses[size],
          colorClasses[color]
        )}
        style={{ animationDelay: "150ms" }}
      />
      <div
        className={cn(
          "rounded-full animate-bounce",
          sizeClasses[size],
          colorClasses[color]
        )}
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
};

// ================================
// COMPONENTE LOADING SKELETON
// ================================

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = "100%",
  height = "1rem",
  className,
  variant = "rectangular",
  animation = "pulse",
}) => {
  const { get } = useThemeClasses();

  const variantClasses = {
    text: "h-4",
    rectangular: "",
    circular: "rounded-full",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-wave",
  };

  return (
    <div
      className={cn(
        "bg-gray-200 dark:bg-gray-700",
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
};

// ================================
// COMPONENTE LOADING OVERLAY
// ================================

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  message = "Carregando...",
  size = "md",
  className,
}) => {
  const { get } = useThemeClasses();

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <LoadingSpinner size={size} />
            <p className={cn("mt-2 font-medium", get("text.primary"), sizeClasses[size])}>
              {message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ================================
// COMPONENTE LOADING BUTTON
// ================================

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  loadingText = "Carregando...",
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors",
        loading || disabled
          ? "opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
          : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md",
        className
      )}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" color="primary" className="mr-2" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

// ================================
// COMPONENTE LOADING CARD
// ================================

const LoadingCard: React.FC<LoadingCardProps> = ({
  loading,
  children,
  skeletonCount = 3,
  className,
}) => {
  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="space-y-2">
            <LoadingSkeleton width="60%" height="1.5rem" />
            <LoadingSkeleton width="100%" height="1rem" />
            <LoadingSkeleton width="80%" height="1rem" />
          </div>
        ))}
      </div>
    );
  }

  return <>{children}</>;
};

// ================================
// COMPONENTE LOADING STATE
// ================================

const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  children,
  fallback,
  error,
  empty,
  emptyMessage = "Nenhum dado encontrado",
  errorMessage = "Ocorreu um erro ao carregar os dados",
  className,
}) => {
  const { get } = useThemeClasses();

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        {fallback || (
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className={cn("mt-4 text-sm", get("text.secondary"))}>
              Carregando...
            </p>
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className={cn("text-sm font-medium", get("text.primary"))}>
            {errorMessage}
          </p>
          <p className={cn("text-xs mt-1", get("text.secondary"))}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          <p className={cn("text-sm font-medium", get("text.primary"))}>
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// ================================
// COMPONENTE LOADING PROGRESS
// ================================

interface LoadingProgressProps {
  progress: number; // 0-100
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "warning" | "error";
  showPercentage?: boolean;
  className?: string;
}

const LoadingProgress: React.FC<LoadingProgressProps> = ({
  progress,
  size = "md",
  color = "primary",
  showPercentage = true,
  className,
}) => {
  const { get } = useThemeClasses();

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colorClasses = {
    primary: "bg-blue-600 dark:bg-blue-400",
    success: "bg-green-600 dark:bg-green-400",
    warning: "bg-yellow-600 dark:bg-yellow-400",
    error: "bg-red-600 dark:bg-red-400",
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className={cn("w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden", sizeClasses[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            colorClasses[color]
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>Progresso</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
};

// ================================
// COMPONENTE LOADING PULSE
// ================================

interface LoadingPulseProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  className?: string;
}

const LoadingPulse: React.FC<LoadingPulseProps> = ({
  size = "md",
  color = "primary",
  className,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClasses = {
    primary: "bg-blue-600 dark:bg-blue-400",
    secondary: "bg-gray-600 dark:bg-gray-400",
    success: "bg-green-600 dark:bg-green-400",
    warning: "bg-yellow-600 dark:bg-yellow-400",
    error: "bg-red-600 dark:bg-red-400",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "rounded-full animate-pulse",
          sizeClasses[size],
          colorClasses[color]
        )}
      />
    </div>
  );
};

// ================================
// COMPONENTE LOADING WAVE
// ================================

interface LoadingWaveProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  className?: string;
}

const LoadingWave: React.FC<LoadingWaveProps> = ({
  size = "md",
  color = "primary",
  className,
}) => {
  const sizeClasses = {
    sm: "w-1 h-4",
    md: "w-1 h-6",
    lg: "w-1 h-8",
  };

  const colorClasses = {
    primary: "bg-blue-600 dark:bg-blue-400",
    secondary: "bg-gray-600 dark:bg-gray-400",
    success: "bg-green-600 dark:bg-green-400",
    warning: "bg-yellow-600 dark:bg-yellow-400",
    error: "bg-red-600 dark:bg-red-400",
  };

  return (
    <div className={cn("flex items-end space-x-1", className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "rounded-full animate-pulse",
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{
            animationDelay: `${index * 100}ms`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
};

// ================================
// HOOK PARA GERENCIAR LOADING
// ================================

const useLoading = (initialState = false) => {
  const [loading, setLoading] = React.useState(initialState);
  const [error, setError] = React.useState<string | null>(null);

  const startLoading = () => {
    setLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const setLoadingError = (errorMessage: string) => {
    setLoading(false);
    setError(errorMessage);
  };

  const reset = () => {
    setLoading(false);
    setError(null);
  };

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    reset,
  };
};

// ================================
// EXPORTS
// ================================

export default LoadingSpinner;
export {
  LoadingSpinner,
  LoadingDots,
  LoadingSkeleton,
  LoadingOverlay,
  LoadingButton,
  LoadingCard,
  LoadingState,
  LoadingProgress,
  LoadingPulse,
  LoadingWave,
  useLoading,
};
