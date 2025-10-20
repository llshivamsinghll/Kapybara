import { router } from './trpc';
import { postRouter } from './routers/posts';
import { categoryRouter } from './routers/categories';

export const appRouter = router({
  posts: postRouter,
  categories: categoryRouter,
});

export type AppRouter = typeof appRouter;
