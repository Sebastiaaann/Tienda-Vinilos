# AGENTS.md - Development Guidelines for Tienda de Vinilos

## Project Overview
This is a Next.js 14 e-commerce application for a vinyl record store, built with TypeScript, Tailwind CSS, shadcn/ui components, and Zustand for state management. The app uses the App Router and focuses on vinyl record sales with a shopping cart system.

## Build, Lint, and Test Commands

### Development
```bash
npm run dev        # Start development server (Next.js dev server)
next dev           # Alternative direct command
```

### Production Build
```bash
npm run build      # Build for production
next build         # Alternative direct command
npm run start      # Start production server
next start         # Alternative direct command
```

### Code Quality
```bash
npm run lint       # Run ESLint (uses Next.js ESLint config)
next lint          # Alternative direct command
```

### Testing
**Note**: No test framework is currently configured. When adding tests:
```bash
# Future test commands (to be added):
npm run test       # Run all tests
npm run test:watch # Run tests in watch mode
npm run test file.spec.ts  # Run single test file (framework-specific)
```

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode**: Enabled - all TypeScript strict checks are required
- **Path aliases**: Use `@/` for imports from project root
- **JSX**: Preserve mode (not transformed to `.js`)
- **Module resolution**: Bundler mode for modern compatibility

### Import Organization
```typescript
// 1. React imports first
import * as React from "react"
import { useState, useEffect } from "react"

// 2. Third-party libraries (alphabetical)
import { create } from "zustand"
import { cva } from "class-variance-authority"

// 3. Local imports (alphabetical, grouped by type)
import { Button } from "@/components/ui/Button"
import { useCartStore } from "@/stores"
import { cn } from "@/lib/utils"
```

### Component Patterns

#### shadcn/ui Components
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-styles",
        secondary: "secondary-styles",
      },
      size: {
        default: "default-size",
        sm: "small-size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  customProp?: string
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

#### Client Components
```typescript
"use client"

import { useState, useEffect } from "react"

export function MyComponent() {
  // Client-side logic here
}
```

### State Management (Zustand)
```typescript
import { create } from 'zustand'

interface State {
  items: Item[]
  addItem: (item: Item) => void
  removeItem: (id: string) => void
}

export const useStore = create<State>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
}))
```

### Styling (Tailwind CSS + shadcn/ui)

#### Class Name Merging
```typescript
import { cn } from "@/lib/utils"

// Always use cn() for conditional classes
<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className // Always include passed className
)} />
```

#### CSS Variables and Theming
The app uses CSS custom properties for theming with dark mode support:
- Colors: `--primary`, `--secondary`, `--accent`, etc.
- All defined in `app/globals.css` with light and dark variants
- Use Tailwind's `hsl(var(--variable))` syntax

#### Responsive Design
```typescript
// Mobile-first approach
<div className="text-sm md:text-base lg:text-lg" />

// Container with responsive padding
<div className="container mx-auto px-4 md:px-6 lg:px-8" />
```

### Naming Conventions

#### Components
- **PascalCase**: `Button`, `ShoppingCart`, `ProductCard`
- **File names**: Match component name (`Button.tsx`)
- **Display names**: Always set for forwardRef components

#### Variables and Functions
- **camelCase**: `userName`, `handleSubmit`, `isLoading`
- **Boolean prefixes**: `is`, `has`, `can`, `should`
- **Event handlers**: `handleEventName` or `onEventName`

#### Files and Folders
- **kebab-case** for files: `shopping-cart.tsx`
- **camelCase** for folders: `components/ui`
- **Special folders**: `app/` (Next.js), `components/ui/` (shadcn), `lib/` (utilities), `stores/` (Zustand)

### Error Handling
```typescript
// Async operations
try {
  const result = await someAsyncOperation()
} catch (error) {
  console.error('Operation failed:', error)
  // Handle error appropriately
}

// Event handlers - prevent default behavior
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Handle form submission
}
```

### Accessibility
- Always include `aria-label` or `aria-labelledby` for interactive elements without visible text
- Use `sr-only` class for screen reader only content
- Ensure keyboard navigation works
- Provide alt text for images
- Use semantic HTML elements

### Performance Considerations
- Use `React.memo()` for expensive components when appropriate
- Optimize Zustand selectors to prevent unnecessary re-renders
- Use `useCallback` for event handlers passed to child components
- Lazy load components when possible
- Optimize images with Next.js `Image` component

### File Structure
```
/
├── app/                    # Next.js App Router
│   ├── (store)/           # Route groups
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature components
├── lib/
│   └── utils.ts          # Utility functions
├── stores/               # Zustand stores
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

### Git Workflow
- **Commits**: Use conventional commits when possible
- **Branches**: feature/, bugfix/, hotfix/ prefixes
- **PRs**: Include description of changes and testing done

### Development Workflow
1. Run `npm run dev` to start development
2. Make changes with hot reload
3. Run `npm run lint` to check code quality
4. Test in browser and mobile responsive views
5. Run `npm run build` to ensure production build works

### Dependencies
- **UI**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS with custom design system
- **State**: Zustand for client state management
- **Build**: Next.js 14 with TypeScript

### Browser Support
- Modern browsers with ES2018+ support
- Mobile-first responsive design
- Progressive enhancement approach

---

*This document should be updated as the project evolves and new patterns are established.*