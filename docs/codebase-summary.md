# Codebase Summary

**Last Updated**: 2025-12-03
**Version**: 0.1.0
**Project**: Pink Nail Admin Dashboard

## Overview

Pink Nail Admin Dashboard is a modern React-based admin panel for managing a nail salon business. Built with React 19.2, TypeScript 5.9, and Tailwind CSS v4, it features a professional blue theme design system powered by shadcn/ui components. The application uses a dual-mode architecture supporting both mock data (localStorage) and real API integration.

## Project Structure

```
nail-admin/
├── .claude/              # Claude Code configuration
│   └── workflows/        # Development workflows
├── .husky/               # Git hooks (Prettier)
├── docs/                 # Project documentation
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── banners/      # Banner management components
│   │   ├── layout/       # Layout components (Sidebar, Topbar)
│   │   ├── shared/       # Reusable components (DataTable, ImageUpload, etc.)
│   │   └── ui/           # Base UI components (shadcn/ui)
│   ├── data/             # Mock data and initialization
│   ├── lib/              # Utilities and configurations
│   ├── pages/            # Page components
│   ├── services/         # API service layer (dual-mode)
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main app with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles (Tailwind v4)
├── .env                  # Environment variables (gitignored)
├── CLAUDE.md             # Claude Code instructions
├── components.json       # shadcn/ui configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite build configuration
```

## Core Technologies

### Frontend Stack

- **React**: 19.2.0 (latest)
- **TypeScript**: 5.9.0
- **Vite**: 7.2.0 (build tool with SWC)
- **React Router**: 6.28.0
- **Tailwind CSS**: 4.0.18 (latest v4)

### UI & Styling

- **Radix UI**: Component primitives (Dialog, DropdownMenu, RadioGroup, Switch)
- **shadcn/ui**: Component patterns with blue theme
- **Lucide React**: Icon library
- **Tailwind Merge**: Class name utilities
- **clsx**: Conditional class names

### Forms & Validation

- **React Hook Form**: 7.54.2
- **Zod**: 3.24.1 (schema validation)
- **@hookform/resolvers**: Integration layer

### State Management

- **Zustand**: 5.0.2 (lightweight state management)
- **Sonner**: Toast notifications

### Data Management

- **TanStack Table**: 8.21.0 (React Table)
- **@dnd-kit**: Drag-and-drop functionality (sortable banners)

### Cloud Services

- **Firebase**: Storage for images/videos (v11.1.0)

### Development Tools

- **ESLint**: 9.17.0 (linting)
- **Prettier**: 3.4.2 (code formatting)
- **Husky**: Git hooks
- **TypeScript ESLint**: Type-aware linting

## Key Components

### 1. Authentication System

**Files**:

- `src/services/auth.service.ts` - Authentication service (mock/real API)
- `src/store/authStore.ts` - Zustand auth state management
- `src/components/auth/ProtectedRoute.tsx` - Route protection
- `src/pages/LoginPage.tsx` - Login UI
- `src/types/auth.types.ts` - Auth type definitions

**Features**:

- Mock JWT-based authentication
- Token persistence (localStorage)
- Automatic session initialization
- Remember me functionality (30-day expiry)
- Protected route system
- Demo credentials: `admin@pinknail.com` / `admin123`

### 2. Banner Management Module (CRUD Complete)

**Components** (`src/components/banners/`):

- `BannerFormModal.tsx` - Create/edit banner modal with validation
- `DeleteBannerDialog.tsx` - Delete confirmation dialog
- `HeroSettingsCard.tsx` - Hero display mode configuration
- `index.ts` - Barrel export

**Pages**:

- `src/pages/BannersPage.tsx` - Banner management with DataTable, drag-drop reordering

**Services**:

- `src/services/banners.service.ts` - CRUD operations (dual-mode)
- `src/services/heroSettings.service.ts` - Hero settings persistence

**Types**:

- `src/types/banner.types.ts` - Banner entity
- `src/types/heroSettings.types.ts` - HeroDisplayMode, HeroSettings

**Data**:

- `src/data/mockBanners.ts` - 5 sample banners
- `src/data/initializeMockData.ts` - Auto-initialization on first load

**Features**:

- Full CRUD operations (Create, Read, Update, Delete)
- Image/video upload to Firebase Storage
- Drag-and-drop reordering with @dnd-kit
- Primary banner selection
- Active/inactive toggle
- Hero display modes: Image, Video, Carousel
- Auto-save settings
- Responsive data table
- Form validation with Zod
- Toast notifications

### 3. Shared Components

**DataTable** (`src/components/shared/DataTable.tsx`):

- TanStack Table integration
- Sorting, pagination
- Custom column definitions
- Row actions support
- Loading states
- Empty state handling

**ImageUpload** (`src/components/shared/ImageUpload.tsx`):

- Firebase Storage integration
- Drag-and-drop file upload
- Image preview
- Upload progress indicator
- File validation (type, size)
- Folder organization

**VideoUpload** (`src/components/shared/VideoUpload.tsx`):

- Firebase Storage for videos
- Drag-and-drop upload
- Video preview
- Upload progress
- File validation
- Folder organization

**StatusBadge** (`src/components/shared/StatusBadge.tsx`):

- Status indicators (active/inactive)
- Variant support (default, success, destructive, warning)
- Consistent styling

### 4. UI Components (shadcn/ui)

**Base Components** (`src/components/ui/`):

- `button.tsx` - Button with variants (default, destructive, outline, ghost, link)
- `card.tsx` - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `dialog.tsx` - Modal dialogs (Dialog, DialogTrigger, DialogContent, etc.)
- `dropdown-menu.tsx` - Dropdown menus
- `input.tsx` - Text input
- `label.tsx` - Form labels
- `radio-group.tsx` - Radio button groups
- `switch.tsx` - Toggle switches
- `textarea.tsx` - Multi-line text input

**Design System**:

- Professional blue theme
- OKLCH color space
- CSS variable-based theming
- Consistent spacing and typography
- Accessible (Radix UI primitives)
- Dark mode support

### 5. Layout System

**Components** (`src/components/layout/`):

- `Layout.tsx` - Main layout wrapper
- `Sidebar.tsx` - Fixed navigation sidebar
- `Topbar.tsx` - Sticky top bar with user menu

**Features**:

- Fixed sidebar navigation
- Sticky topbar
- Responsive design
- Active route highlighting
- User dropdown menu
- Logout functionality

### 6. Service Layer

**Architecture Pattern**: Dual-mode services controlled by `VITE_USE_MOCK_API` env variable

**Services** (`src/services/`):

**auth.service.ts**:

```typescript
class AuthService {
  private useMockApi = import.meta.env.VITE_USE_MOCK_API === "true";
  async login(credentials: LoginCredentials): Promise<AuthResponse>;
  async logout(): Promise<void>;
  async getCurrentUser(): Promise<User | null>;
}
```

**banners.service.ts**:

```typescript
class BannersService {
  private useMockApi = import.meta.env.VITE_USE_MOCK_API === "true";
  async getAll(): Promise<Banner[]>;
  async getById(id: string): Promise<Banner>;
  async create(
    banner: Omit<Banner, "id" | "createdAt" | "updatedAt">,
  ): Promise<Banner>;
  async update(id: string, data: Partial<Banner>): Promise<Banner>;
  async delete(id: string): Promise<void>;
  async setPrimary(id: string): Promise<void>;
  async toggleActive(id: string): Promise<void>;
  async reorder(bannerId: string, newIndex: number): Promise<void>;
}
```

**heroSettings.service.ts**:

```typescript
class HeroSettingsService {
  private useMockApi = import.meta.env.VITE_USE_MOCK_API === "true";
  async get(): Promise<HeroSettings>;
  async update(settings: Partial<HeroSettings>): Promise<HeroSettings>;
}
```

**imageUpload.service.ts**:

```typescript
class ImageUploadService {
  async uploadImage(file: File, folder: string): Promise<string>;
  async uploadVideo(file: File, folder: string): Promise<string>;
  async deleteFile(url: string): Promise<void>;
}
```

**storage.service.ts**:

```typescript
class StorageService {
  set<T>(key: string, value: T): void;
  get<T>(key: string, defaultValue: T): T;
  remove(key: string): void;
  clear(): void;
}
```

**Mock Mode** (`VITE_USE_MOCK_API=true`):

- Data stored in localStorage with `nail_admin_` prefix
- Simulates network delays (800ms for auth)
- Full CRUD operations on localStorage
- No backend required

**Real API Mode** (`VITE_USE_MOCK_API=false`):

- Ready for backend integration
- Expected endpoints documented
- No code changes needed to switch

### 7. Type System

**Shared Types** (must remain compatible with client project at `/Users/hainguyen/Documents/nail-project/nail-client`):

**service.types.ts**:

```typescript
type ServiceCategory =
  | "extensions"
  | "manicure"
  | "nail-art"
  | "pedicure"
  | "spa";
type Service = {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  duration: number;
  imageUrl: string;
  featured: boolean;
};
```

**gallery.types.ts**:

```typescript
type GalleryCategory =
  | "all"
  | "extensions"
  | "manicure"
  | "nail-art"
  | "pedicure"
  | "seasonal";
type GalleryItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: GalleryCategory;
  description?: string;
  duration?: number;
  price?: number;
  featured: boolean;
  createdAt: Date;
};
```

**booking.types.ts**:

```typescript
type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
type CustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
type Booking = {
  id: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  customerInfo: CustomerInfo;
  notes?: string;
  status: BookingStatus;
};
```

**Admin-Only Types**:

**banner.types.ts** (NEW):

```typescript
type Banner = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  videoUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  sortIndex: number;
  active: boolean;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
};
```

**heroSettings.types.ts** (NEW):

```typescript
type HeroDisplayMode = "image" | "video" | "carousel";
type HeroSettings = {
  displayMode: HeroDisplayMode;
  carouselInterval: number;
  autoPlay: boolean;
  showControls: boolean;
  updatedAt: Date;
};
```

**contact.types.ts**:

```typescript
type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  adminNotes?: string;
  status: "new" | "contacted" | "resolved";
  createdAt: Date;
  updatedAt: Date;
};
```

**auth.types.ts**:

```typescript
type User = {
  id: string;
  email: string;
  name: string;
  role: "admin";
  avatar?: string;
};
type LoginCredentials = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
type AuthResponse = { token: string; user: User };
```

### 8. Configuration & Utilities

**Vite Configuration** (`vite.config.ts`):

- Path alias: `@/*` → `./src/*`
- React plugin with SWC
- Development server on port 5173

**TypeScript Configuration** (`tsconfig.json`):

- `verbatimModuleSyntax: true` - MUST use `import type` for type-only imports
- Strict mode enabled
- Path mapping for `@/*`

**Tailwind CSS v4** (`src/index.css`):

- Uses `@theme` directive (new in v4)
- OKLCH color space
- CSS variable-based design tokens
- Professional blue color palette
- Responsive utilities
- Dark mode support

**Firebase Configuration** (`src/lib/firebase.ts`):

- Firebase SDK v11.1.0
- Storage bucket for images/videos
- Environment variable configuration

**Utilities** (`src/lib/utils.ts`):

- `cn()` - Class name merging with tailwind-merge
- Type-safe utility functions

## Entry Points

### For Users

- **Login Page**: `/login` - Authentication with demo credentials
- **Dashboard**: `/` - Overview with quick stats (protected)
- **Banners**: `/banners` - Banner management (protected)
- **Services**: `/services` - Service management (protected, placeholder)
- **Gallery**: `/gallery` - Gallery management (protected, placeholder)
- **Bookings**: `/bookings` - Booking management (protected, placeholder)
- **Contacts**: `/contacts` - Contact management (protected, placeholder)

### For Developers

- **package.json**: Dependencies and scripts
- **CLAUDE.md**: Development instructions and architecture
- **README.md**: Project overview and getting started
- **components.json**: shadcn/ui configuration
- **.env**: Environment variables (gitignored)

### For AI Agents

- **CLAUDE.md**: Primary development instructions
- **docs/**: Comprehensive documentation
- **repomix-output.xml**: Codebase compaction for AI consumption

## Development Principles

### Code Standards

- **File Size**: Keep components under 500 lines
- **YANGI**: You Aren't Gonna Need It - Avoid over-engineering
- **KISS**: Keep It Simple, Stupid - Prefer simple solutions
- **DRY**: Don't Repeat Yourself - Extract reusable logic
- **Type Safety**: Use `import type` for type-only imports (verbatimModuleSyntax)

### Component Patterns

- Functional components with hooks
- Props destructuring in function signature
- Inline interfaces for component props
- Separate files for domain types
- Barrel exports (index.ts)
- Consistent naming (PascalCase for components)

### Styling Guidelines

- Use Tailwind CSS utility classes
- shadcn/ui component patterns
- `cn()` utility for conditional classes
- CSS variables for theming
- `bg-card`, `border-border`, `text-muted-foreground` for consistency

### Form Patterns

- React Hook Form + Zod validation
- Error message display
- Loading states
- Success/error toasts
- Type-safe form data with `z.infer<typeof schema>`

## File Statistics

**Total Files**: 66 files (from repomix output)
**Total Tokens**: 39,823 tokens
**Total Characters**: 154,959 chars

**Top 5 Files by Token Count**:

1. `CLAUDE.md` - 4,159 tokens (10.4%)
2. `src/components/banners/HeroSettingsCard.tsx` - 2,898 tokens (7.3%)
3. `src/assets/react.svg` - 2,531 tokens (6.4%)
4. `src/pages/BannersPage.tsx` - 2,139 tokens (5.4%)
5. `src/components/banners/BannerFormModal.tsx` - 2,068 tokens (5.2%)

## Integration Capabilities

### Firebase Storage

- Image uploads to `/banners`, `/services`, `/gallery` folders
- Video uploads to `/banners` folder
- File deletion support
- Progress tracking
- Error handling

### localStorage (Mock Mode)

- Prefixed keys: `nail_admin_*`
- JSON serialization/deserialization
- Type-safe get/set operations
- Clear all functionality

### React Router

- Declarative routing
- Protected routes
- Lazy loading ready
- Nested layouts

## Critical Files

### Configuration

- `/Users/hainguyen/Documents/nail-project/nail-admin/.env` - Environment variables
- `/Users/hainguyen/Documents/nail-project/nail-admin/components.json` - shadcn/ui config
- `/Users/hainguyen/Documents/nail-project/nail-admin/tsconfig.json` - TypeScript config
- `/Users/hainguyen/Documents/nail-project/nail-admin/vite.config.ts` - Vite build config

### Documentation

- `/Users/hainguyen/Documents/nail-project/nail-admin/README.md` - Project overview
- `/Users/hainguyen/Documents/nail-project/nail-admin/CLAUDE.md` - Development guide
- `/Users/hainguyen/Documents/nail-project/nail-admin/docs/` - Comprehensive docs

### Core Application

- `/Users/hainguyen/Documents/nail-project/nail-admin/src/main.tsx` - Entry point
- `/Users/hainguyen/Documents/nail-project/nail-admin/src/App.tsx` - Router configuration
- `/Users/hainguyen/Documents/nail-project/nail-admin/src/index.css` - Global styles

### Key Features

- `/Users/hainguyen/Documents/nail-project/nail-admin/src/pages/BannersPage.tsx` - Banner management
- `/Users/hainguyen/Documents/nail-project/nail-admin/src/components/banners/` - Banner components
- `/Users/hainguyen/Documents/nail-project/nail-admin/src/services/banners.service.ts` - Banner CRUD
- `/Users/hainguyen/Documents/nail-project/nail-admin/src/components/shared/DataTable.tsx` - Table component

## Related Projects

**Nail Client** (companion project):

- Location: `/Users/hainguyen/Documents/nail-project/nail-client`
- Same tech stack (React 19.2, TypeScript 5.9, Tailwind CSS v4, Vite 7.2)
- Shares type definitions (Service, Gallery, Booking, CustomerInfo)
- Warm earthy theme vs. admin's professional blue theme
- Uses mock data (same localStorage pattern)

**Type Sync Rule**: When modifying shared types (Service, Gallery, Booking, CustomerInfo), update both projects!

## Implementation Status

### ✅ Completed Features (v0.1.0)

**Foundation**:

- Project setup and dependencies
- TypeScript configuration with verbatimModuleSyntax
- Tailwind CSS v4 design system
- shadcn/ui blue theme
- Vite build pipeline
- ESLint and Prettier setup
- Git hooks with Husky

**Authentication**:

- Mock login system with JWT
- Protected routes
- Session persistence
- Auto-initialization
- Logout functionality

**Layout**:

- Fixed sidebar navigation
- Sticky topbar
- Responsive design
- User dropdown menu

**Banner Management** (Complete CRUD):

- Banner listing with DataTable
- Create banner with form validation
- Edit banner functionality
- Delete confirmation dialog
- Image/video upload to Firebase
- Drag-and-drop reordering
- Primary banner selection
- Active/inactive toggle
- Hero display mode settings (Image/Video/Carousel)
- Auto-save settings
- Mock data with 5 sample banners

**Shared Components**:

- DataTable with TanStack Table
- ImageUpload with Firebase
- VideoUpload with Firebase
- StatusBadge for indicators

**UI Components**:

- Button, Card, Dialog
- DropdownMenu, Input, Label
- RadioGroup, Switch, Textarea

**Services**:

- Dual-mode architecture (mock/real API)
- Auth service
- Banners service
- Hero settings service
- Image upload service
- Storage service (localStorage wrapper)

### ⏳ Not Yet Implemented

**Services CRUD**:

- Service listing
- Create/edit service form
- Delete service
- Image upload
- Category filtering
- Featured toggle

**Gallery CRUD**:

- Gallery listing
- Bulk image upload
- Create/edit gallery item
- Delete gallery item
- Category filtering
- Featured toggle

**Bookings Management**:

- Booking listing
- View booking details
- Status updates (pending → confirmed → completed)
- Customer information display
- Service details lookup

**Contacts Management**:

- Contact listing
- View contact details
- Admin notes field
- Status updates (new → contacted → resolved)
- Email/phone integration

**Dashboard**:

- Real statistics (currently placeholders)
- Recent bookings widget
- Recent contacts widget
- Quick actions

**Additional Features**:

- Search functionality in data tables
- Advanced filtering
- Pagination controls
- Export functionality
- Real backend API integration

## Dependencies Overview

### Production Dependencies (22 packages)

- **@dnd-kit/core**: 6.3.1 - Drag-and-drop core
- **@dnd-kit/sortable**: 8.0.0 - Sortable utilities
- **@hookform/resolvers**: 3.9.1 - Form validation resolvers
- **@radix-ui/react-\***: Various - UI component primitives
- **@tanstack/react-table**: 8.21.0 - Data tables
- **class-variance-authority**: 0.7.1 - Component variants
- **clsx**: 2.1.1 - Conditional classes
- **firebase**: 11.1.0 - Cloud storage
- **lucide-react**: 0.469.0 - Icons
- **react**: 19.2.0 - UI library
- **react-dom**: 19.2.0 - React DOM bindings
- **react-hook-form**: 7.54.2 - Form management
- **react-router-dom**: 6.28.0 - Routing
- **sonner**: 1.7.3 - Toast notifications
- **tailwind-merge**: 2.6.0 - Class merging
- **zod**: 3.24.1 - Schema validation
- **zustand**: 5.0.2 - State management

### Development Dependencies (16 packages)

- **@eslint/js**: 9.17.0
- **@types/react**: 19.0.6
- **@types/react-dom**: 19.0.2
- **@vitejs/plugin-react-swc**: 3.7.2
- **eslint**: 9.17.0
- **eslint-plugin-react-hooks**: 5.0.0
- **eslint-plugin-react-refresh**: 0.4.16
- **globals**: 15.14.0
- **husky**: 9.1.7
- **prettier**: 3.4.2
- **tailwindcss**: 4.0.18
- **typescript**: 5.9.0
- **typescript-eslint**: 8.19.1
- **vite**: 7.2.0

## Environment Variables

**Required Variables** (`.env` file):

```bash
# API Mode Toggle
VITE_USE_MOCK_API=true

# Firebase Storage Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note**: `.env` is gitignored. Never commit Firebase credentials.

## Common Development Tasks

### Add New Page

1. Create page component in `src/pages/[Name]Page.tsx`
2. Add route in `src/App.tsx` inside `<ProtectedRoute>`
3. Add navigation item to `src/components/layout/Sidebar.tsx`
4. Create service in `src/services/[name].service.ts` with dual-mode pattern

### Add shadcn/ui Component

```bash
npx shadcn@latest add [component-name]
```

### Run Development Server

```bash
npm run dev
# Visit http://localhost:5173
# Login: admin@pinknail.com / admin123
```

### Build for Production

```bash
npm run build  # Output: dist/
```

### Type Check

```bash
npx tsc --noEmit
```

### Format Code

```bash
npm run format
```

## Unresolved Questions

None identified. Banner CRUD implementation is complete and functional.
