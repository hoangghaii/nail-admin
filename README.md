# Pink Nail Admin Dashboard

A modern React admin dashboard for managing a nail salon business with shadcn/ui blue theme.

## Features

- ✨ **Authentication**: Mock login system with JWT-based auth
- 🎨 **shadcn/ui Blue Theme**: Professional design system with clean, modern aesthetics
- 🔒 **Protected Routes**: Secure routes requiring authentication
- 📱 **Responsive Layout**: Fixed sidebar and sticky topbar
- 🎯 **Type-Safe**: Full TypeScript support with shared types from client project
- 💾 **Mock Data**: localStorage-based mock API (ready for real backend integration)
- ☁️ **Firebase Ready**: Pre-configured for Firebase Storage image uploads

## Pages

- **Dashboard**: Overview with quick stats and actions ✅
- **Banners**: Full CRUD for hero section banners ✅
  - Create/edit/delete banners
  - Image/video uploads to Firebase Storage
  - Drag-and-drop reordering
  - Primary banner selection
  - Active/inactive toggle
  - Hero display mode settings (Image/Video/Carousel)
- **Services**: Manage nail services with pricing (coming soon)
- **Gallery**: Manage portfolio images (coming soon)
- **Bookings**: View and update customer bookings (coming soon)
- **Contacts**: Manage customer inquiries (CRUD - coming soon)

## Tech Stack

- **Frontend**: React 19.2 + TypeScript 5.9
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS v4 + glassmorphism utilities
- **UI Components**: Radix UI primitives
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand for global state
- **Notifications**: Sonner toasts
- **Icons**: Lucide React
- **Cloud Storage**: Firebase Storage

## Getting Started

### Installation

```bash
npm install
```

### Configure Environment

Update `.env` with your Firebase credentials or keep `VITE_USE_MOCK_API=true` to use mock data.

### Development

```bash
npm run dev
```

Visit http://localhost:5173 and login with demo credentials.

### Build

```bash
npm run build
```

## Demo Credentials

- **Email**: admin@pinknail.com
- **Password**: admin123

## Design System

### shadcn/ui Blue Theme

Built on shadcn/ui component library with a professional blue color scheme:

- **Primary**: Professional blue `oklch(0.492 0.147 255.75)`
- **Background**: Clean white `oklch(1 0 0)`
- **Muted**: Light gray `oklch(0.961 0.004 255.75)`
- **Border**: Subtle gray `oklch(0.898 0.003 255.75)`
- **Destructive**: Red `oklch(0.577 0.245 27.325)`
- **Success**: Green `oklch(0.629 0.176 152.87)`
- **Warning**: Amber `oklch(0.755 0.153 79.98)`

### Component Patterns

- Cards with `bg-card` and `border-border`
- Text with `text-muted-foreground` for secondary content
- Interactive elements with `hover:bg-accent`
- All styling uses Tailwind CSS utility classes
- Dark mode support via CSS variables

## Project Structure

```
src/
├── components/
│   ├── auth/           # Protected route components
│   ├── layout/         # Sidebar, Topbar, Layout
│   └── ui/             # Reusable UI components
├── pages/              # Page components
├── services/           # API services (auth, storage, image upload)
├── store/              # Zustand stores
├── types/              # TypeScript type definitions
├── lib/                # Utilities
├── App.tsx             # Main app with routing
└── index.css           # Glassmorphism design system
```

## Implementation Status

### ✅ Completed (v0.1.0)

1. **Foundation**
   - Authentication system with protected routes
   - shadcn/ui blue theme design system
   - Layout components (Sidebar, Topbar)
   - Type system aligned with client project
   - Card components and UI primitives

2. **Banner Management (Complete CRUD)**
   - Banner listing with DataTable (TanStack Table)
   - Create/edit banner forms with validation (React Hook Form + Zod)
   - Delete confirmation dialogs
   - Image/video upload to Firebase Storage
   - Drag-and-drop reordering (@dnd-kit)
   - Primary banner selection
   - Active/inactive toggle
   - Hero display mode settings (Image/Video/Carousel)
   - Auto-save settings
   - Mock data initialization with 5 sample banners

3. **Shared Components**
   - DataTable with TanStack Table (sorting, pagination, row actions)
   - ImageUpload with Firebase Storage integration
   - VideoUpload with Firebase Storage integration
   - StatusBadge component
   - Form modals (Dialog, Input, Label, Textarea, Switch, RadioGroup)

### ⏳ Coming Soon

4. **Services CRUD** - Manage nail services with pricing
5. **Gallery CRUD** - Manage portfolio images with bulk upload
6. **Bookings Management** - View and update customer bookings
7. **Contacts Management** - Manage customer inquiries with admin notes
8. **Dashboard Enhancements** - Real statistics and widgets
9. **Backend API Integration** - Replace mock data with real API

## License

MIT
