import { initTRPC } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCContext = async (opts: CreateExpressContextOptions) => {
  return {
    req: opts.req,
    res: opts.res,
  };
};

export const router = t.router;
export const publicProcedure = t.procedure;
