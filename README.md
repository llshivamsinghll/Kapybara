# 📝 Full-Stack Blogging Platform<div align="center"><div align="center"># Full-Stack Blogging Platform - Assessment Project# Multi-User Blogging Platform# Kapybara Blog - Full-Stack Blogging Platform



**Assessment Project** - A modern multi-user blogging platform demonstrating production-quality code with end-to-end type safety, clean architecture, and modern React patterns.



![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)# 📝 Full-Stack Blogging Platform

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)### Assessment Project# 📝 Full-Stack Blogging Platform



---



## 🚀 Quick Start*A modern multi-user blogging platform demonstrating production-quality code with end-to-end type safety, clean architecture, and modern React patterns.*



### Prerequisites

- Node.js 18+

- PostgreSQL database (Neon cloud recommended)---### Assessment ProjectA modern multi-user blogging platform built as a full-stack developer assessment, demonstrating production-quality code with end-to-end type safety, clean architecture, and modern React patterns.

- npm or yarn



### Installation & Setup

**Tech Stack**

**1. Clone Repository**

```bash

git clone <repository-url>

cd FullKapybara![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)*A modern multi-user blogging platform demonstrating production-quality code with end-to-end type safety, clean architecture, and modern React patterns.*

```

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**2. Backend Setup**

```bash![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)

cd kapybara

npm install![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

```

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)---**Tech Stack:** Next.js 15, tRPC, PostgreSQL, Drizzle ORM, TypeScript, Tailwind CSSA modern, full-stack blogging platform built with Next.js 15, tRPC, PostgreSQL, and Drizzle ORM. This project demonstrates production-quality code with end-to-end type safety, clean architecture, and modern React patterns.A modern, full-stack blogging platform built with Next.js 15, tRPC, PostgreSQL, and Drizzle ORM. This project demonstrates production-quality code with end-to-end type safety, clean architecture, and modern React patterns.

Create `.env` file:

```env

DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

PORT=4000---

FRONTEND_URL=http://localhost:3000

```



Initialize database:</div>**Tech Stack**

```bash

npm run db:push

npm run db:seed

```## 🚀 Quick Start



**3. Frontend Setup**

```bash

cd ../frontend### 📋 Prerequisites![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)---

npm install

```



Create `.env.local` file:```![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

```env

NEXT_PUBLIC_API_URL=http://localhost:4000✓ Node.js 18+

```

✓ PostgreSQL database (Neon cloud recommended)![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)

**4. Run Application**

✓ npm or yarn

Terminal 1 - Backend:

```bash```![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

cd kapybara

npm run dev

# Backend: http://localhost:4000

```### 📦 Installation![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)## Quick Start## 🚀 Quick Start## 🚀 Features Implemented



Terminal 2 - Frontend:

```bash

cd frontend#### **Step 1: Clone the repository**

npm run dev

# Frontend: http://localhost:3000```bash

```

git clone <repository-url>---

---

cd FullKapybara

## 📋 Available Commands

```

### Backend Commands (`kapybara/`)



| Command | Description |

|---------|-------------|#### **Step 2: Backend Setup**</div>### Prerequisites

| `npm run dev` | Start development server with hot reload |

| `npm run build` | Compile TypeScript to JavaScript |```bash

| `npm start` | Run production build |

| `npm run db:push` | Push database schema to PostgreSQL |cd kapybara

| `npm run db:studio` | Open Drizzle Studio (database GUI) |

| `npm run db:seed` | Seed database with sample data |npm install

| `npm run db:clean` | Drop all database tables |

```## 🚀 Quick Start- Node.js 18+

### Frontend Commands (`frontend/`)



| Command | Description |

|---------|-------------|Create `.env` file in `kapybara/`:

| `npm run dev` | Start Next.js development server |

| `npm run build` | Build for production |```env

| `npm start` | Run production build |

| `npm run lint` | Run ESLint |DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"### 📋 Prerequisites- PostgreSQL database (local or cloud hosting like Neon)### Prerequisites### ✅ Priority 1 - Core Requirements (Must Have)



---PORT=4000



## 🗺️ Application RoutesFRONTEND_URL=http://localhost:3000



### Frontend Routes```



**Public Pages:**```- npm or yarn

- `/` - Landing page with hero and features

- `/blog` - Blog listing with category filteringInitialize database:

- `/blog/[slug]` - Individual post with markdown rendering

```bash✓ Node.js 18+

**Dashboard (Management):**

- `/dashboard` - View all posts (published & drafts)npm run db:push

- `/dashboard/new` - Create new blog post

- `/dashboard/edit/[id]` - Edit existing postnpm run db:seed✓ PostgreSQL database (local or cloud hosting like Neon)- [x] **Blog post CRUD operations** - Create, read, update, and delete posts

- `/dashboard/categories` - Manage categories (CRUD)

```

### Backend API Routes (tRPC)

✓ npm or yarn

**Base URL:** `http://localhost:4000/trpc`

#### **Step 3: Frontend Setup**

**Posts Router (`posts.*`):**

| Endpoint | Type | Input | Output |```bash```### Installation

|----------|------|-------|--------|

| `posts.getAll` | Query | `{ published?: boolean }` | Post array |cd ../frontend

| `posts.getPublished` | Query | - | Post array |

| `posts.getBySlug` | Query | `{ slug: string }` | Post + categories |npm install

| `posts.create` | Mutation | Post data + category IDs | Created post |

| `posts.update` | Mutation | Post ID + data | Updated post |```

| `posts.delete` | Mutation | `{ id: number }` | Success message |

| `posts.generateSlug` | Query | `{ text: string }` | Unique slug |### 📦 Installation- Node.js 18+ - [x] **Category CRUD operations** - Full category management system



**Categories Router (`categories.*`):**Create `.env.local` file in `frontend/`:

| Endpoint | Type | Input | Output |

|----------|------|-------|--------|```env

| `categories.getAll` | Query | - | Category array |

| `categories.getBySlug` | Query | `{ slug: string }` | Single category |NEXT_PUBLIC_API_URL=http://localhost:4000

| `categories.create` | Mutation | Category data | Created category |

| `categories.update` | Mutation | ID + data | Updated category |```#### **Step 1: Clone the repository****1. Clone the repository**

| `categories.delete` | Mutation | `{ id: number }` | Success message |

| `categories.generateSlug` | Query | `{ text: string }` | Unique slug |



---### ▶️ Running the Application```bash



## ✅ Assessment Features Implemented



### Priority 1: Core Requirements (100%)<table>git clone <repository-url>```bash- PostgreSQL database (local or cloud)- [x] **Assign categories to posts** - Many-to-many relationship support

- ✅ Blog Post CRUD operations

- ✅ Category CRUD operations<tr>

- ✅ Many-to-Many relationship (posts + categories)

- ✅ Blog listing page with filtering<td width="50%">cd FullKapybara

- ✅ Individual post view page

- ✅ Category filtering

- ✅ Responsive navigation

- ✅ Professional UI with dark theme**🔧 Terminal 1: Backend**```git clone <repository-url>



### Priority 2: Expected Features (100%)

- ✅ Landing page (Hero + Features + Footer)

- ✅ Dashboard for post management```bash

- ✅ Draft vs Published status

- ✅ Loading states (skeleton loaders)cd kapybara

- ✅ Error handling with user-friendly messages

- ✅ Mobile-responsive designnpm run dev#### **Step 2: Backend Setup**cd FullKapybara- npm or yarn- [x] **Blog listing page** - Display all published posts with filtering

- ✅ Markdown editor

```

### Priority 3: Bonus Features (Partial)

- ✅ Post statistics (word count, reading time)```bash

- ✅ Syntax highlighting for code blocks

- ✅ SEO-friendly slugs with auto-generation🌐 **Backend:** `http://localhost:4000`

- ✅ Full dark mode theme

cd kapybara```

---

</td>

## 🧰 Technology Stack

<td width="50%">npm install

### Backend

- **Node.js + Express** - Web server

- **tRPC v11** - Type-safe API layer

- **PostgreSQL** - Relational database (Neon cloud)**💻 Terminal 2: Frontend**```- [x] **Individual post view page** - Full post display with markdown rendering

- **Drizzle ORM v0.36** - Type-safe database access

- **Zod v3** - Schema validation

- **SuperJSON** - Data serialization

```bash

### Frontend

- **Next.js 15** - React framework with App Routercd frontend

- **TypeScript 5** - Full type safety

- **Tailwind CSS** - Utility-first stylingnpm run devCreate `.env` file in `kapybara/`:#### **Step 2: Backend Setup**

- **tRPC Client** - Type-safe API calls

- **React Query** - Server state management```

- **Zustand** - Client state management

- **react-markdown** - Markdown rendering```env

- **react-syntax-highlighter** - Code syntax highlighting

🌐 **Frontend:** `http://localhost:3000`

---

DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"```bash### Installation & Setup- [x] **Category filtering** - Filter posts by categories

## 🏗️ Project Architecture

</td>

```

FullKapybara/</tr>PORT=4000

├── kapybara/                   # Backend

│   ├── src/</table>

│   │   ├── server.ts          # Express + tRPC server

│   │   ├── lib/db/FRONTEND_URL=http://localhost:3000cd kapybara

│   │   │   ├── index.ts       # Database connection

│   │   │   └── schema.ts      # Drizzle schemas---

│   │   └── server/api/

│   │       ├── trpc.ts        # tRPC config```

│   │       ├── root.ts        # Root router

│   │       └── routers/## 📋 Available Commands

│   │           ├── posts.ts

│   │           └── categories.tsnpm install- [x] **Responsive navigation** - Mobile-friendly navigation with hamburger menu

│   ├── scripts/

│   │   ├── seed.ts### Backend Commands (`kapybara/`)

│   │   └── clean-db.ts

│   └── drizzle/               # MigrationsInitialize database:

│

└── frontend/                   # Frontend| Command | Description |

    ├── app/                   # Next.js App Router

    │   ├── layout.tsx         # Root layout|---------|-------------|```bash```

    │   ├── page.tsx           # Landing page

    │   ├── blog/              # Blog pages| `npm run dev` | Start development server with hot reload |

    │   └── dashboard/         # Management pages

    ├── components/| `npm run build` | Compile TypeScript to JavaScript |npm run db:push

    │   ├── ui/                # Reusable components

    │   └── layout/            # Layout components| `npm start` | Run production build |

    ├── lib/

    │   ├── trpc.ts            # tRPC client| `npm run db:push` | Push database schema to PostgreSQL |npm run db:seed1. **Clone the repository**- [x] **Clean, professional UI** - Modern, accessible interface using Tailwind CSS

    │   └── utils.ts           # Utilities

    ├── providers/| `npm run db:studio` | Open Drizzle Studio (database GUI) |

    │   └── trpc-provider.tsx  # React Query provider

    └── store/| `npm run db:seed` | Seed database with sample data |```

        └── ui-store.ts        # Zustand store

```| `npm run db:clean` | Drop all database tables (reset) |



---Create `.env` file in `kapybara/`:



## 💡 Design Decisions### Frontend Commands (`frontend/`)



### Why Markdown Over Rich Text Editor?#### **Step 3: Frontend Setup**

- Faster implementation (saves 2-3 hours)

- Better version control compatibility| Command | Description |

- Familiar to developers

- Lightweight and performant|---------|-------------|```bash```env   ```bash



### Why tRPC?| `npm run dev` | Start Next.js development server |

- End-to-end type safety without code generation

- Automatic type inference from backend to frontend| `npm run build` | Build for production |cd ../frontend

- Built-in React Query integration

- Superior DX compared to REST/GraphQL| `npm start` | Run production build |



### Why Drizzle ORM?| `npm run lint` | Run ESLint |npm installDATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

- Excellent TypeScript support

- SQL-like syntax (easier than Prisma)

- Lightweight with minimal overhead

- Simple migration system---```



### Why Zustand?

- Minimal boilerplate

- No providers needed## 🗺️ Application RoutesPORT=4000   git clone <your-repo-url>### ✅ Priority 2 - Expected Features (Should Have)

- Small bundle size (~1KB)

- Perfect for UI state



---### 🌐 Frontend RoutesCreate `.env.local` file in `frontend/`:



## 🎨 Code Quality



**Type Safety:**<details open>```envFRONTEND_URL=http://localhost:3000

- Strict TypeScript throughout

- End-to-end type inference via tRPC<summary><b>📖 Public Pages</b></summary>

- Zod schemas for runtime validation

<br>NEXT_PUBLIC_API_URL=http://localhost:4000

**Error Handling:**

- Try-catch blocks in all API procedures

- User-friendly error messages

- Loading states throughout UI| Route | Description |``````   cd FullKapybara- [x] **Landing page** - Hero section, features showcase, and CTA sections



**Performance:**|-------|-------------|

- React Query caching

- Optimistic UI updates| `/` | Landing page with hero and features |

- Next.js automatic code splitting

- Lazy loading components| `/blog` | Blog listing with category filtering |



**User Experience:**| `/blog/[slug]` | Individual post with markdown rendering |### ▶️ Running the Application

- Skeleton loaders for content

- Instant feedback on actions

- Mobile-responsive design

- Dark theme throughout</details>

- Smooth transitions



---

<details open><table>Initialize database:   ```- [x] **Dashboard page** - Central hub for managing posts and categories

## 🚀 Deployment

<summary><b>🎛️ Dashboard (Management)</b></summary>

### Backend (Railway/Render)

1. Create new project<br><tr>

2. Connect GitHub repository

3. Set environment variables:

   - `DATABASE_URL`

   - `PORT`| Route | Description |<td width="50%">```bash

   - `FRONTEND_URL`

   - `NODE_ENV=production`|-------|-------------|

4. Deploy from `kapybara` directory

| `/dashboard` | View all posts (published & drafts) |

### Frontend (Vercel)

1. Import project from GitHub| `/dashboard/new` | Create new blog post |

2. Set framework: Next.js

3. Set root directory: `frontend`| `/dashboard/edit/[id]` | Edit existing post |**🔧 Terminal 1: Backend**npm run db:push- [x] **Draft vs Published status** - Save drafts and publish when ready

4. Set environment variable:

   - `NEXT_PUBLIC_API_URL` = your backend URL| `/dashboard/categories` | Manage categories (CRUD) |

5. Deploy



### Database (Neon/Supabase)

- Free PostgreSQL hosting</details>

- Automatic backups

- Connection pooling```bashnpm run db:seed



------



## 📊 Assessment Summarycd kapybara



**Status:** ✅ Complete and Ready for Review### 🔌 Backend API Routes (tRPC)



**Technical Skills Demonstrated:**npm run dev```2. **Backend Setup**- [x] **Loading states** - Skeleton loaders and spinners throughout

- Modern React patterns (Server & Client Components)

- Type-safe full-stack development with tRPC**Base URL:** `http://localhost:4000/trpc`

- Database design with proper relationships

- API design with RESTful principles```

- State management strategies

- Responsive web design<details open>



**Best Practices:**<summary><b>📄 Posts Router (`posts.*`)</b></summary>

- Clean code architecture

- Separation of concerns<br>

- Comprehensive error handling

- Type safety throughout🌐 **Backend:** `http://localhost:4000`

- Loading and error states

- Mobile-first responsive design| Endpoint | Type | Description | Input | Output |



**Production Quality:**|----------|------|-------------|-------|--------|#### **Step 3: Frontend Setup**   ```bash- [x] **Error handling** - User-friendly error messages and graceful recovery

- Input validation and sanitization

- Database constraints and cascading| `posts.getAll` | Query | Get all posts | `{ published?: boolean }` | Post array |

- Optimistic UI updates

- Caching strategies| `posts.getPublished` | Query | Get published posts only | - | Post array |</td>

- Professional UI/UX

| `posts.getBySlug` | Query | Get post by slug | `{ slug: string }` | Post + categories |

---

| `posts.create` | Mutation | Create new post | Post data + category IDs | Created post |<td width="50%">```bash

## 📝 Notes

| `posts.update` | Mutation | Update post | Post ID + updated data | Updated post |

**Authentication:** Not implemented as per assessment requirements. The platform is public and does not require user authentication.

| `posts.delete` | Mutation | Delete post | `{ id: number }` | Success message |

**Testing:** Not included in this assessment scope, but the architecture supports easy integration of Jest, React Testing Library, and Playwright.

| `posts.generateSlug` | Query | Generate unique slug | `{ text: string }` | Unique slug |

**Scalability:** The codebase is structured to easily add features like user authentication, image uploads, comments, search, pagination, and tags.

**💻 Terminal 2: Frontend**cd ../frontend   cd kapybara- [x] **Mobile-responsive design** - Fully responsive across all devices

---

</details>

## 📄 License



MIT License - Free to use for learning and reference.

<details open>

---

<summary><b>📁 Categories Router (`categories.*`)</b></summary>```bashnpm install

**Built with ❤️ for Full-Stack Developer Assessment**

<br>

![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=flat-square&logo=typescript)

![Powered by Next.js](https://img.shields.io/badge/Powered%20by-Next.js-000000?style=flat-square&logo=next.js)cd frontend

![Database PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192?style=flat-square&logo=postgresql)

| Endpoint | Type | Description | Input | Output |

|----------|------|-------------|-------|--------|npm run dev```   npm install- [x] **Markdown editor** - Simple textarea-based markdown editor

| `categories.getAll` | Query | Get all categories | - | Category array |

| `categories.getBySlug` | Query | Get single category | `{ slug: string }` | Single category |```

| `categories.create` | Mutation | Create category | Category data | Created category |

| `categories.update` | Mutation | Update category | ID + data | Updated category |

| `categories.delete` | Mutation | Delete category | `{ id: number }` | Success message |

| `categories.generateSlug` | Query | Generate unique slug | `{ text: string }` | Unique slug |🌐 **Frontend:** `http://localhost:3000`



</details>Create `.env.local` file in `frontend/`:   ```



---</td>



## ✅ Assessment Features Implemented</tr>```env



<table></table>

<tr>

<td width="33%">NEXT_PUBLIC_API_URL=http://localhost:4000### ✅ Priority 3 - Bonus Features (Nice to Have)



### 🎯 Priority 1---

**Core Requirements**

```

![Progress](https://img.shields.io/badge/Progress-100%25-success?style=flat-square)

## 📋 Available Commands

- ✅ Blog Post CRUD

- ✅ Category CRUD   Create `.env` file:- [x] **Post statistics** - Word count and reading time calculation

- ✅ Many-to-Many Relations

- ✅ Blog Listing Page### Backend Commands (`kapybara/`)

- ✅ Individual Post View

- ✅ Category Filtering### Running the Application

- ✅ Responsive Navigation

- ✅ Professional UI| Command | Description |



</td>|---------|-------------|   ```env- [x] **Syntax highlighting** - Code blocks with syntax highlighting using Prism

<td width="33%">

| `npm run dev` | Start development server with hot reload |

### 🎯 Priority 2

**Expected Features**| `npm run build` | Compile TypeScript to JavaScript |**Terminal 1 (Backend):**



![Progress](https://img.shields.io/badge/Progress-100%25-success?style=flat-square)| `npm start` | Run production build |



- ✅ Landing Page| `npm run db:push` | Push database schema to PostgreSQL |```bash   DATABASE_URL="postgresql://user:password@host/database?sslmode=require"- [x] **SEO-friendly slugs** - Auto-generation with uniqueness validation

- ✅ Dashboard

- ✅ Draft vs Published| `npm run db:studio` | Open Drizzle Studio (database GUI) |

- ✅ Loading States

- ✅ Error Handling| `npm run db:seed` | Seed database with sample data |cd kapybara

- ✅ Mobile Responsive

- ✅ Markdown Editor| `npm run db:clean` | Drop all database tables (reset) |



</td>npm run dev   PORT=4000

<td width="34%">

### Frontend Commands (`frontend/`)

### 🎯 Priority 3

**Bonus Features**```



![Progress](https://img.shields.io/badge/Progress-Partial-blue?style=flat-square)| Command | Description |



- ✅ Post Statistics|---------|-------------|Backend: `http://localhost:4000`   FRONTEND_URL=http://localhost:3000## 🛠️ Tech Stack

- ✅ Syntax Highlighting

- ✅ SEO-friendly Slugs| `npm run dev` | Start Next.js development server |

- ✅ Dark Mode

| `npm run build` | Build for production |

</td>

</tr>| `npm start` | Run production build |

</table>

| `npm run lint` | Run ESLint |**Terminal 2 (Frontend):**   ```

---



## 🧰 Technology Stack

---```bash

<table>

<tr>

<td width="50%">

## 🗺️ Application Routescd frontend### Frontend

### 🔧 Backend



| Technology | Purpose |

|------------|---------|### 🌐 Frontend Routesnpm run dev

| **Node.js + Express** | Web server |

| **tRPC v11** | Type-safe API layer |

| **PostgreSQL** | Relational database |

| **Drizzle ORM v0.36** | Type-safe database access |<details open>```   Initialize database:- **Next.js 15** - React framework with App Router

| **Zod v3** | Schema validation |

| **SuperJSON** | Data serialization |<summary><b>📖 Public Pages</b></summary>



</td><br>Frontend: `http://localhost:3000`

<td width="50%">



### 💻 Frontend

| Route | Description |   ```bash- **TypeScript** - Full type safety

| Technology | Purpose |

|------------|---------||-------|-------------|

| **Next.js 15** | React framework (App Router) |

| **TypeScript 5** | Full type safety || `/` | Landing page with hero and features |---

| **Tailwind CSS** | Utility-first styling |

| **tRPC Client** | Type-safe API calls || `/blog` | Blog listing with category filtering |

| **React Query** | Server state management |

| **Zustand** | Client state management || `/blog/[slug]` | Individual post with markdown rendering |   npm run db:push- **Tailwind CSS** - Utility-first styling

| **react-markdown** | Markdown rendering |

| **react-syntax-highlighter** | Code highlighting |



</td></details>## Available Commands

</tr>

</table>



---<details open>   npm run db:seed- **tRPC Client** - Type-safe API calls



## 🎓 Assessment Completion Summary<summary><b>🎛️ Dashboard (Management)</b></summary>



<div align="center"><br>### Backend (`kapybara/`)



### Project Status: ✅ **Complete and Ready for Review**



</div>| Route | Description || Command | Description |   ```- **React Query** - Server state management (via tRPC)



**📚 Technical Skills Demonstrated:**|-------|-------------|

- Modern React patterns (Server Components, Client Components)

- Type-safe full-stack development with tRPC| `/dashboard` | View all posts (published & drafts) ||---------|-------------|

- Database design with proper relationships

- API design with RESTful principles| `/dashboard/new` | Create new blog post |

- State management strategies

- Responsive web design| `/dashboard/edit/[id]` | Edit existing post || `npm run dev` | Start development server with hot reload |- **Zustand** - Client state management for UI



**✨ Best Practices:**| `/dashboard/categories` | Manage categories (CRUD) |

- Clean code architecture

- Separation of concerns| `npm run build` | Compile TypeScript to JavaScript |

- Error handling and validation

- Type safety throughout</details>

- Loading and error states

- Mobile-first responsive design| `npm start` | Run production build |3. **Frontend Setup**- **React Markdown** - Markdown rendering with GFM support



**🏆 Production Quality:**---

- Comprehensive error handling

- Input validation and sanitization| `npm run db:push` | Push database schema to PostgreSQL |

- Database constraints and cascading

- Optimistic UI updates### 🔌 Backend API Routes (tRPC)

- Caching strategies

- Professional UI/UX| `npm run db:studio` | Open Drizzle Studio (database GUI) |   ```bash- **React Syntax Highlighter** - Code syntax highlighting



---**Base URL:** `http://localhost:4000/trpc`



<div align="center">| `npm run db:seed` | Seed database with sample data |



## 📄 License<details open>



**MIT License** - Free to use for learning and reference purposes.<summary><b>📄 Posts Router (`posts.*`)</b></summary>| `npm run db:clean` | Drop all database tables (reset) |   cd ../frontend



---<br>



**Built with ❤️ for Full-Stack Developer Assessment**



![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=flat-square&logo=typescript)| Endpoint | Type | Description | Input | Output |

![Powered by Next.js](https://img.shields.io/badge/Powered%20by-Next.js-000000?style=flat-square&logo=next.js)

![Database PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192?style=flat-square&logo=postgresql)|----------|------|-------------|-------|--------|### Frontend Commands (`frontend/`)   npm install### Backend



</div>| `posts.getAll` | Query | Get all posts | `{ published?: boolean }` | Post array |


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



## 📄 License    │   └── layout/                   # Layout components



**MIT License** - Free to use for learning and reference purposes.    ├── lib/- ✅ Edit existing posts1. **Navigate to frontend directory:**



---    │   ├── trpc.ts                   # tRPC client



## 📞 Contact & Support    │   └── utils.ts                  # Utilities- ✅ Delete posts with confirmation   ```bash



This is an assessment project. For questions about implementation details, please review:    ├── providers/



📖 Code comments throughout the codebase      │   └── trpc-provider.tsx         # React Query provider- ✅ Auto-generate SEO-friendly slugs   cd frontend

📘 This README documentation  

🔷 TypeScript types and interfaces      ├── store/

🔌 tRPC procedure definitions

    │   └── ui-store.ts               # Zustand store- ✅ Draft vs Published status   ```

---

    ├── .env.local                    # Environment variables

### ⭐ If you found this project helpful, please give it a star!

    └── package.json- ✅ Timestamp tracking (created/updated)

**Built with ❤️ for Full-Stack Developer Assessment**

```

---

2. **Install dependencies:**

![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=flat-square&logo=typescript)

![Powered by Next.js](https://img.shields.io/badge/Powered%20by-Next.js-000000?style=flat-square&logo=next.js)---

![Database PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192?style=flat-square&logo=postgresql)

### 2. Category Management   ```bash

</div>

## Design Decisions & Rationale

   npm install

### Why Markdown Instead of Rich Text Editor?

- **Time Efficient:** Saves 2-3 hours of implementation time**Implementation:**   ```

- **Developer Friendly:** Familiar to technical users

- **Version Control:** Works well with Git- **Backend:** Separate tRPC router for categories

- **Lightweight:** Smaller bundle size

- **Flexible:** Easy to parse and sanitize- **Database:** Many-to-many relationship via junction table3. **Configure environment variables:**



### Why tRPC?- **Frontend:** Dedicated category management page   Create a `.env.local` file in the `frontend` directory:

- **Type Safety:** End-to-end types without code generation

- **Auto Inference:** Types automatically flow from backend to frontend   ```env

- **React Query:** Built-in integration with caching

- **Better DX:** Superior developer experience compared to REST/GraphQL**Key Files:**   NEXT_PUBLIC_API_URL=http://localhost:4000



### Why Drizzle ORM?- `dashboard/categories/page.tsx` - CRUD interface   ```

- **Type Safety:** Excellent TypeScript support

- **SQL-like:** Easier learning curve than Prisma- `src/server/api/routers/categories.ts` - Category API

- **Lightweight:** Minimal runtime overhead

- **Migrations:** Simple migration system4. **Start the development server:**



### Why Zustand for UI State?**Features:**   ```bash

- **Simple:** Minimal boilerplate

- **No Providers:** Cleaner than Context API- ✅ Create, read, update, delete categories   npm run dev

- **Small:** ~1KB bundle size

- **Focused:** Perfect for UI state like modals and menus- ✅ Assign multiple categories to posts   ```



---- ✅ Filter posts by category   Frontend will run on `http://localhost:3000`



## Code Quality Features- ✅ Auto-generate slugs for categories



### Type Safety- ✅ Cascading deletes (removing category from posts)### Accessing the Application

- Strict TypeScript configuration

- Minimal use of `any` types

- End-to-end type inference via tRPC

- Zod schemas for runtime validation### 3. Markdown Editor & Rendering- **Landing Page:** `http://localhost:3000`



### Error Handling- **Blog Listing:** `http://localhost:3000/blog`

- Try-catch blocks in all API procedures

- User-friendly error messages**Implementation:**- **Dashboard:** `http://localhost:3000/dashboard`

- Loading states throughout UI

- Empty state handling- **Editor:** Simple textarea with markdown input- **Category Management:** `http://localhost:3000/dashboard/categories`



### Performance- **Parser:** `react-markdown` with GitHub Flavored Markdown

- React Query caching

- Optimistic UI updates- **Syntax Highlighting:** `react-syntax-highlighter` with Prism## 📝 Key Features & Implementation Details

- Next.js automatic code splitting

- Lazy loading components



### User Experience**Key Files:**### Type Safety

- Skeleton loaders for content

- Instant feedback on actions- `blog/[slug]/page.tsx` - Markdown rendering- End-to-end type safety from database to UI using tRPC

- Mobile-responsive design

- Dark theme throughout- `dashboard/new/page.tsx` - Markdown input- Automatic type inference eliminates manual type definitions

- Smooth transitions

- Zod schemas for runtime validation

---

**Features:**

## Deployment Guide

- ✅ GitHub Flavored Markdown support### State Management

### Backend Deployment (Railway/Render)

1. Create new project- ✅ Code syntax highlighting- **React Query** (via tRPC) - Server state, caching, and optimistic updates

2. Connect GitHub repository

3. Set environment variables:- ✅ Heading styles (H1-H6)- **Zustand** - UI state (mobile menu, modals)

   - `DATABASE_URL`

   - `PORT`- ✅ Lists (ordered & unordered)- Minimal client state, maximum server state

   - `FRONTEND_URL`

   - `NODE_ENV=production`- ✅ Blockquotes

4. Deploy from `kapybara` directory

- ✅ Links and inline code### Database Design

### Frontend Deployment (Vercel)

1. Import project from GitHub- ✅ Dark theme code blocks- **Posts** - Blog post content with metadata

2. Set framework: Next.js

3. Set root directory: `frontend`- **Categories** - Organizational tags

4. Set environment variables:

   - `NEXT_PUBLIC_API_URL` = backend URL### 4. Type-Safe API (tRPC)- **Post-Category Junction** - Many-to-many relationship

5. Deploy

- Automatic slug generation with uniqueness validation

### Database Hosting

- **Neon:** Free PostgreSQL hosting (recommended)**Implementation:**- Cascade deletes for data integrity

- **Supabase:** Free tier with additional features

- **Railway:** PostgreSQL add-on- **Backend:** Express server with tRPC middleware

- **AWS RDS:** Production-grade hosting

- **Frontend:** tRPC React Query integration### UI/UX Features

---

- **Validation:** Zod schemas for all inputs- **Responsive design** - Mobile-first approach

## Assessment Completion Summary

- **Loading states** - Skeleton screens and spinners

This project demonstrates:

**Key Files:**- **Error handling** - User-friendly error messages

**Technical Skills:**

- Modern React patterns (Server Components, Client Components)- `kapybara/src/server/api/root.ts` - Root router- **Optimistic updates** - Instant UI feedback

- Type-safe full-stack development with tRPC

- Database design with proper relationships- `frontend/lib/trpc.ts` - Client setup- **Markdown support** - GitHub Flavored Markdown with syntax highlighting

- API design with RESTful principles

- State management strategies- `frontend/providers/trpc-provider.tsx` - React Query provider

- Responsive web design

## 🎨 Design Decisions

**Best Practices:**

- Clean code architecture**Features:**

- Separation of concerns

- Error handling and validation- ✅ End-to-end type safety### Why Markdown Over Rich Text?

- Type safety throughout

- Loading and error states- ✅ Automatic type inference- Faster implementation (saves 2-3 hours)

- Mobile-first responsive design

- ✅ Input validation with Zod- Better version control compatibility

**Production Quality:**

- Comprehensive error handling- ✅ Error handling with custom messages- Familiar to technical users

- Input validation and sanitization

- Database constraints and cascading- ✅ SuperJSON serialization for dates- Lightweight and performant

- Optimistic UI updates

- Caching strategies

- Professional UI/UX

### 5. State Management### Component Library Approach

---

- Custom components built with Tailwind CSS

## Notes

**Implementation:**- Provides full control and customization

**Authentication:** Not implemented as per assessment requirements. The platform is public and does not require user authentication.

- **Server State:** React Query (via tRPC)- Maintains consistency across the application

**Testing:** Not included in this assessment scope, but the architecture supports easy integration of Jest, React Testing Library, and Playwright.

- **Client State:** Zustand for UI state- Easy to extend and modify

**Scalability:** The codebase is structured to easily add features like:

- User authentication- **Caching:** Automatic with React Query

- Image uploads

- Comments system### tRPC Router Structure

- Post search

- Pagination**Key Files:**```typescript

- Tags in addition to categories

- `store/ui-store.ts` - Zustand store for mobile menuappRouter

---

- tRPC hooks for all data fetching├── posts

## License

│   ├── getAll()

MIT License - Free to use for learning and reference purposes.

**Features:**│   ├── getBySlug()

---

- ✅ Optimistic updates│   ├── getPublished()

## Contact & Support

- ✅ Automatic cache invalidation│   ├── create()

This is an assessment project. For questions about implementation details, please review:

1. Code comments throughout the codebase- ✅ Loading states│   ├── update()

2. This README documentation

3. TypeScript types and interfaces- ✅ Error states│   ├── delete()

4. tRPC procedure definitions

- ✅ Refetch on focus│   └── generateSlug()

**Project Status:** Complete and ready for review.

└── categories

### 6. Responsive Design    ├── getAll()

    ├── getBySlug()

**Implementation:**    ├── create()

- **Framework:** Tailwind CSS    ├── update()

- **Approach:** Mobile-first design    ├── delete()

- **Components:** Reusable UI components    └── generateSlug()

```

**Key Files:**

- `components/ui/` - Reusable components## 🔒 Error Handling Strategy

- `components/layout/` - Layout components

1. **Input Validation** - Zod schemas validate all inputs

**Features:**2. **Database Errors** - Caught and transformed to user-friendly messages

- ✅ Mobile navigation with hamburger menu3. **API Errors** - tRPC error handling with custom messages

- ✅ Responsive grid layouts4. **UI Feedback** - Toast notifications and inline error displays

- ✅ Touch-friendly interfaces

- ✅ Breakpoint-based styling## 🚀 Deployment

- ✅ Dark theme throughout

### Vercel (Recommended for Frontend)

### 7. Loading & Error States1. Push your code to GitHub

2. Import project in Vercel

**Implementation:**3. Set environment variables:

- **Loading:** Skeleton screens and spinners   - `NEXT_PUBLIC_API_URL` = your backend URL

- **Errors:** User-friendly error messages4. Deploy

- **Empty States:** Helpful messages with CTAs

### Backend Deployment Options

**Key Files:**- **Railway** - Easy PostgreSQL + Node.js hosting

- `components/ui/loading.tsx` - Loading components- **Heroku** - Traditional PaaS

- Error handling in all tRPC queries- **DigitalOcean** - VPS with Docker

- **AWS** - EC2 + RDS for production scale

**Features:**

- ✅ Skeleton loaders for cards### Environment Variables for Production

- ✅ Loading spinners for actions**Backend:**

- ✅ Error boundaries- `DATABASE_URL` - Production PostgreSQL connection string

- ✅ Empty state messages- `PORT` - Server port

- ✅ Form validation errors- `FRONTEND_URL` - Production frontend URL

- `NODE_ENV=production`

### 8. Database Design

**Frontend:**

**Implementation:**- `NEXT_PUBLIC_API_URL` - Production backend API URL

- **ORM:** Drizzle ORM

- **Database:** PostgreSQL (Neon cloud)## 📊 Performance Considerations

- **Migrations:** Drizzle Kit

- **React Query caching** - Reduces unnecessary API calls

**Schema:**- **Automatic batching** - tRPC batches multiple requests

```typescript- **Code splitting** - Next.js automatic route-based splitting

// Posts table- **Image optimization** - Next.js Image component

- id (serial, primary key)- **Lazy loading** - Components load on demand

- title (varchar 255)

- content (text)## 🧪 Testing Recommendations

- excerpt (text, nullable)

- slug (varchar 255, unique)While not implemented in this project scope, recommended testing approach:

- published (boolean)

- createdAt (timestamp)- **Unit Tests** - Jest for utility functions and components

- updatedAt (timestamp)- **Integration Tests** - Testing Library for UI interactions

- **E2E Tests** - Playwright for critical user flows

// Categories table- **API Tests** - Supertest for tRPC procedures

- id (serial, primary key)

- name (varchar 255)## 📚 Additional Resources

- description (text, nullable)

- slug (varchar 255, unique)- [Next.js Documentation](https://nextjs.org/docs)

- createdAt (timestamp)- [tRPC Documentation](https://trpc.io)

- updatedAt (timestamp)- [Drizzle ORM Documentation](https://orm.drizzle.team)

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

// Post-Category Junction table

- postId (foreign key -> posts.id, cascade delete)## 🤝 Contributing

- categoryId (foreign key -> categories.id, cascade delete)

- Primary key: (postId, categoryId)This is an assessment project, but improvements are welcome:

```1. Fork the repository

2. Create a feature branch

**Features:**3. Commit your changes

- ✅ Proper foreign key constraints4. Push to the branch

- ✅ Cascade deletes for data integrity5. Open a Pull Request

- ✅ Unique constraints on slugs

- ✅ Many-to-many relationships## 📄 License

- ✅ Timestamps for audit trail

MIT License - feel free to use this project as a learning resource or template.

---

## 👨‍💻 Author

## 🏗️ Project Architecture

Built as a full-stack developer assessment project demonstrating:

```- Modern React patterns and best practices

FullKapybara/- Type-safe API development with tRPC

├── kapybara/                    # Backend (Express + tRPC)- Clean code architecture and organization

│   ├── src/- Production-quality error handling

│   │   ├── server.ts           # Express server entry point- Responsive and accessible UI/UX

│   │   ├── lib/

│   │   │   └── db/---

│   │   │       ├── index.ts    # Database connection

│   │   │       └── schema.ts   # Drizzle ORM schemas**Note:** This project prioritizes code quality, type safety, and maintainability over feature quantity. The architecture is designed to scale and can easily accommodate additional features like authentication, image uploads, comments, and more.

│   │   └── server/
│   │       └── api/
│   │           ├── trpc.ts     # tRPC initialization
│   │           ├── root.ts     # Root router
│   │           └── routers/
│   │               ├── posts.ts       # Posts API
│   │               └── categories.ts  # Categories API
│   ├── scripts/
│   │   ├── seed.ts             # Database seeding
│   │   └── clean-db.ts         # Database cleanup
│   ├── .env                     # Environment variables
│   └── package.json
│
└── frontend/                    # Frontend (Next.js 15)
    ├── app/                     # App Router pages
    │   ├── layout.tsx           # Root layout
    │   ├── page.tsx             # Landing page
    │   ├── blog/
    │   │   ├── page.tsx         # Blog listing
    │   │   └── [slug]/page.tsx  # Individual post
    │   └── dashboard/
    │       ├── page.tsx         # Dashboard home
    │       ├── new/page.tsx     # Create post
    │       ├── edit/[id]/page.tsx # Edit post
    │       └── categories/page.tsx # Category management
    ├── components/
    │   ├── ui/                  # Reusable UI components
    │   └── layout/              # Layout components
    ├── lib/
    │   ├── trpc.ts              # tRPC client setup
    │   └── utils.ts             # Utility functions
    ├── providers/
    │   └── trpc-provider.tsx    # tRPC React Query provider
    ├── store/
    │   └── ui-store.ts          # Zustand store
    ├── .env.local               # Environment variables
    └── package.json
```

---

## Technology Stack

### Backend
- **Runtime:** Node.js with Express
- **API Layer:** tRPC v11 (type-safe RPC)
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM v0.36
- **Validation:** Zod v3
- **Serialization:** SuperJSON

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS
- **Data Fetching:** tRPC + React Query (TanStack Query)
- **State Management:** Zustand
- **Markdown:** react-markdown + react-syntax-highlighter

---

## Design Decisions

### Why Markdown Over Rich Text Editor?
- **Faster implementation** (saves 2-3 hours)
- **Version control friendly**
- **Familiar to developers**
- **Lightweight and performant**
- **Easy to parse and sanitize**

### Why tRPC?
- **End-to-end type safety** without code generation
- **Automatic type inference** from backend to frontend
- **Built-in React Query integration**
- **Better DX than REST or GraphQL for TypeScript projects**

### Why Drizzle ORM?
- **Type-safe queries** with excellent TypeScript support
- **SQL-like syntax** (easier to learn than Prisma)
- **Lightweight** with minimal runtime overhead
- **Great migration system**

### Why Zustand for UI State?
- **Simple API** (easier than Redux)
- **No providers needed** (unlike Context API)
- **Small bundle size** (~1KB)
- **Perfect for UI state** (mobile menu, modals, etc.)

---

## Development Notes

### Code Quality
- Strict TypeScript throughout
- Minimal use of `any` types
- Comprehensive error handling
- Input validation with Zod
- Clean separation of concerns

### Performance
- React Query caching
- tRPC request batching
- Next.js automatic code splitting
- Optimistic updates

### User Experience
- Loading states everywhere
- User-friendly error messages
- Responsive design
- Dark theme
- Smooth transitions

---

## Deployment

### Backend (Railway/Heroku)
1. Create new project
2. Connect GitHub repository
3. Set environment variables:
   - `DATABASE_URL`
   - `PORT`
   - `FRONTEND_URL`
4. Deploy from `kapybara` directory

### Frontend (Vercel - Recommended)
1. Connect GitHub repository
2. Set root directory to `frontend`
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL` = your backend URL
4. Deploy

---

## Features Checklist

### Core Requirements (Priority 1)
- Blog post CRUD operations
- Category CRUD operations
- Assign categories to posts (many-to-many)
- Blog listing page
- Individual post view
- Category filtering
- Responsive navigation
- Clean, professional UI

### Expected Features (Priority 2)
- Landing page (Hero + Features + Footer)
- Dashboard for post management
- Draft vs Published status
- Loading and error states
- Mobile-responsive design
- Markdown editor

### Bonus Features (Priority 3)
- Post statistics (word count, reading time)
- Syntax highlighting
- SEO-friendly slugs
- Dark mode

---

## Contributing

This is an assessment project, but improvements are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

MIT License - Free to use for learning and reference.

---

## Author

Built as a full-stack developer assessment project demonstrating:
- Modern React patterns and best practices
- Type-safe API development with tRPC
- Clean code architecture
- Production-quality error handling
- Responsive and accessible UI/UX

---

## Support

For questions or issues:
1. Check the documentation above
2. Review the codebase comments
3. Open an issue on GitHub

**Happy Coding!**
