# Full-Stack Blogging Platform

project: a modern multi-user blogging platform demonstrating production-quality code, end-to-end type safety, and a clean architecture.

---

## Quick start (local)

### Prerequisites
- Node.js 18+
- PostgreSQL (Neon or local)
- npm or yarn

### Installation

1. Clone the repository and open the project root:

```powershell
git clone <repository-url>
cd FullKapybara
```

2. Backend (kapybara)

```powershell
cd kapybara
npm install
# Create .env with DATABASE_URL, PORT, FRONTEND_URL
# Example .env:
# DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
# PORT=4000
# FRONTEND_URL=http://localhost:3000

# Initialize database and seed sample data:
npm run db:push
npm run db:seed
```

3. Frontend (frontend)

```powershell
cd ../frontend
npm install
# Create .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:4000
```

4. Run both services

Terminal A (backend):

```powershell
cd kapybara
npm run dev
# backend available at http://localhost:4000
```

Terminal B (frontend):

```powershell
cd frontend
npm run dev
# frontend available at http://localhost:3000
```

---

## Available scripts

### Backend (kapybara)

- `npm run dev` — start development server (tsx watch)
- `npm run build` — compile TypeScript
- `npm start` — run production build (node dist/server.js)
- `npm run db:push` — push schema using drizzle-kit
- `npm run db:studio` — open Drizzle Studio
- `npm run db:seed` — run seed script
- `npm run db:clean` — run cleanup script

### Frontend (frontend)

- `npm run dev` — start Next.js dev server
- `npm run build` — build for production
- `npm start` — run production server
- `npm run lint` — run ESLint

---

## Application routes

### Frontend

- `/` — Landing page
- `/blog` — Blog listing (category filtering supported)
- `/blog/[slug]` — Individual post (markdown rendering)

Dashboard (management):
- `/dashboard` — View posts (published & drafts)
- `/dashboard/new` — Create new post
- `/dashboard/edit/[id]` — Edit post
- `/dashboard/categories` — Manage categories

### Backend (tRPC procedures)

Base tRPC endpoint: `http://localhost:4000/trpc` (tRPC server configured in backend)

Posts router (`posts`):

- `getAll` (input: { published?: boolean; categoryId?: number; limit?: number; offset?: number }) — returns list of posts with categories
- `getBySlug` (input: { slug: string }) — returns a single post with content and categories
- `getPublished` (no input) — returns published posts
- `create` (input: { title, content, excerpt?, slug, published?, categoryIds?: number[] }) — create post
- `update` (input: { id, title?, content?, excerpt?, slug?, published?, categoryIds? }) — update post and category relations
- `delete` (input: { id }) — delete post
- `generateSlug` (input: { title }) — returns a unique slug

Categories router (`categories`):

- `getAll` (no input) — list categories
- `getBySlug` (input: { slug: string }) — single category
- `create` (input: insertCategorySchema) — create category
- `update` (input: { id, name?, description?, slug? }) — update category
- `delete` (input: { id }) — delete category
- `generateSlug` (input: { name }) — returns a unique slug

---

## Features implemented

### Priority 1 (core)
- Blog post CRUD operations
- Category CRUD operations
- Many-to-many relation between posts and categories
- Public blog listing with filtering
- Individual post view with markdown rendering
- Category filtering
- Responsive navigation
- Dark theme applied across the UI

### Priority 2 (expected)
- Landing page (hero, features, footer)
- Dashboard to create/edit posts and manage categories
- Draft vs published status
- Loading states and skeletons
- User-friendly error messages
- Mobile-responsive layout
- Markdown editor for post content

### Priority 3 (bonus)
- Post statistics (word count, estimated reading time)
- Syntax highlighting for code blocks
- SEO-friendly slugs with auto-generation

---

## Technology stack

### Backend
- Node.js (tsx) and Express
- tRPC v11 for API layer
- PostgreSQL (Neon recommended)
- Drizzle ORM (v0.36)
- Zod for validation
- SuperJSON for serialization

### Frontend
- Next.js 15 (App Router)
- TypeScript 5
- Tailwind CSS
- tRPC client + React Query
- Zustand for small UI state
- react-markdown and react-syntax-highlighter

---

## Design decisions and trade-offs

- Markdown editor: chosen for speed, version-control friendliness, and simplicity. Rich WYSIWYG was avoided to keep scope manageable.
- tRPC: selected for end-to-end type safety and developer experience. This simplifies client-server integration and reduces runtime type errors.
- Drizzle ORM: chosen for TypeScript-first database access and small runtime footprint.
- Zustand: lightweight UI state library chosen over heavier solutions since global state needs are minimal.
- Authentication: intentionally omitted following assessment requirements (public demo). Adding authentication would be a next step and requires additional design for roles and sessions.

Trade-offs:

- Time vs features: prioritized correct data model, API, and solid UX over extensive edge-case testing and automated tests due to timebox.
- Simplicity vs features: image uploads, comments, and full-text search were left out to keep the codebase focused and reviewable.

---

## Time spent

- Approximate development time: 10–11 hours

---

## Project structure (overview)

```
FullKapybara/
├── kapybara/                   # Backend
│   ├── src/
│   │   ├── server.ts           # Express + tRPC server
│   │   ├── lib/db/             # Database connection and schema
│   │   └── server/api/         # tRPC config and routers
│   ├── scripts/                # Seed and utility scripts
│   └── drizzle/                # Migrations
└── frontend/                   # Frontend
   ├── app/                    # Next.js App Router
   ├── components/             # UI components
   ├── lib/                    # trpc client, utils
   └── store/                  # Zustand store
```

---

## Deployment (brief)

Backend: Railway or Render. Connect repo, set environment variables (`DATABASE_URL`, `PORT`, `FRONTEND_URL`, `NODE_ENV=production`) and deploy from `kapybara`.

Frontend: Vercel. Import project, set root to `frontend`, and set `NEXT_PUBLIC_API_URL` to the deployed backend URL.

Database: Neon or Supabase for managed Postgres.

---

## Notes and next steps

- Add authentication (JWT, NextAuth, or a session-based solution) to secure dashboard actions.
- Add unit/integration tests (Jest / React Testing Library) and end-to-end tests (Playwright).
- Add file/image upload support and CDN-backed storage.
- Improve pagination and search for larger datasets.

---

If you want, I can now commit these README changes and push them to the `main` branch.
