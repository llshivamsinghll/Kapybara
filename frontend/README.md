# Kapybara - Multi-User Blogging Platform

A modern, full-stack blogging platform built with Next.js 15, PostgreSQL, Drizzle ORM, and tRPC, demonstrating end-to-end type safety and modern web development practices.

## 🚀 Live Demo

[Deploy URL] - To be added after Vercel deployment

## 📋 Tech Stack

### Frontend
- **Next.js 15** - App Router with React Server Components
- **TypeScript** - Full type safety across the application
- **Tailwind CSS** - Utility-first CSS framework
- **tRPC Client** - Type-safe API client with React Query integration
- **React Query (TanStack Query)** - Server state management via tRPC
- **Zustand** - Global client state management (where needed)

### Backend
- **tRPC** - End-to-end typesafe API layer
- **Zod** - Schema validation for inputs
- **Drizzle ORM** - TypeScript ORM for database operations
- **PostgreSQL** - Relational database (Neon cloud hosting)
- **Express** - tRPC adapter middleware

## ✅ Features Implemented

### 🔴 Priority 1 - Must Have (Core Requirements)
- ✅ Blog post CRUD operations (Create, Read, Update, Delete)
- ✅ Category CRUD operations
- ✅ Assign multiple categories to posts (many-to-many relationship)
- ✅ Blog listing page showing all posts
- ✅ Individual post view page
- ✅ Category filtering on listing page
- ✅ Basic responsive navigation
- ✅ Clean, professional UI with Tailwind CSS

### 🟡 Priority 2 - Should Have (Expected Features)
- ✅ Landing page with 5 sections (Hero, Features, CTA)
- ✅ Dashboard page for managing posts
- ✅ Draft vs Published post status
- ✅ Loading and error states
- ✅ Mobile-responsive design
- ✅ Markdown content editor (textarea-based for simplicity)

### 🟢 Priority 3 - Nice to Have (Bonus Features)
- ✅ Post statistics (reading time calculation)
- ✅ Dark theme
- ✅ Optimistic UI updates

## 🏗️ Architecture & Code Organization

### tRPC Router Structure
```
kapybara/src/server/api/
├── root.ts              # Main app router combining all routers
├── trpc.ts             # tRPC context and middleware setup
└── routers/
    ├── posts.ts        # Post CRUD and filtering procedures
    └── categories.ts   # Category CRUD procedures
```

### Frontend Structure
```
frontend-v2/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Landing page
│   ├── blog/           # Blog listing and individual posts
│   └── dashboard/      # Post management dashboard
├── components/
│   ├── ui/             # Reusable UI components
│   └── layout/         # Layout components (Navbar, Footer)
├── lib/                # Utilities and tRPC client setup
├── providers/          # React context providers (tRPC)
└── types/              # TypeScript type definitions
```

### Database Schema (Drizzle ORM)
```typescript
- posts: id, title, slug, content, excerpt, published, createdAt, updatedAt
- categories: id, name, slug, description
- postCategories: postId, categoryId (junction table for many-to-many)
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (or use Neon cloud database)

### Environment Variables

Create `.env.local` in `frontend-v2/`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Create `.env` in `kapybara/`:
```bash
DATABASE_URL="your_postgresql_connection_string"
```

### Installation & Running

1. **Clone the repository**
```bash
git clone <repository-url>
cd FullKapybara
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd kapybara
npm install

# Install frontend dependencies
cd ../frontend-v2
npm install
```

3. **Setup database**
```bash
cd kapybara
npm run db:push    # Push schema to database
npm run db:seed    # (Optional) Seed with sample data
```

4. **Run the development servers**

Terminal 1 - Backend:
```bash
cd kapybara
npm run dev        # Runs on http://localhost:4000
```

Terminal 2 - Frontend:
```bash
cd frontend-v2
npm run dev        # Runs on http://localhost:3000
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/trpc
- Health Check: http://localhost:4000/health

## 🎯 Key Technical Decisions

### 1. **Markdown over Rich Text Editor**
- **Decision**: Used textarea-based markdown editor
- **Rationale**: Faster implementation (saved 2-3 hours), simpler maintenance, sufficient for blogging needs
- **Trade-off**: Less visual editing, but adequate for technical content

### 2. **Neon PostgreSQL**
- **Decision**: Cloud-hosted PostgreSQL via Neon
- **Rationale**: Quick setup, no local database configuration, serverless with auto-scaling
- **Trade-off**: Requires internet connection for development

### 3. **Standard Tailwind Theme**
- **Decision**: Used default Tailwind colors with HSL custom properties
- **Rationale**: Faster development, consistent design system, easier maintenance
- **Trade-off**: Less unique branding, but professional appearance

### 4. **tRPC React Query Integration**
- **Decision**: Leveraged tRPC's built-in React Query hooks
- **Rationale**: Automatic cache management, optimistic updates, type-safe data fetching
- **Trade-off**: Slight learning curve, but massive DX improvement

## 📊 Time Investment

**Total Time**: ~14 hours

- Day 1-2: Backend setup, database schema, tRPC routers (5 hours)
- Day 3-4: Core frontend features, blog listing, post view (4 hours)
- Day 5-6: Dashboard, category management, polish (3 hours)
- Day 7: Landing page enhancement, README, deployment prep (2 hours)

## 🔍 Testing the Application

### Create a Post
1. Navigate to Dashboard
2. Click "New Post"
3. Fill in title, content, select categories
4. Toggle published status
5. Submit

### Filter by Category
1. Go to Blog page
2. Use category dropdown
3. View filtered results

### Edit/Delete Posts
1. Go to Dashboard
2. Click "Edit" or "Delete" on any post
3. Modify and save or confirm deletion

## 🚢 Deployment

### Vercel Deployment (Recommended)
```bash
# Frontend deployment
cd frontend-v2
vercel

# Backend can be deployed to Railway, Render, or Vercel
cd kapybara
vercel
```

Update `NEXT_PUBLIC_API_URL` in Vercel environment variables to point to deployed backend.

## 📝 Notes

- No authentication system (as per requirements)
- Focus on code quality and architecture over feature quantity
- All core features (Priority 1 & 2) fully implemented
- Clean, maintainable codebase with proper TypeScript usage
- Mobile-responsive across all pages
- Professional UI with consistent design language

## 🤝 Evaluation Criteria Coverage

- ✅ Code Organization: Clean separation, reusable components, organized routers
- ✅ UI/UX: Professional design, responsive, intuitive navigation, loading states
- ✅ TypeScript: Proper types, tRPC inference, minimal `any` usage
- ✅ React Best Practices: Modern hooks, tRPC integration, component composition
- ✅ Database Design: Proper relationships, Drizzle ORM usage
- ✅ API Design: Well-structured tRPC routers, Zod validation, error handling
- ✅ State Management: React Query via tRPC, efficient caching
- ✅ Error Handling: Input validation, user-friendly messages, graceful recovery

