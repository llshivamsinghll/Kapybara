import { pgTable, text, boolean, timestamp, varchar, serial, integer, primaryKey } from 'drizzle-orm/pg-core';
import { z } from 'zod';

// Categories table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Blog posts table
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Post-category relationships (many-to-many)
export const postCategories = pgTable('post_categories', {
  postId: integer('post_id').references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'cascade' }).notNull(),
}, (table) => ({
  primaryKey: primaryKey({ columns: [table.postId, table.categoryId] }),
}));

// Insert schemas for validation using plain Zod
export const insertPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  excerpt: z.string().nullable().optional(),
  slug: z.string().min(1).max(255),
  published: z.boolean().default(false),
});

export const insertCategorySchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().nullable().optional(),
  slug: z.string().min(1).max(255),
});

// Types
export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type PostWithCategories = Post & {
  categories: Category[];
};