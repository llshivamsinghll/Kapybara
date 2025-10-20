// This file contains type definitions that mirror the backend API
// Types are properly imported from the backend in lib/trpc.ts
// This file is kept for reference but not actively used

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

// Define the structure based on your backend router
export interface AppRouter {
  posts: {
    getAll: any;
    getBySlug: any;
    getPublished: any;
    create: any;
    update: any;
    delete: any;
    generateSlug: any;
  };
  categories: {
    getAll: any;
    getBySlug: any;
    create: any;
    update: any;
    delete: any;
    generateSlug: any;
  };
}

// Type inference is handled directly in lib/trpc.ts by importing from the backend
