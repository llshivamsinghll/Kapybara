import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '@/lib/db';
import { categories, insertCategorySchema } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export const categoryRouter = router({
  // Get all categories
  getAll: publicProcedure.query(async () => {
    return await db
      .select()
      .from(categories)
      .orderBy(desc(categories.createdAt));
  }),

  // Get category by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const [category] = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, input.slug));

      if (!category) {
        throw new Error('Category not found');
      }

      return category;
    }),

  // Create category
  create: publicProcedure
    .input(insertCategorySchema)
    .mutation(async ({ input }) => {
      const [category] = await db
        .insert(categories)
        .values(input)
        .returning();

      return category;
    }),

  // Update category
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).max(255).optional(),
      description: z.string().optional(),
      slug: z.string().min(1).max(255).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;

      const [category] = await db
        .update(categories)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(categories.id, id))
        .returning();

      return category;
    }),

  // Delete category
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(categories).where(eq(categories.id, input.id));
      return { success: true };
    }),

  // Generate slug from name
  generateSlug: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const baseSlug = input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      let slug = baseSlug;
      let counter = 1;

      // Check if slug exists and make it unique
      while (true) {
        const [existing] = await db
          .select({ id: categories.id })
          .from(categories)
          .where(eq(categories.slug, slug))
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
