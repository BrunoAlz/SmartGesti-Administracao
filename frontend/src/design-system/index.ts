// ================================
// DESIGN SYSTEM - SmartGesTI
// ================================

// Design Tokens
export { designTokens } from "./tokens";
export type { 
  ColorScale, 
  ColorShade, 
  Spacing, 
  FontSize, 
  FontWeight, 
  BorderRadius, 
  BoxShadow, 
  Breakpoint 
} from "./tokens";

// Theme Classes
export { 
  themeClasses, 
  getThemeClasses, 
  combineThemeClasses, 
  conditionalThemeClasses,
  commonClasses,
  cn,
  responsiveClasses 
} from "./theme-classes";
export type { Theme } from "./theme-classes";

// Hooks
export {
  useThemeClasses,
  useCardClasses,
  useButtonClasses,
  useInputClasses,
  useTextClasses,
  useIconClasses,
  useStatusClasses,
  useLayoutClasses,
  useSidebarClasses,
  useNavbarClasses,
  useAnimationClasses,
  useResponsiveClasses,
  useBreakpoint,
} from "./hooks";

// Components
export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  StatCard,
  FeatureCard,
} from "./components/Card";

export {
  Button,
  IconButton,
  ButtonGroup,
  ActionButton,
  ToggleButton,
  FloatingActionButton,
} from "./components/Button";

export {
  Input,
  Textarea,
  PasswordInput,
  SearchInput,
  InputGroup,
  InputAddon,
} from "./components/Input";

export {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ConfirmModal,
  AlertModal,
  SidebarModal,
  DrawerModal,
  useModal,
} from "./components/Modal";

export {
  Table,
  Pagination,
  TableFilters,
  RowActions,
  useTable,
} from "./components/Table";
