# Blogging Platform - Backend API

A standalone backend API built with **Express**, **tRPC**, **Drizzle ORM**, and **PostgreSQL**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Backend runs on: **http://localhost:4000**

## 📡 API Endpoints

- **Base URL**: `http://localhost:4000/trpc`
- **Health Check**: `http://localhost:4000/health`

### Available Routes

#### Posts
- `posts.getAll` - Get all posts (with filters)
- `posts.getPublished` - Get published posts
- `posts.getBySlug` - Get single post
- `posts.create` - Create post
- `posts.update` - Update post
- `posts.delete` - Delete post

#### Categories
- `categories.getAll` - Get all categories
- `categories.getBySlug` - Get single category
- `categories.create` - Create category
- `categories.update` - Update category
- `categories.delete` - Delete category

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── server.ts           # Express server
│   ├── lib/db/             # Database (schema + connection)
│   └── server/api/         # tRPC routers
├── scripts/seed.ts         # Database seeding
└── drizzle/                # Migrations
```

## ⚙️ Environment Variables

Create `.env.local`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/blog_db
PORT=4000
FRONTEND_URL=http://localhost:3000
```

## 📦 Tech Stack

- Express + tRPC
- PostgreSQL + Drizzle ORM
- TypeScript + Zod validation
- CORS enabled for frontend

## 🔧 Scripts

```bash
npm run dev       # Development server
npm run build     # Build for production
npm start         # Production server
npm run db:push   # Push schema to DB
npm run db:seed   # Seed database
```
