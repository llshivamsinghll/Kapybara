# Full-Stack Blogging Platform

Assessment project: a modern multi-user blogging platform demonstrating production-quality code with end-to-end type safety, clean architecture, and modern React patterns.

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon cloud recommended)
- npm or yarn

### Installation and setup

1) Clone repository
```bash
git clone <repository-url>
cd FullKapybara
```

2) Backend setup
```bash
cd kapybara
npm install
```

Create `.env` file:
```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
PORT=4000
FRONTEND_URL=http://localhost:3000
```

Initialize database:
```bash
npm run db:push
npm run db:seed
```

3) Frontend setup
```bash
cd ../frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

4) Run application

Terminal 1 — backend:
```bash
cd kapybara
npm run dev
# Backend at http://localhost:4000
```

Terminal 2 — frontend:
```bash
cd frontend
npm run dev
# Frontend at http://localhost:3000
```

---

## Available commands

### Backend commands (kapybara/)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production build |
| `npm run db:push` | Push database schema to PostgreSQL |
| `npm run db:studio` | Open Drizzle Studio (database GUI) |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:clean` | Drop all database tables |

### Frontend commands (frontend/)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |

---

## Application routes

### Frontend routes

Public pages:
- `/` - Landing page with hero and features
- `/blog` - Blog listing with category filtering
- `/blog/[slug]` - Individual post with markdown rendering

Dashboard (management):
- `/dashboard` - View all posts (published and drafts)
- `/dashboard/new` - Create new blog post
- `/dashboard/edit/[id]` - Edit existing post
- `/dashboard/categories` - Manage categories (CRUD)

### Backend API routes (tRPC)

Base URL: `http://localhost:4000/trpc`

Posts router (`posts.*`):
| Endpoint | Type | Input | Output |
|----------|------|-------|--------|
| `posts.getAll` | Query | `{ published?: boolean; categoryId?: number; limit?: number; offset?: number }` | Post array |
| `posts.getPublished` | Query | `-` | Post array (published only) |
| `posts.getBySlug` | Query | `{ slug: string }` | Post with categories |
| `posts.create` | Mutation | `{ title: string; content: string; excerpt?: string; slug: string; published?: boolean; categoryIds?: number[] }` | Created post |
| `posts.update` | Mutation | `{ id: number; title?: string; content?: string; excerpt?: string; slug?: string; published?: boolean; categoryIds?: number[] }` | Updated post |
| `posts.delete` | Mutation | `{ id: number }` | `{ success: true }` |
| `posts.generateSlug` | Query | `{ title: string }` | Unique slug string |

Categories router (`categories.*`):
| Endpoint | Type | Input | Output |
|----------|------|-------|--------|
| `categories.getAll` | Query | `-` | Category array |
| `categories.getBySlug` | Query | `{ slug: string }` | Single category |
| `categories.create` | Mutation | `{ name: string; description?: string; slug: string }` | Created category |
| `categories.update` | Mutation | `{ id: number; name?: string; description?: string; slug?: string }` | Updated category |
| `categories.delete` | Mutation | `{ id: number }` | `{ success: true }` |
| `categories.generateSlug` | Query | `{ name: string }` | Unique slug string |

---

## Assessment features implemented

### Priority 1: Core requirements (100%)
- Blog post CRUD operations
- Category CRUD operations
- Many-to-many relationship (posts and categories)
- Blog listing page with filtering
- Individual post view page
- Category filtering
- Responsive navigation
- Professional UI with dark theme

### Priority 2: Expected features (100%)
- Landing page (hero, features, footer)
- Dashboard for post management
- Draft vs published status
- Loading states (skeleton loaders)
- Error handling with user-friendly messages
- Mobile-responsive design
- Markdown editor

### Priority 3: Bonus features (partial)
- Post statistics (word count, reading time)
- Syntax highlighting for code blocks
- SEO-friendly slugs with auto-generation
- Full dark mode theme

---

## Technology stack

### Backend
- Node.js and Express — Web server
- tRPC v11 — Type-safe API layer
- PostgreSQL — Relational database (Neon cloud)
- Drizzle ORM v0.36 — Type-safe database access
- Zod v3 — Schema validation
- SuperJSON — Data serialization

### Frontend
- Next.js 15 — React framework with App Router
- TypeScript 5 — Full type safety
- Tailwind CSS — Utility-first styling
- tRPC Client — Type-safe API calls
- React Query — Server state management
- Zustand — Client state management
- react-markdown — Markdown rendering
- react-syntax-highlighter — Code syntax highlighting

---

## Project architecture

```
FullKapybara/
├── kapybara/                   # Backend
│   ├── src/
│   │   ├── server.ts          # Express + tRPC server
│   │   ├── lib/db/
│   │   │   ├── index.ts       # Database connection
│   │   │   └── schema.ts      # Drizzle schemas
│   │   └── server/api/
│   │       ├── trpc.ts        # tRPC config
│   │       ├── root.ts        # Root router
│   │       └── routers/
│   │           ├── posts.ts
│   │           └── categories.ts
│   ├── scripts/
│   │   ├── seed.ts
│   │   └── clean-db.ts
│   └── drizzle/               # Migrations
│
└── frontend/                   # Frontend
    ├── app/                   # Next.js App Router
    │   ├── layout.tsx         # Root layout
    │   ├── page.tsx           # Landing page
    │   ├── blog/              # Blog pages
    │   └── dashboard/         # Management pages
    ├── components/
    │   ├── ui/                # Reusable components
    │   └── layout/            # Layout components
    ├── lib/
    │   ├── trpc.ts            # tRPC client
    │   └── utils.ts           # Utilities
    ├── providers/
    │   └── trpc-provider.tsx  # React Query provider
    └── store/
        └── ui-store.ts        # Zustand store
```

---

## Design decisions

### Why markdown over a rich text editor?
- Faster implementation (saves time)
- Better version control compatibility
- Familiar to developers
- Lightweight and performant

### Why tRPC?
- End-to-end type safety without code generation
- Automatic type inference from backend to frontend
- Built-in React Query integration
- Superior DX compared to REST/GraphQL

### Why Drizzle ORM?
- Excellent TypeScript support
- SQL-like syntax (easier than Prisma)
- Lightweight with minimal overhead
- Simple migration system

### Why Zustand?
- Minimal boilerplate
- No providers needed
- Small bundle size (~1KB)
- Perfect for UI state

---

## Code quality

Type safety:
- Strict TypeScript throughout
- End-to-end type inference via tRPC
- Zod schemas for runtime validation

Error handling:
- Try-catch blocks in API procedures
- User-friendly error messages
- Loading states throughout UI

Performance:
- React Query caching
- Optimistic UI updates
- Next.js automatic code splitting
- Lazy loading components

User experience:
- Skeleton loaders for content
- Instant feedback on actions
- Mobile-responsive design
- Dark theme throughout
- Smooth transitions

---

## Deployment

### Backend (Railway or Render)
1. Create new project
2. Connect GitHub repository
3. Set environment variables:
   - `DATABASE_URL`
   - `PORT`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
4. Deploy from `kapybara` directory

### Frontend (Vercel)
1. Import project from GitHub
2. Set framework: Next.js
3. Set root directory: `frontend`
4. Set environment variable:
   - `NEXT_PUBLIC_API_URL` = your backend URL
5. Deploy

### Database (Neon or Supabase)
- Free PostgreSQL hosting
- Automatic backups
- Connection pooling

---

## Assessment summary

Status: complete and ready for review

Technical skills demonstrated:
- Modern React patterns (Server and Client Components)
- Type-safe full-stack development with tRPC
- Database design with proper relationships
- API design with RESTful principles
- State management strategies
- Responsive web design

Best practices:
- Clean code architecture
- Separation of concerns
- Comprehensive error handling
- Type safety throughout
- Loading and error states
- Mobile-first responsive design

Production quality:
- Input validation and sanitization
- Database constraints and cascading
- Optimistic UI updates
- Caching strategies
- Professional UI/UX

---

## Notes

Authentication: Not implemented as per assessment requirements. The platform is public and does not require user authentication.

Testing: Not included in this assessment scope, but the architecture supports easy integration of Jest, React Testing Library, and Playwright.

Scalability: The codebase is structured to easily add features like user authentication, image uploads, comments, search, pagination, and tags.

---

## License

MIT License — free to use for learning and reference.



| `posts.getPublished` | Query | Get published posts only | - | Post array || Command | Description |

| `posts.getBySlug` | Query | Get post by slug | `{ slug: string }` | Post + categories |

| `posts.create` | Mutation | Create new post | Post data + category IDs | Created post ||---------|-------------|   ```- **Node.js** - Runtime environment

| `posts.update` | Mutation | Update post | Post ID + updated data | Updated post |

| `posts.delete` | Mutation | Delete post | `{ id: number }` | Success message || `npm run dev` | Start Next.js development server |

| `posts.generateSlug` | Query | Generate unique slug | `{ text: string }` | Unique slug |

| `npm run build` | Build for production |- **Express** - Web server framework

</details>

| `npm start` | Run production build |

<details open>

<summary><b>📁 Categories Router (`categories.*`)</b></summary>| `npm run lint` | Run ESLint |   Create `.env.local` file:- **tRPC** - Type-safe API layer

<br>



| Endpoint | Type | Description | Input | Output |

|----------|------|-------------|-------|--------|---   ```env- **PostgreSQL** - Database

| `categories.getAll` | Query | Get all categories | - | Category array |

| `categories.getBySlug` | Query | Get single category | `{ slug: string }` | Single category |

| `categories.create` | Mutation | Create category | Category data | Created category |

| `categories.update` | Mutation | Update category | ID + data | Updated category |## Application Routes   NEXT_PUBLIC_API_URL=http://localhost:4000- **Drizzle ORM** - Type-safe database access

| `categories.delete` | Mutation | Delete category | `{ id: number }` | Success message |

| `categories.generateSlug` | Query | Generate unique slug | `{ text: string }` | Unique slug |



</details>### Frontend Routes   ```- **Zod** - Schema validation



---



## ✅ Assessment Features Implemented**Public Pages:**- **SuperJSON** - Data serialization



<table>| Route | Description |

<tr>

<td width="33%">|-------|-------------|### Running the Application



### 🎯 Priority 1| `/` | Landing page with hero and features |

**Core Requirements**

| `/blog` | Blog listing with category filtering |## 📁 Project Structure

![Progress](https://img.shields.io/badge/Progress-100%25-success?style=flat-square)

| `/blog/[slug]` | Individual post with markdown rendering |

- ✅ Blog Post CRUD

- ✅ Category CRUD**Terminal 1 - Backend:**

- ✅ Many-to-Many Relations

- ✅ Blog Listing Page**Dashboard (Management):**

- ✅ Individual Post View

- ✅ Category Filtering| Route | Description |```bash```

- ✅ Responsive Navigation

- ✅ Professional UI|-------|-------------|



</td>| `/dashboard` | View all posts (published & drafts) |cd kapybaraFullKapybara/

<td width="33%">

| `/dashboard/new` | Create new blog post |

### 🎯 Priority 2

**Expected Features**| `/dashboard/edit/[id]` | Edit existing post |npm run dev├── kapybara/                  # Backend application



![Progress](https://img.shields.io/badge/Progress-100%25-success?style=flat-square)| `/dashboard/categories` | Manage categories (CRUD) |



- ✅ Landing Page```│   ├── src/

- ✅ Dashboard

- ✅ Draft vs Published### Backend API Routes (tRPC)

- ✅ Loading States

- ✅ Error HandlingBackend runs on: `http://localhost:4000`│   │   ├── server.ts         # Express server setup

- ✅ Mobile Responsive

- ✅ Markdown EditorBase URL: `http://localhost:4000/trpc`



</td>│   │   ├── lib/

<td width="34%">

**Posts Router (`posts.*`):**

### 🎯 Priority 3

**Bonus Features**| Endpoint | Type | Description | Input | Output |**Terminal 2 - Frontend:**│   │   │   └── db/



![Progress](https://img.shields.io/badge/Progress-Partial-blue?style=flat-square)|----------|------|-------------|-------|--------|



- ✅ Post Statistics| `posts.getAll` | Query | Get all posts | `{ published?: boolean }` | Post array |```bash│   │   │       ├── index.ts  # Database connection

- ✅ Syntax Highlighting

- ✅ SEO-friendly Slugs| `posts.getPublished` | Query | Get published posts only | - | Post array |

- ✅ Dark Mode

| `posts.getBySlug` | Query | Get post by slug | `{ slug: string }` | Post + categories |cd frontend│   │   │       └── schema.ts # Drizzle schema definitions

</td>

</tr>| `posts.create` | Mutation | Create new post | Post data + category IDs | Created post |

</table>

| `posts.update` | Mutation | Update post | Post ID + updated data | Updated post |npm run dev│   │   └── server/

---

| `posts.delete` | Mutation | Delete post | `{ id: number }` | Success message |

## 🛠️ Feature Implementation Details

| `posts.generateSlug` | Query | Generate unique slug | `{ text: string }` | Unique slug |```│   │       └── api/

<details>

<summary><b>1️⃣ Blog Post Management (CRUD)</b></summary>

<br>

**Categories Router (`categories.*`):**Frontend runs on: `http://localhost:3000`│   │           ├── trpc.ts   # tRPC initialization

**Files:**

- Backend: `kapybara/src/server/api/routers/posts.ts`| Endpoint | Type | Description | Input | Output |

- Frontend: `frontend/app/dashboard/page.tsx`, `/new/page.tsx`, `/edit/[id]/page.tsx`

- Schema: `kapybara/src/lib/db/schema.ts`|----------|------|-------------|-------|--------|│   │           ├── root.ts   # Root router



**Implementation:**| `categories.getAll` | Query | Get all categories | - | Category array |

- tRPC procedures for all CRUD operations

- Drizzle ORM for type-safe database queries| `categories.getBySlug` | Query | Get single category | `{ slug: string }` | Single category |---│   │           └── routers/

- Zod validation for input sanitization

- Automatic slug generation with uniqueness checks| `categories.create` | Mutation | Create category | Category data | Created category |

- Draft/published status toggle

- Timestamps (createdAt, updatedAt)| `categories.update` | Mutation | Update category | ID + data | Updated category |│   │               ├── posts.ts      # Posts API



</details>| `categories.delete` | Mutation | Delete category | `{ id: number }` | Success message |



<details>| `categories.generateSlug` | Query | Generate unique slug | `{ text: string }` | Unique slug |## 📋 Available Commands│   │               └── categories.ts # Categories API

<summary><b>2️⃣ Category Management</b></summary>

<br>



**Files:**---│   ├── drizzle/              # Database migrations

- Backend: `kapybara/src/server/api/routers/categories.ts`

- Frontend: `frontend/app/dashboard/categories/page.tsx`

- Schema: Many-to-many junction table in schema

## Assessment Features Implemented### Backend Commands (`kapybara/`)│   ├── scripts/

**Implementation:**

- Separate tRPC router for categories

- Many-to-many relationship via `postCategories` junction table

- Cascade deletes for data integrity### Priority 1: Core Requirements (100%)│   │   └── seed.ts          # Database seeding

- Category filtering on blog listing page

- Auto-generate slugs from category names- **Blog Post CRUD:** Full create, read, update, delete operations



</details>- **Category CRUD:** Complete category management system| Command | Description |│   └── package.json



<details>- **Many-to-Many Relationship:** Posts can have multiple categories

<summary><b>3️⃣ Type-Safe API Layer (tRPC)</b></summary>

<br>- **Blog Listing Page:** Display published posts with filtering|---------|-------------|│



**Files:**- **Individual Post View:** Full post display with markdown

- Backend: `kapybara/src/server/api/trpc.ts`, `root.ts`

- Frontend: `frontend/lib/trpc.ts`, `providers/trpc-provider.tsx`- **Category Filtering:** Filter posts by selected category| `npm run dev` | Start development server with hot reload |└── frontend/                  # Next.js frontend application



**Implementation:**- **Responsive Navigation:** Mobile-friendly navbar with hamburger menu

- End-to-end type safety without code generation

- Automatic type inference from backend to frontend- **Professional UI:** Clean, dark-themed interface using Tailwind CSS| `npm run build` | Compile TypeScript to JavaScript |    ├── app/                  # App Router pages

- React Query integration for caching and optimistic updates

- Zod schemas for runtime validation

- SuperJSON for date serialization

### Priority 2: Expected Features (100%)| `npm start` | Run production build |    │   ├── layout.tsx       # Root layout

</details>

- **Landing Page:** Hero section + features showcase + footer

<details>

<summary><b>4️⃣ Markdown Rendering</b></summary>- **Dashboard:** Central hub for managing posts and categories| `npm run db:push` | Push database schema to PostgreSQL |    │   ├── page.tsx         # Landing page

<br>

- **Draft vs Published:** Save drafts and publish when ready

**Files:**

- Frontend: `frontend/app/blog/[slug]/page.tsx`- **Loading States:** Skeleton loaders and spinners throughout| `npm run db:studio` | Open Drizzle Studio (database GUI) |    │   ├── blog/



**Implementation:**- **Error Handling:** User-friendly error messages and graceful recovery

- `react-markdown` with GitHub Flavored Markdown

- `react-syntax-highlighter` with Prism theme- **Mobile Responsive:** Fully responsive across all device sizes| `npm run db:seed` | Seed database with sample data |    │   │   ├── page.tsx     # Blog listing

- Dark-themed code blocks

- Support for headings, lists, blockquotes, links, inline code- **Markdown Editor:** Simple textarea-based markdown input



</details>| `npm run db:clean` | Drop all database tables |    │   │   └── [slug]/



<details>### Priority 3: Bonus Features (Partial)

<summary><b>5️⃣ State Management</b></summary>

<br>- **Post Statistics:** Word count and reading time calculation    │   │       └── page.tsx # Individual post



**Files:**- **Syntax Highlighting:** Code blocks with Prism highlighting

- Server State: React Query via tRPC (automatic)

- Client State: `frontend/store/ui-store.ts` (Zustand)- **SEO-friendly Slugs:** Auto-generation with uniqueness validation### Frontend Commands (`frontend/`)    │   └── dashboard/



**Implementation:**- **Dark Mode:** Full dark theme implementation

- React Query handles all server state (posts, categories)

- Automatic caching and invalidation    │       ├── page.tsx     # Dashboard

- Optimistic updates for better UX

- Zustand for UI state (mobile menu toggle)---



</details>| Command | Description |    │       ├── new/



<details>## Feature Implementation Details

<summary><b>6️⃣ Database Design</b></summary>

<br>|---------|-------------|    │       │   └── page.tsx # Create post



**Schema:**### 1. Blog Post Management

```typescript

// Posts Table**Files:**| `npm run dev` | Start Next.js development server |    │       ├── edit/

- id: serial primary key

- title: varchar(255) not null- Backend: `kapybara/src/server/api/routers/posts.ts`

- content: text not null

- excerpt: text nullable- Frontend: `frontend/app/dashboard/page.tsx`, `/new/page.tsx`, `/edit/[id]/page.tsx`| `npm run build` | Build for production |    │       │   └── [id]/

- slug: varchar(255) unique not null

- published: boolean default false- Schema: `kapybara/src/lib/db/schema.ts`

- createdAt: timestamp default now()

- updatedAt: timestamp default now()| `npm start` | Run production build |    │       │       └── page.tsx # Edit post



// Categories Table**Implementation:**

- id: serial primary key

- name: varchar(255) not null- tRPC procedures for all CRUD operations| `npm run lint` | Run ESLint |

- description: text nullable

- slug: varchar(255) unique not null- Drizzle ORM for type-safe database queries

- createdAt: timestamp default now()

- updatedAt: timestamp default now()- Zod validation for input sanitization---



// PostCategories Junction Table- Automatic slug generation with uniqueness checks

- postId: integer -> posts(id) on delete cascade

- categoryId: integer -> categories(id) on delete cascade- Draft/published status toggle## Application Routes    │       └── categories/

- primary key: (postId, categoryId)

```- Timestamps (createdAt, updatedAt)



**Features:**    │           └── page.tsx # Category management

- Foreign key constraints with cascade deletes

- Unique constraints on slugs### 2. Category Management

- Many-to-many relationship support

- Timestamps for audit trails**Files:**---    ├── components/



</details>- Backend: `kapybara/src/server/api/routers/categories.ts`



---- Frontend: `frontend/app/dashboard/categories/page.tsx`    │   ├── ui/              # Reusable UI components



## 🧰 Technology Stack- Schema: Many-to-many junction table in schema



<table>## 🗺️ Application Routes    │   │   ├── button.tsx

<tr>

<td width="50%">**Implementation:**



### 🔧 Backend- Separate tRPC router for categories    │   │   ├── input.tsx



| Technology | Purpose |- Many-to-many relationship via `postCategories` junction table

|------------|---------|

| **Node.js + Express** | Web server |- Cascade deletes for data integrity### Frontend Routes    │   │   ├── textarea.tsx

| **tRPC v11** | Type-safe API layer |

| **PostgreSQL** | Relational database |- Category filtering on blog listing page

| **Drizzle ORM v0.36** | Type-safe database access |

| **Zod v3** | Schema validation |- Auto-generate slugs from category names    │   │   ├── select.tsx

| **SuperJSON** | Data serialization |



</td>

<td width="50%">### 3. Type-Safe API Layer (tRPC)#### Public Pages    │   │   ├── card.tsx



### 💻 Frontend**Files:**



| Technology | Purpose |- Backend: `kapybara/src/server/api/trpc.ts`, `root.ts`    │   │   └── loading.tsx

|------------|---------|

| **Next.js 15** | React framework (App Router) |- Frontend: `frontend/lib/trpc.ts`, `providers/trpc-provider.tsx`

| **TypeScript 5** | Full type safety |

| **Tailwind CSS** | Utility-first styling || Route | Description | Features |    │   └── layout/          # Layout components

| **tRPC Client** | Type-safe API calls |

| **React Query** | Server state management |**Implementation:**

| **Zustand** | Client state management |

| **react-markdown** | Markdown rendering |- End-to-end type safety without code generation|-------|-------------|----------|    │       ├── navbar.tsx

| **react-syntax-highlighter** | Code highlighting |

- Automatic type inference from backend to frontend

</td>

</tr>- React Query integration for caching and optimistic updates| `/` | Landing page | Hero section, features overview |    │       └── footer.tsx

</table>

- Zod schemas for runtime validation

---

- SuperJSON for date serialization| `/blog` | Blog listing | View all published posts, filter by category |    ├── lib/

## 🏗️ Project Architecture



```

FullKapybara/### 4. Markdown Rendering| `/blog/[slug]` | Individual post | Full post view with markdown rendering, syntax highlighting |    │   ├── trpc.ts         # tRPC client setup

├── kapybara/                          # Backend

│   ├── src/**Files:**

│   │   ├── server.ts                 # Express + tRPC server

│   │   ├── lib/db/- Frontend: `frontend/app/blog/[slug]/page.tsx`    │   └── utils.ts        # Utility functions

│   │   │   ├── index.ts              # Database connection

│   │   │   └── schema.ts             # Drizzle schema

│   │   └── server/api/

│   │       ├── trpc.ts               # tRPC config**Implementation:**#### Dashboard Pages (Management)    ├── providers/

│   │       ├── root.ts               # Root router

│   │       └── routers/- `react-markdown` with GitHub Flavored Markdown

│   │           ├── posts.ts          # Posts API

│   │           └── categories.ts     # Categories API- `react-syntax-highlighter` with Prism theme    │   └── trpc-provider.tsx # tRPC React Query provider

│   ├── scripts/

│   │   ├── seed.ts                   # Seed data- Dark-themed code blocks

│   │   └── clean-db.ts               # Database cleanup

│   ├── drizzle/                      # Migrations- Support for headings, lists, blockquotes, links, inline code| Route | Description | Features |    ├── store/

│   ├── .env                          # Environment variables

│   └── package.json

│

└── frontend/                          # Frontend### 5. State Management|-------|-------------|----------|    │   └── ui-store.ts     # Zustand store

    ├── app/                          # Next.js App Router

    │   ├── layout.tsx                # Root layout**Files:**

    │   ├── page.tsx                  # Landing page

    │   ├── blog/- Server State: React Query via tRPC (automatic)| `/dashboard` | Dashboard home | View all posts (published & drafts), quick actions |    ├── types/

    │   │   ├── page.tsx              # Blog listing

    │   │   └── [slug]/page.tsx       # Post view- Client State: `frontend/store/ui-store.ts` (Zustand)

    │   └── dashboard/

    │       ├── page.tsx              # Dashboard| `/dashboard/new` | Create post | Form to create new blog post with markdown editor |    │   └── index.ts        # TypeScript type definitions

    │       ├── new/page.tsx          # Create post

    │       ├── edit/[id]/page.tsx    # Edit post**Implementation:**

    │       └── categories/page.tsx   # Category management

    ├── components/- React Query handles all server state (posts, categories)| `/dashboard/edit/[id]` | Edit post | Update existing post, change publish status |    └── package.json

    │   ├── ui/                       # UI components

    │   └── layout/                   # Layout components- Automatic caching and invalidation

    ├── lib/

    │   ├── trpc.ts                   # tRPC client- Optimistic updates for better UX| `/dashboard/categories` | Manage categories | CRUD operations for categories |```

    │   └── utils.ts                  # Utilities

    ├── providers/- Zustand for UI state (mobile menu toggle)

    │   └── trpc-provider.tsx         # React Query provider

    ├── store/

    │   └── ui-store.ts               # Zustand store

    ├── .env.local                    # Environment variables### 6. Database Design

    └── package.json

```**Schema:**### Backend API Routes (tRPC)## 🚦 Getting Started



---```typescript



## 💡 Design Decisions & Rationale// Posts Table



<details>- id: serial primary key

<summary><b>❓ Why Markdown Instead of Rich Text Editor?</b></summary>

<br>- title: varchar(255) not nullBase URL: `http://localhost:4000/trpc`### Prerequisites



- **Time Efficient:** Saves 2-3 hours of implementation time- content: text not null

- **Developer Friendly:** Familiar to technical users

- **Version Control:** Works well with Git- excerpt: text nullable- Node.js 18+ installed

- **Lightweight:** Smaller bundle size

- **Flexible:** Easy to parse and sanitize- slug: varchar(255) unique not null



</details>- published: boolean default false#### Posts Router (`posts.*`)- PostgreSQL database (local or hosted)



<details>- createdAt: timestamp default now()

<summary><b>❓ Why tRPC?</b></summary>

<br>- updatedAt: timestamp default now()- npm or yarn package manager



- **Type Safety:** End-to-end types without code generation

- **Auto Inference:** Types automatically flow from backend to frontend

- **React Query:** Built-in integration with caching// Categories Table| Endpoint | Method | Description | Input | Output |

- **Better DX:** Superior developer experience compared to REST/GraphQL

- id: serial primary key

</details>

- name: varchar(255) not null|----------|--------|-------------|-------|--------|### Backend Setup

<details>

<summary><b>❓ Why Drizzle ORM?</b></summary>- description: text nullable

<br>

- slug: varchar(255) unique not null| `posts.getAll` | Query | Get all posts | `{ published?: boolean }` | Array of posts |

- **Type Safety:** Excellent TypeScript support

- **SQL-like:** Easier learning curve than Prisma- createdAt: timestamp default now()

- **Lightweight:** Minimal runtime overhead

- **Migrations:** Simple migration system- updatedAt: timestamp default now()| `posts.getPublished` | Query | Get published posts only | - | Array of published posts |1. **Navigate to backend directory:**



</details>



<details>// PostCategories Junction Table| `posts.getBySlug` | Query | Get single post by slug | `{ slug: string }` | Single post with categories |   ```bash

<summary><b>❓ Why Zustand for UI State?</b></summary>

<br>- postId: integer -> posts(id) on delete cascade



- **Simple:** Minimal boilerplate- categoryId: integer -> categories(id) on delete cascade| `posts.create` | Mutation | Create new post | Post data + category IDs | Created post |   cd kapybara

- **No Providers:** Cleaner than Context API

- **Small:** ~1KB bundle size- primary key: (postId, categoryId)

- **Focused:** Perfect for UI state like modals and menus

```| `posts.update` | Mutation | Update existing post | Post ID + updated data | Updated post |   ```

</details>



---

**Features:**| `posts.delete` | Mutation | Delete post | `{ id: number }` | Success message |

## 🎨 Code Quality Features

- Foreign key constraints with cascade deletes

<table>

<tr>- Unique constraints on slugs| `posts.generateSlug` | Query | Generate unique slug | `{ text: string }` | Unique slug string |2. **Install dependencies:**

<td width="50%">

- Many-to-many relationship support

### 🔒 Type Safety

- Strict TypeScript throughout- Timestamps for audit trails   ```bash

- Minimal use of `any` types

- End-to-end type inference via tRPC

- Zod schemas for runtime validation

---#### Categories Router (`categories.*`)   npm install

### ⚠️ Error Handling

- Try-catch blocks in all API procedures

- User-friendly error messages

- Loading states throughout UI## Technology Stack   ```

- Empty state handling



</td>

<td width="50%">### Backend| Endpoint | Method | Description | Input | Output |



### ⚡ Performance- **Node.js + Express:** Web server

- React Query caching

- Optimistic UI updates- **tRPC v11:** Type-safe API layer|----------|--------|-------------|-------|--------|3. **Configure environment variables:**

- Next.js automatic code splitting

- Lazy loading components- **PostgreSQL:** Relational database



### 🎯 User Experience- **Drizzle ORM v0.36:** Type-safe database access| `categories.getAll` | Query | Get all categories | - | Array of categories |   Create a `.env` file in the `kapybara` directory:

- Skeleton loaders for content

- Instant feedback on actions- **Zod v3:** Schema validation

- Mobile-responsive design

- Dark theme throughout- **SuperJSON:** Data serialization| `categories.getBySlug` | Query | Get single category | `{ slug: string }` | Single category |   ```env

- Smooth transitions



</td>

</tr>### Frontend| `categories.create` | Mutation | Create new category | Category data | Created category |   DATABASE_URL=postgresql://username:password@localhost:5432/kapybara_blog

</table>

- **Next.js 15:** React framework with App Router

---

- **TypeScript 5:** Full type safety| `categories.update` | Mutation | Update category | Category ID + data | Updated category |   PORT=4000

## 🚀 Deployment Guide

- **Tailwind CSS:** Utility-first styling

<details>

<summary><b>🔧 Backend Deployment (Railway/Render)</b></summary>- **tRPC Client:** Type-safe API calls| `categories.delete` | Mutation | Delete category | `{ id: number }` | Success message |   FRONTEND_URL=http://localhost:3000

<br>

- **React Query:** Server state management

1. Create new project

2. Connect GitHub repository- **Zustand:** Client state management| `categories.generateSlug` | Query | Generate unique slug | `{ text: string }` | Unique slug string |

3. Set environment variables:

   - `DATABASE_URL`- **react-markdown:** Markdown rendering

   - `PORT`

   - `FRONTEND_URL`- **react-syntax-highlighter:** Code highlighting---

   - `NODE_ENV=production`

4. Deploy from `kapybara` directory



</details>---## Features Implementation   ```



<details>

<summary><b>💻 Frontend Deployment (Vercel)</b></summary>

<br>---



1. Import project from GitHub## 🏗️ Project Architecture

2. Set framework: Next.js

3. Set root directory: `frontend`

4. Set environment variables:

   - `NEXT_PUBLIC_API_URL` = backend URL```---4. **Push database schema:**

5. Deploy

FullKapybara/

</details>

├── kapybara/                          # Backend   ```bash

<details>

<summary><b>🗄️ Database Hosting Options</b></summary>│   ├── src/

<br>

│   │   ├── server.ts                 # Express + tRPC server## ✨ Features Implementation   npm run db:push

- **Neon:** Free PostgreSQL hosting (recommended)

- **Supabase:** Free tier with additional features│   │   ├── lib/db/

- **Railway:** PostgreSQL add-on

- **AWS RDS:** Production-grade hosting│   │   │   ├── index.ts              # Database connection   ```



</details>│   │   │   └── schema.ts             # Drizzle schema



---│   │   └── server/api/### 1. Blog Post Management (CRUD)



## 🎓 Assessment Completion Summary│   │       ├── trpc.ts               # tRPC config



<div align="center">│   │       ├── root.ts               # Root router5. **Seed the database (optional):**



### Project Status: ✅ **Complete and Ready for Review**│   │       └── routers/



</div>│   │           ├── posts.ts          # Posts API**Implementation:**   ```bash



**📚 Technical Skills Demonstrated:**│   │           └── categories.ts     # Categories API

- Modern React patterns (Server Components, Client Components)

- Type-safe full-stack development with tRPC│   ├── scripts/- **Backend:** tRPC router in `kapybara/src/server/api/routers/posts.ts`   npm run db:seed

- Database design with proper relationships

- API design with RESTful principles│   │   ├── seed.ts                   # Seed data

- State management strategies

- Responsive web design│   │   └── clean-db.ts               # Database cleanup- **Database:** Drizzle ORM schema in `kapybara/src/lib/db/schema.ts`   ```



**✨ Best Practices:**│   ├── drizzle/                      # Migrations

- Clean code architecture

- Separation of concerns│   ├── .env                          # Environment variables- **Frontend:** React components with tRPC hooks

- Error handling and validation

- Type safety throughout│   └── package.json

- Loading and error states

- Mobile-first responsive design│6. **Start the backend server:**



**🏆 Production Quality:**└── frontend/                          # Frontend

- Comprehensive error handling

- Input validation and sanitization    ├── app/                          # Next.js App Router**Key Files:**   ```bash

- Database constraints and cascading

- Optimistic UI updates    │   ├── layout.tsx                # Root layout

- Caching strategies

- Professional UI/UX    │   ├── page.tsx                  # Landing page- `dashboard/page.tsx` - List all posts   npm run dev



---    │   ├── blog/



## 📝 Notes    │   │   ├── page.tsx              # Blog listing- `dashboard/new/page.tsx` - Create new post   ```



> **💡 Authentication:** Not implemented as per assessment requirements. The platform is public and does not require user authentication.    │   │   └── [slug]/page.tsx       # Post view



> **🧪 Testing:** Not included in this assessment scope, but the architecture supports easy integration of Jest, React Testing Library, and Playwright.    │   └── dashboard/- `dashboard/edit/[id]/page.tsx` - Edit existing post   Backend will run on `http://localhost:4000`



> **📈 Scalability:** The codebase is structured to easily add features like:    │       ├── page.tsx              # Dashboard

> - User authentication

> - Image uploads    │       ├── new/page.tsx          # Create post

> - Comments system

> - Post search    │       ├── edit/[id]/page.tsx    # Edit post

> - Pagination

> - Tags in addition to categories    │       └── categories/page.tsx   # Category management**Features:**### Frontend Setup



---    ├── components/



<div align="center">    │   ├── ui/                       # UI components- ✅ Create posts with title, content, excerpt, and slug



