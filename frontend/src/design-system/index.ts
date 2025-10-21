// ================================
// DESIGN SYSTEM - SmartGesTI
// ================================

// Sistema de Tema
export {
  // Tipos
  type Theme,
  
  // Context
  ThemeContext,
  useThemeContext,
  
  // Provider
  ThemeProvider,
  
  // Hooks
  useThemeClasses,
  useCardClasses,
  useButtonClasses,
  useInputClasses,
  useTextClasses,
  useIconClasses,
  useStatusClasses,
  useBadgeClasses,
  useLayoutClasses,
  useSidebarClasses,
  useNavbarClasses,
  useAnimationClasses,
  useBreakpoint,
  
  // Utilitários
  applyTheme,
  getThemeClasses,
  combineThemeClasses,
  conditionalThemeClasses,
  commonClasses,
  cn,
  responsiveClasses,
  
  // Design Tokens
  designTokens,
  type ColorScale,
  type ColorShade,
  type Spacing,
  type FontSize,
  type FontWeight,
  type BorderRadius,
  type BoxShadow,
  type Breakpoint,
  
  // Componentes Base
  componentBaseStyles,
} from './theme';

// Components
export {
  default as Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  StatCard,
  StatCardCentered,
  SectionCard,
  FeatureCard,
} from "./components/Card";

export {
  default as Divider,
} from "./components/Divider";
export type { DividerProps } from "./components/Divider";

export {
  default as SectionDivider,
  SectionDivider as SectionDividerComponent,
} from "./components/SectionDivider";
export type { SectionDividerProps } from "./components/SectionDivider";

export {
  Badge,
  BadgeGroup,
} from "./components/Badge";
export type { BadgeProps } from "./components/Badge";

export {
  Button,
  IconButton,
  ButtonGroup,
  ActionButton,
  ToggleButton,
  FloatingActionButton
} from "./components/Button";
export type { 
  ButtonProps, 
  IconButtonProps, 
  ButtonGroupProps,
  ActionButtonProps,
  ToggleButtonProps,
  FloatingActionButtonProps
} from "./components/Button";
export type { ButtonVariant, BadgeVariant, CardVariant, ComponentSize } from "./components/types";

export {
  default as Input,
  Textarea,
  PasswordInput,
  SearchInput,
  Select,
  Checkbox,
  Radio,
  Switch,
  RadioGroup,
  InputGroup,
  InputAddon,
} from "./components/Input";

export {
  Alert,
  AlertBanner,
} from "./components/Alert";
export type { AlertProps, AlertBannerProps, AlertVariant, AlertSize } from "./components/Alert";

// Modal Components
export {
  useModal,
  CustomModal,
} from "./components/Modal";
export type { ModalVariant, ConfirmModalOptions, AlertModalOptions, CustomModalProps } from "./components/Modal";

export {
  useToast,
} from "./components/Toast";
export type { ToastVariant, CustomToastOptions } from "./components/Toast";

export {
  useNotification,
} from "./hooks/useNotification";
export type { NotificationOptions, ModalNotificationOptions, BannerNotificationOptions } from "./hooks/useNotification";

export {
  Animation,
  Transition,
  Stagger,
  FadeIn,
  SlideIn,
  ScaleIn,
  BounceIn,
  HoverLift,
  HoverGlow,
  TypingAnimation,
  CounterAnimation,
  useAnimation,
  animationUtils,
} from "./components/Animations";

// ================================
// EXPORTS ADICIONAIS
// ================================

// Loading Components
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
} from "./components/Loading";

// Notification Components
export {
  NotificationProvider,
  NotificationContainer,
  NotificationBell,
  NotificationPanel,
  useNotifications,
  useNotificationActions,
} from "./components/Notifications";

// Form Validation Components
export {
  useForm,
  validators,
  FormField,
  FormError,
  FormSummary,
  useFieldValidation,
  validationUtils,
} from "./components/FormValidation";

// Table Components
export {
  Table,
  Pagination,
  TableFilters,
  RowActions,
  useTable,
} from "./components/Table";

