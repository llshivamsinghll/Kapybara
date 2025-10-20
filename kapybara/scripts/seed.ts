import { db } from '../src/lib/db';
import { categories, posts, postCategories } from '../src/lib/db/schema';

async function seed() {
  console.log('Seeding database...');

  // Clear existing data
  await db.delete(postCategories);
  await db.delete(posts);
  await db.delete(categories);

  // Create categories
  const [techCategory, webDevCategory, programmingCategory] = await db
    .insert(categories)
    .values([
      {
        name: 'Technology',
        description: 'Latest technology trends and news',
        slug: 'technology',
      },
      {
        name: 'Web Development',
        description: 'Frontend and backend web development',
        slug: 'web-development',
      },
      {
        name: 'Programming',
        description: 'Programming languages and techniques',
        slug: 'programming',
      },
    ])
    .returning();

  console.log('Created categories');

  // Create posts
  const [post1, post2, post3] = await db
    .insert(posts)
    .values([
      {
        title: 'Getting Started with Next.js 15',
        slug: 'getting-started-with-nextjs-15',
        content: `Next.js 15 introduces many exciting new features that make building React applications even better. 
        
In this comprehensive guide, we'll explore the key improvements including:

- Enhanced server components with improved streaming
- Better image optimization with automatic format detection
- Improved TypeScript support with stricter types
- New middleware capabilities for advanced routing
- Performance improvements across the board

The React Server Components architecture in Next.js 15 allows for better data fetching patterns and reduces the amount of JavaScript sent to the client. This results in faster page loads and improved user experience.`,
        excerpt: 'Learn about the latest features in Next.js 15 and how to upgrade your application.',
        published: true,
      },
      {
        title: 'TypeScript Best Practices for React',
        slug: 'typescript-best-practices-react',
        content: `TypeScript can significantly improve your React development experience by catching errors early and providing excellent IntelliSense.

Here are some essential TypeScript patterns and practices for React applications:

## 1. Type Your Props Properly
Always define explicit types for your component props. Use interfaces for objects and type unions for variants.

## 2. Leverage Generics
Generic components can make your code more reusable and type-safe.

## 3. Use Discriminated Unions
For complex state management, discriminated unions help TypeScript understand your state transitions.`,
        excerpt: 'Discover essential TypeScript patterns and practices for React applications.',
        published: true,
      },
      {
        title: 'Building Scalable APIs with tRPC',
        slug: 'building-scalable-apis-trpc',
        content: `tRPC is revolutionizing how we build type-safe APIs in TypeScript applications. Unlike traditional REST or GraphQL APIs, tRPC provides end-to-end type safety without code generation.

## Why tRPC?

- Full type safety from server to client
- No code generation needed
- Excellent DX with autocomplete
- Works seamlessly with React Query
- Lightweight and performant`,
        excerpt: 'Learn how to build type-safe APIs with tRPC and Next.js.',
        published: true,
      },
    ])
    .returning();

  console.log('Created posts');

  // Associate posts with categories
  await db.insert(postCategories).values([
    { postId: post1.id, categoryId: techCategory.id },
    { postId: post1.id, categoryId: webDevCategory.id },
    { postId: post2.id, categoryId: programmingCategory.id },
    { postId: post2.id, categoryId: webDevCategory.id },
    { postId: post3.id, categoryId: webDevCategory.id },
    { postId: post3.id, categoryId: programmingCategory.id },
  ]);

  console.log('Associated posts with categories');
  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
