# SmartGesTI - AI Coding Agent Instructions

## 🎯 Project Overview
SmartGesTI is an administrative system built with **Django 5.2.5** backend and **React 18 + TypeScript** frontend, featuring a comprehensive design system with integrated dark/light mode support.

## 🎨 UI-KIT & Design System - TOP PRIORITY

### Critical Pattern: Always Use Design System
ALL components must use the centralized design system in `/frontend/src/design-system/`:

```typescript
// ✅ CORRECT - Always import from design system
import { Button, Card, Badge } from '@/design-system';
import { useThemeClasses, useButtonClasses } from '@/design-system/hooks';

// ❌ WRONG - Never create standalone styled components
```

### Theme Integration Requirements
Every new component MUST support both light and dark modes:

```typescript
// Required pattern for all components
function MyComponent() {
  const { get, cn, theme, isDark } = useThemeClasses();
  
  return (
    <div className={cn(
      get("card"),           // Auto light/dark classes
      get("text.primary"),   // Theme-aware text
      "p-4 rounded-lg"       // Additional styling
    )}>
      {/* content */}
    </div>
  );
}
```

### Design Token System
- **Colors**: Use `designTokens.colors` from `/frontend/src/design-system/tokens.ts`
- **Theme Classes**: Reference `/frontend/src/design-system/theme-classes.ts` for all styling
- **Components**: Extend existing patterns in `/frontend/src/design-system/components/`

### Component Variants Pattern
Follow the established variant system across all components:

```typescript
// Button variants (from Button.tsx)
type ButtonVariant = 
  | "primary" | "secondary" | "ghost" | "danger" 
  | "success" | "warning" | "info" | "purple" | "pink"
  | "indigo" | "orange" | "teal"
  | "primary-gradient" | "success-gradient" | "warning-gradient"
  | "danger-gradient" | "info-gradient" | "purple-gradient"

// Badge variants (from Badge.tsx)  
type BadgeVariant = 
  | "success" | "danger" | "warning" | "info" 
  | "purple" | "gray" | "primary"

// Card variants (from Card.tsx)
type CardVariant = 
  | "default" | "elevated" | "bordered" | "interactive"

// Size variants (consistent across components)
type ComponentSize = "sm" | "md" | "lg"
```

## 🏗️ Architecture & Project Structure

### Frontend Structure (React + TypeScript)
```
frontend/src/
├── design-system/          # Central UI kit - ALWAYS USE THIS
│   ├── components/         # Reusable components (Button, Card, Badge, etc.)
│   ├── hooks.ts           # Theme hooks (useThemeClasses, useButtonClasses)
│   ├── theme-classes.ts   # Light/dark mode class mappings
│   └── tokens.ts          # Design tokens (colors, spacing, typography)
├── admin/                 # Admin interface
│   ├── contexts/          # React contexts (ThemeContext)
│   ├── pages/ui-kit/      # UI kit showcase pages
│   └── layout/            # Layout components
└── App.tsx
```

### Backend Structure (Django)
```
backend/
├── apps/usuarios/         # User management app
├── configurations/       # Django settings (dev.py, prod.py, base.py)
└── core/                 # Shared utilities (errors, middlewares, validations)
```

### Import Path Patterns
- Use `@/` alias for all imports: `import { Button } from '@/design-system';`
- Components: `@/design-system/components/ComponentName`
- Hooks: `@/design-system/hooks`
- Admin pages: `@/admin/pages/`

## 🔧 Development Workflows

### Adding New UI Components
1. **Start with design system**: Check `/frontend/src/design-system/components/` for existing patterns
2. **Use theme hooks**: Always implement `useThemeClasses()` for light/dark support
3. **Follow variant pattern**: Create consistent variant props like existing Button component
4. **Export from index**: Add to `/frontend/src/design-system/index.ts`
5. **Update UI-kit showcase**: Add examples in `/frontend/src/admin/pages/ui-kit/`

### Theme Development
- **Context**: Theme state managed in `/frontend/src/admin/contexts/ThemeContext.tsx`
- **Classes**: All theme-aware classes defined in `/frontend/src/design-system/theme-classes.ts`
- **Hooks**: Use `useThemeClasses()` for accessing theme utilities in components
- **Persistence**: Theme preference saved to localStorage as `admin-theme`

### Running the Project
```bash
# Backend (Django)
cd backend && python manage.py runserver

# Frontend (React)
cd frontend && npm start

# Docker (Recommended)
docker-compose up --build
```

## 📋 Code Conventions

### Component Structure
```typescript
// Standard component pattern
interface ComponentProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function Component({ variant = "primary", size = "md", className, children }: ComponentProps) {
  const classes = useButtonClasses(variant, size, className);
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}
```

### Styling Requirements
- **Never use inline styles** - use design system classes
- **Always support dark mode** - use `useThemeClasses()` hook
- **Use consistent spacing** - reference `designTokens.spacing`
- **Follow color system** - use semantic color tokens (primary, success, warning, etc.)

### File Naming
- Components: `PascalCase.tsx` (e.g., `Button.tsx`, `UserCard.tsx`)
- Hooks: `camelCase.ts` (e.g., `useThemeClasses.ts`)
- Pages: `kebab-case/` directories with `index.tsx`
- UI-Kit pages: `[Component]UIKit.tsx` (e.g., `ButtonsUIKit.tsx`, `BadgesUIKit.tsx`)
- Documentation: `[component].md` in both `/design-system/docs/ui/` and `/ui-kit/docs/`

### Component Export Pattern
Always export from `/frontend/src/design-system/index.ts`:
```typescript
// Components
export { default as Button } from './components/Button';
export { default as Badge } from './components/Badge';
export { default as Card } from './components/Card';

// Hooks  
export { useButtonClasses, useBadgeClasses, useCardClasses } from './hooks';

// Types
export type { ButtonVariant, BadgeVariant, CardVariant } from './components/types';
```

## 🎨 UI-Kit Showcase Integration
When creating new components, add showcase examples in `/frontend/src/admin/pages/ui-kit/`:

### UI-Kit Component Pattern
Follow the existing showcase structure:
```typescript
// Example: /frontend/src/admin/pages/ui-kit/ButtonsUIKit.tsx
import { ComponentShowcase } from './components/ComponentShowcase';

export function ButtonsUIKit() {
  return (
    <ComponentShowcase
      title="Sistema de Botões"
      description="Componentes de botão com variantes e temas"
    >
      {/* Interactive examples with all variants */}
      {/* Code snippets for implementation */}
      {/* Light/dark mode demonstrations */}
    </ComponentShowcase>
  );
}
```

### Documentation Structure
- **Interactive examples** showing all variants in `/frontend/src/admin/pages/ui-kit/[Component]UIKit.tsx`
- **Component docs** in `/frontend/src/design-system/docs/ui/[component].md`
- **UI-Kit docs** in `/frontend/src/admin/pages/ui-kit/docs/[component].md`
- **Showcase wrapper** using `ComponentShowcase` from `/frontend/src/admin/pages/ui-kit/components/ComponentShowcase.tsx`

### Required UI-Kit Integration Steps
1. Create `[Component]UIKit.tsx` with interactive examples
2. Add documentation in both `/design-system/docs/ui/` and `/ui-kit/docs/`
3. Export from `/frontend/src/admin/pages/ui-kit/index.ts`
4. Test in both light and dark themes
5. Include code examples and variant demonstrations

## ⚠️ Critical Requirements
1. **NEVER create components outside the design system** - extend existing ones instead
2. **ALL components must support light/dark modes** - use `useThemeClasses()`
3. **Follow established variant patterns** - maintain consistency across components
4. **Use semantic color tokens** - avoid hardcoded colors
5. **Test in both themes** - verify appearance in light and dark modes

## 🔍 Key Files to Reference

### Design System Core
- `/frontend/src/design-system/README.md` - Design system overview
- `/frontend/src/design-system/hooks.ts` - Theme utilities and hooks
- `/frontend/src/design-system/theme-classes.ts` - Light/dark mode class mappings
- `/frontend/src/design-system/tokens.ts` - Design tokens (colors, spacing, typography)
- `/frontend/src/design-system/index.ts` - Central exports

### Component Examples & Patterns
- `/frontend/src/design-system/components/Button.tsx` - Button component with all variants
- `/frontend/src/design-system/components/Badge.tsx` - Badge component pattern
- `/frontend/src/design-system/components/Card.tsx` - Card component system
- `/frontend/src/design-system/components/Input.tsx` - Input field patterns
- `/frontend/src/design-system/components/Modal.tsx` - Modal component example

### Documentation References
- `/frontend/src/design-system/docs/ui/buttons.md` - Complete button documentation
- `/frontend/src/design-system/docs/ui/badges.md` - Badge system documentation  
- `/frontend/src/design-system/docs/ui/cards.md` - Card components documentation

### UI-Kit Showcase (Live Examples)
- `/frontend/src/admin/pages/ui-kit/ButtonsUIKit.tsx` - Interactive button examples
- `/frontend/src/admin/pages/ui-kit/BadgesUIKit.tsx` - Interactive badge examples
- `/frontend/src/admin/pages/ui-kit/CardsUIKit.tsx` - Interactive card examples
- `/frontend/src/admin/pages/ui-kit/components/ComponentShowcase.tsx` - Showcase wrapper pattern
- `/frontend/src/admin/pages/ui-kit/docs/buttons.md` - UI-Kit button documentation

### Theme & Context Management
- `/frontend/src/admin/contexts/ThemeContext.tsx` - Theme state management
- `/frontend/tailwind.config.js` - Tailwind configuration with custom tokens