# CLAUDE.md - Pink Nail Admin Dashboard

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role & Responsibilities

Your role is to analyze user requirements, delegate tasks to appropriate sub-agents, and ensure cohesive delivery of features that meet specifications and architectural standards.

## Workflows

- Primary workflow: `./.claude/workflows/primary-workflow.md`
- Development rules: `./.claude/workflows/development-rules.md`
- Orchestration protocols: `./.claude/workflows/orchestration-protocol.md`
- Documentation management: `./.claude/workflows/documentation-management.md`
- And other workflows: `./.claude/workflows/*`

**IMPORTANT:** Analyze the skills catalog and activate the skills that are needed for the task during the process.
**IMPORTANT:** You must follow strictly the development rules in `./.claude/workflows/development-rules.md` file.
**IMPORTANT:** Before you plan or proceed any implementation, always read the `./README.md` file first to get context.
**IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
**IMPORTANT:** In reports, list any unresolved questions at the end, if any.
**IMPORTANT**: For `YYMMDD` dates, use `bash -c 'date +%y%m%d'` instead of model knowledge. Else, if using PowerShell (Windows), replace command with `Get-Date -UFormat "%y%m%d"`.

## Documentation Management

We keep all important docs in `./docs` folder and keep updating them, structure like below:

```
./docs
├── project-overview-pdr.md
├── code-standards.md
├── codebase-summary.md
├── design-guidelines.md
├── deployment-guide.md
├── system-architecture.md
└── project-roadmap.md
```

**IMPORTANT:** *MUST READ* and *MUST COMPLY* all *INSTRUCTIONS* in project `./CLAUDE.md`, especially *WORKFLOWS* section is *CRITICALLY IMPORTANT*, this rule is *MANDATORY. NON-NEGOTIABLE. NO EXCEPTIONS. MUST REMEMBER AT ALL TIMES!!!*

## Project Overview

**Pink Nail Admin Dashboard** is a React-based admin panel for managing a nail salon business. It pairs with a client-facing website at `/Users/hainguyen/Documents/nail-project/nail-client`. The admin panel uses shadcn/ui's blue theme design system and manages banners, services, gallery, bookings, and customer contacts.

## Tech Stack

- **Frontend**: React 19.2 + TypeScript 5.9
- **Build**: Vite 7.2 with SWC
- **Styling**: Tailwind CSS v4 (using `@theme` directive)
- **UI Components**: Radix UI primitives (shadcn/ui pattern)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand
- **Notifications**: Sonner
- **Icons**: Lucide React
- **Data Tables**: TanStack Table (React Table v8)
- **Cloud Storage**: Firebase Storage
- **Data Strategy**: Mock data in localStorage (API-ready for migration)

## Critical Architecture Decisions

### 1. Type System Alignment

**CRITICAL**: This admin panel shares type definitions with the nail-client project. Types MUST remain compatible:

**Shared Types** (copied from client at `/Users/hainguyen/Documents/nail-project/nail-client/src/types/`):

- `Service` - Service with id, name, description, category, price, duration, imageUrl, featured
- `ServiceCategory` - "extensions" | "manicure" | "nail-art" | "pedicure" | "spa"
- `GalleryItem` - Gallery image with id, title, imageUrl, category, description, duration, price, featured, createdAt
- `GalleryCategory` - "all" | "extensions" | "manicure" | "nail-art" | "pedicure" | "seasonal"
- `Booking` - Booking with id, serviceId, date, timeSlot, customerInfo, notes, status
- `BookingStatus` - "pending" | "confirmed" | "completed" | "cancelled"
- `CustomerInfo` - firstName, lastName, email, phone

**Admin-Only Types**:

- `Banner` - Hero section banners (NEW feature, not in client)
- `Contact` - Customer inquiries with admin notes
- `User` - Admin user (id, email, name, role, avatar)
- `Auth` - Authentication types (AuthResponse, LoginCredentials)

**Rule**: Never modify shared types without updating both projects.

### 2. Mock API Architecture

The app uses a **dual-mode service layer** controlled by `VITE_USE_MOCK_API` env variable:

```typescript
// Example pattern in all service files
class BannersService {
  private useMockApi = import.meta.env.VITE_USE_MOCK_API === "true";

  async getAll(): Promise<Banner[]> {
    if (this.useMockApi) {
      return storage.get<Banner[]>("banners", []);
    }
    // Real API call
    const response = await fetch("/api/banners");
    return response.json();
  }
}
```

**Mock Mode** (`VITE_USE_MOCK_API=true`):

- Data stored in localStorage via `storage.service.ts`
- Prefix: `nail_admin_`
- Simulates network delay (800ms for auth)
- Full CRUD operations on localStorage

**Real API Mode** (`VITE_USE_MOCK_API=false`):

- Ready for backend integration
- Expected API endpoints documented in README
- No frontend code changes needed to switch

### 3. shadcn/ui Blue Theme Design System

**Color Palette** (defined in `src/index.css` using OKLCH):

```css
/* Light Mode */
--color-background: oklch(1 0 0);           /* White */
--color-foreground: oklch(0.145 0.007 255.75); /* Dark blue-gray */
--color-primary: oklch(0.492 0.147 255.75); /* Professional blue */
--color-secondary: oklch(0.961 0.004 255.75); /* Light gray */
--color-muted: oklch(0.961 0.004 255.75);   /* Light background */
--color-accent: oklch(0.961 0.004 255.75);  /* Accent background */
--color-destructive: oklch(0.577 0.245 27.325); /* Red */
--color-border: oklch(0.898 0.003 255.75);  /* Border gray */
--color-ring: oklch(0.492 0.147 255.75);    /* Focus ring (blue) */
--color-success: oklch(0.629 0.176 152.87); /* Green */
--color-warning: oklch(0.755 0.153 79.98);  /* Amber */
```

**shadcn/ui Component Patterns**:

- Use `bg-card` for card backgrounds (white/dark-gray)
- Use `border-border` for consistent borders
- Use `text-muted-foreground` for secondary text
- Use `hover:bg-accent` for interactive elements
- All components use CSS variables for theming

**Usage Pattern**:

```tsx
<Card className="border-border bg-card">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription className="text-muted-foreground">
      Description
    </CardDescription>
  </CardHeader>
  <CardContent>{/* content */}</CardContent>
</Card>
```

### 4. TypeScript Configuration

**Important**: Uses `verbatimModuleSyntax: true`

**Rule**: Always use `type` imports for type-only imports:

```typescript
// ✅ Correct
import type { User, AuthResponse } from "@/types/auth.types";

// ❌ Wrong (causes build error)
import { User, AuthResponse } from "@/types/auth.types";
```

**Path Alias**: `@/*` maps to `./src/*`

### 5. Authentication Flow

**Demo Credentials**:

- Email: `admin@pinknail.com`
- Password: `admin123`

**Flow**:

1. Login via `authService.login()` (mock JWT in localStorage)
2. Token stored with 1-day (or 30-day if "Remember me") expiry
3. `useAuthStore` manages global auth state
4. `ProtectedRoute` component wraps admin routes
5. Redirects to `/login` if not authenticated

**Auth Files**:

- `src/services/auth.service.ts` - Authentication logic
- `src/store/authStore.ts` - Zustand store
- `src/components/auth/ProtectedRoute.tsx` - Route protection
- `src/pages/LoginPage.tsx` - Login UI

## File Organization

```
src/
├── components/
│   ├── auth/              # ProtectedRoute
│   ├── layout/            # Sidebar, Topbar, Layout (glassmorphism)
│   ├── shared/            # Reusable components (DataTable, ImageUpload, StatusBadge)
│   └── ui/                # Base UI components (Button, Input, Label, etc.)
├── pages/                 # Page components (Login, Dashboard, Banners, etc.)
├── services/              # Service layer (auth, storage, image upload, CRUD)
├── store/                 # Zustand stores
├── types/                 # TypeScript type definitions
├── lib/                   # Utilities (utils.ts, firebase.ts)
├── data/                  # Mock data
├── App.tsx                # Router configuration
├── main.tsx               # Entry point
└── index.css              # Glassmorphism design system
```

## Common Tasks & Patterns

### Adding a New Page

1. Create page component in `src/pages/[Name]Page.tsx`
2. Add route in `src/App.tsx` inside `<ProtectedRoute>`
3. Add navigation item to `src/components/layout/Sidebar.tsx`
4. Create service in `src/services/[name].service.ts` with dual-mode pattern

### Creating a CRUD Service

Follow the pattern in the plan (see `/Users/hainguyen/.claude/plans/greedy-gliding-rocket.md`):

```typescript
export class BannersService {
  private useMockApi = import.meta.env.VITE_USE_MOCK_API === "true";

  async getAll(): Promise<Banner[]> { /* ... */ }
  async create(banner: Omit<Banner, "id">): Promise<Banner> { /* ... */ }
  async update(id: string, data: Partial<Banner>): Promise<Banner> { /* ... */ }
  async delete(id: string): Promise<void> { /* ... */ }
}

export const bannersService = new BannersService();
```

### Adding UI Components

**Use shadcn/ui pattern**:

1. Create in `src/components/ui/[name].tsx`
2. Use Radix UI primitives where possible
3. Add `cn()` utility for className merging
4. Export component and variants

**Example**:

```tsx
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("glass shadow-glass rounded-lg p-6", className)} {...props} />
  );
}
```

### Form Validation with Zod

```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

type FormData = z.infer<typeof schema>;

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

### Using Storage Service

```typescript
import { storage } from "@/services/storage.service";

// Set data
storage.set("key", { foo: "bar" });

// Get data with default
const data = storage.get<MyType>("key", defaultValue);

// Remove
storage.remove("key");

// Clear all admin data
storage.clear();
```

## Environment Variables

**`.env` file** (in project root):

```env
VITE_USE_MOCK_API=true                           # Toggle mock/real API
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note**: `.env` is in `.gitignore`. Never commit real Firebase credentials.

## Current Implementation Status

### ✅ Completed

- Project setup and dependencies
- Type system (shared + admin types)
- Glassmorphism design system
- Authentication (mock login, protected routes)
- Layout components (Sidebar, Topbar, Layout)
- Core services (storage, auth, image upload)
- Router configuration
- Login page
- Dashboard page (with placeholders)
- Firebase configuration
- Build pipeline (TypeScript + Vite)

### ⏳ Not Yet Implemented

- **DataTable component** (TanStack Table)
- **ImageUpload component** (Firebase integration)
- **Form modals** (create/edit dialogs)
- **Banners CRUD** (full implementation)
- **Services CRUD** (full implementation)
- **Gallery CRUD** (full implementation with bulk upload)
- **Bookings management** (view/update status)
- **Contacts management** (view/update/notes)
- **Mock data initialization** (seed data on first load)
- **StatusBadge component** (for booking/contact status)
- **Real backend API** (when ready to migrate)

## Known Constraints & Requirements

### User Requirements (from initial prompt)

- **Banner management is for hero sections** in client (not duplicate features)
- **Light professional theme** (not the warm earthy client theme)
- **Mock data first**, API-ready architecture
- **Firebase/AWS S3** for image uploads (cloud storage)
- **React Hook Form + Zod** for all forms
- **Glassmorphism design** throughout
- **No create button for bookings** (bookings come from client site)

### Design Requirements

- **Mobile-first** responsive design
- **Accessible** components (Radix UI ensures this)
- **Consistent glassmorphism** on all cards, modals, sidebar, topbar
- **English validation messages** (admin users, unlike Vietnamese in client)

### Performance Requirements

- **Lazy load routes** (can add React.lazy later)
- **Debounced search** in data tables
- **Image optimization** for uploads
- **Loading skeletons** for async operations

## Testing & Development

### Run Development Server

```bash
npm run dev
# Visit http://localhost:5173
# Login: admin@pinknail.com / admin123
```

### Build for Production

```bash
npm run build
# Output: dist/
```

### Lint Code

```bash
npm run lint
```

### Check Types

```bash
npx tsc --noEmit
```

## Related Projects

**Nail Client** (companion project):

- Location: `/Users/hainguyen/Documents/nail-project/nail-client`
- Same tech stack (React, TypeScript, Tailwind, Vite)
- Shares type definitions (Service, Gallery, Booking)
- Warm earthy theme vs. admin's professional blue theme
- Uses mock data (same pattern as admin)

**Type Sync**: When modifying shared types, update both projects!

## Common Issues & Solutions

### Build Error: "Type must be imported using type-only import"

**Fix**: Change `import { Type }` to `import type { Type }`

### Tailwind classes not working

**Fix**: Ensure `@import "tailwindcss"` is at top of `index.css`

### Firebase upload fails

**Fix**: Check `.env` has correct Firebase credentials, or keep `VITE_USE_MOCK_API=true`

### Protected route redirects to login immediately

**Fix**: Check `useAuthStore.initializeAuth()` is called in `App.tsx` `useEffect`

### Glass effects not showing

**Fix**: Check parent has non-transparent background (gradient background in body)

## Code Style & Conventions

- **Component naming**: PascalCase (e.g., `LoginPage`, `Sidebar`)
- **File naming**: PascalCase for components, camelCase for utilities
- **Type naming**: PascalCase (e.g., `User`, `AuthResponse`)
- **Formatting**: Prettier with 2-space indent, double quotes
- **Imports**: Absolute imports with `@/` alias preferred
- **Props**: Destructure in function signature
- **Types**: Define inline interfaces for props, separate files for domain types

## Implementation Plan Reference

Full implementation plan available at:
`/Users/hainguyen/.claude/plans/greedy-gliding-rocket.md`

This plan contains:

- Complete code examples for all components
- Service layer patterns
- Data table implementation
- Image upload flow
- Form modal structure
- API migration strategy
- 6-week timeline breakdown

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Type check
npx tsc --noEmit

# Add shadcn component (if needed)
npx shadcn@latest add [component-name]
```

## Next Task Priorities

When continuing work on this project:

1. **Implement DataTable component** (foundation for all CRUD pages)
2. **Create mock data initialization** (seed localStorage on first load)
3. **Build Banners CRUD** (first complete feature implementation)
4. **Add ImageUpload component** (needed for banners, services, gallery)
5. **Implement Services CRUD** (with category dropdown)
6. **Build Gallery CRUD** (with bulk upload)
7. **Add Bookings management** (view-only with status updates)
8. **Implement Contacts management** (with admin notes)

## AI Assistant Guidelines

When working on this project:

1. **Always check type compatibility** with nail-client project before modifying shared types
2. **Use `type` imports** to avoid verbatimModuleSyntax errors
3. **Follow glassmorphism patterns** for all UI components
4. **Maintain dual-mode service pattern** (mock + real API)
5. **Keep forms simple** - don't over-engineer with unnecessary features
6. **Reference the implementation plan** for code examples and patterns
7. **Test both mock and type-checking** before considering task complete
8. **Update README** when adding major features

---

**Last Updated**: 2025-11-30
**Project Status**: Foundation complete, CRUD features in progress
**Current Version**: 0.0.0 (pre-release)
