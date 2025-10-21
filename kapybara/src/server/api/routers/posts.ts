import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '@/lib/db';
import { posts, categories, postCategories, insertPostSchema } from '@/lib/db/schema';
import { eq, desc, inArray, sql } from 'drizzle-orm';

export const postRouter = router({
  // Get all posts with their categories
  getAll: publicProcedure
    .input(z.object({
      published: z.boolean().optional(),
      categoryId: z.number().optional(),
      limit: z.number().optional().default(20),
      offset: z.number().optional().default(0),
    }))
    .query(async ({ input }) => {
      const baseQuery = db
        .select({
          id: posts.id,
          title: posts.title,
          excerpt: posts.excerpt,
          slug: posts.slug,
          published: posts.published,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          categories: sql<Array<{ id: number; name: string; slug: string }>>`
            COALESCE(
              json_agg(
                DISTINCT jsonb_build_object(
                  'id', ${categories.id},
                  'name', ${categories.name},
                  'slug', ${categories.slug}
                )
              ) FILTER (WHERE ${categories.id} IS NOT NULL),
              '[]'
            )
          `.as('categories'),
        })
        .from(posts)
        .leftJoin(postCategories, eq(posts.id, postCategories.postId))
        .leftJoin(categories, eq(postCategories.categoryId, categories.id))
        .groupBy(posts.id)
        .orderBy(desc(posts.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      // Apply filters if provided
      if (input.published !== undefined) {
        return await baseQuery.where(eq(posts.published, input.published));
      }

      if (input.categoryId) {
        const postIds = await db
          .select({ postId: postCategories.postId })
          .from(postCategories)
          .where(eq(postCategories.categoryId, input.categoryId));

        const ids = postIds.map(p => p.postId);
        if (ids.length > 0) {
          return await baseQuery.where(inArray(posts.id, ids));
        }
        return [];
      }

      return await baseQuery;
    }),

  // Get single post by ID
  getById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const [post] = await db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          excerpt: posts.excerpt,
          slug: posts.slug,
          published: posts.published,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          categories: sql<Array<{ id: number; name: string; slug: string }>>`
            COALESCE(
              json_agg(
                DISTINCT jsonb_build_object(
                  'id', ${categories.id},
                  'name', ${categories.name},
                  'slug', ${categories.slug}
                )
              ) FILTER (WHERE ${categories.id} IS NOT NULL),
              '[]'
            )
          `.as('categories'),
        })
        .from(posts)
        .leftJoin(postCategories, eq(posts.id, postCategories.postId))
        .leftJoin(categories, eq(postCategories.categoryId, categories.id))
        .where(eq(posts.id, input))
        .groupBy(posts.id);

      if (!post) {
        throw new Error('Post not found');
      }

      return post;
    }),

  // Get single post by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const [post] = await db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          excerpt: posts.excerpt,
          slug: posts.slug,
          published: posts.published,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          categories: sql<Array<{ id: number; name: string; slug: string }>>`
            COALESCE(
              json_agg(
                DISTINCT jsonb_build_object(
                  'id', ${categories.id},
                  'name', ${categories.name},
                  'slug', ${categories.slug}
                )
              ) FILTER (WHERE ${categories.id} IS NOT NULL),
              '[]'
            )
          `.as('categories'),
        })
        .from(posts)
        .leftJoin(postCategories, eq(posts.id, postCategories.postId))
        .leftJoin(categories, eq(postCategories.categoryId, categories.id))
        .where(eq(posts.slug, input.slug))
        .groupBy(posts.id);

      if (!post) {
        throw new Error('Post not found');
      }

      return post;
    }),

  // Get published posts (for public view)
  getPublished: publicProcedure.query(async () => {
    return await db
      .select({
        id: posts.id,
        title: posts.title,
        excerpt: posts.excerpt,
        slug: posts.slug,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        categories: sql<Array<{ id: number; name: string; slug: string }>>`
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', ${categories.id},
                'name', ${categories.name},
                'slug', ${categories.slug}
              )
            ) FILTER (WHERE ${categories.id} IS NOT NULL),
            '[]'
          )
        `.as('categories'),
      })
      .from(posts)
      .leftJoin(postCategories, eq(posts.id, postCategories.postId))
      .leftJoin(categories, eq(postCategories.categoryId, categories.id))
      .where(eq(posts.published, true))
      .groupBy(posts.id)
      .orderBy(desc(posts.createdAt));
  }),

  // Create new post
  create: publicProcedure
    .input(z.object({
      title: z.string().min(1).max(255),
      content: z.string().min(1),
      excerpt: z.string().optional(),
      slug: z.string().min(1).max(255),
      published: z.boolean().default(false),
      categoryIds: z.array(z.number()).optional().default([]),
    }))
    .mutation(async ({ input }) => {
      const { categoryIds, ...postData } = input;

      const [post] = await db
        .insert(posts)
        .values(postData)
        .returning();

      if (categoryIds && categoryIds.length > 0) {
        await db.insert(postCategories).values(
          categoryIds.map((categoryId: number) => ({
            postId: post.id,
            categoryId,
          }))
        );
      }

      return post;
    }),

  // Update post
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).max(255).optional(),
      content: z.string().min(1).optional(),
      excerpt: z.string().optional(),
      slug: z.string().min(1).max(255).optional(),
      published: z.boolean().optional(),
      categoryIds: z.array(z.number()).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, categoryIds, ...updateData } = input;

      const [post] = await db
        .update(posts)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, id))
        .returning();

      if (categoryIds) {
        // Update categories
        await db.delete(postCategories).where(eq(postCategories.postId, id));
        if (categoryIds.length > 0) {
          await db.insert(postCategories).values(
            categoryIds.map((categoryId: number) => ({
              postId: id,
              categoryId,
            }))
          );
        }
      }

      return post;
    }),

  // Delete post
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(posts).where(eq(posts.id, input.id));
      return { success: true };
    }),

  // Generate slug from title
  generateSlug: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      const baseSlug = input.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      let slug = baseSlug;
      let counter = 1;

      // Check if slug exists and make it unique
      while (true) {
        const [existing] = await db
          .select({ id: posts.id })
          .from(posts)
          .where(eq(posts.slug, slug))
          .limit(1);

        if (!existing) {
          break;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      return slug;
    }),
});
