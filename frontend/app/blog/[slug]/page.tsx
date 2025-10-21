'use client';

import { trpc } from '@/providers/trpc-provider';
import { Loading } from '@/components/ui/loading';
import { useParams } from 'next/navigation';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: post, isLoading } = trpc.posts.getBySlug.useQuery({ slug });

  if (isLoading) return <Loading />;

  if (!post) return null;

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6">
              ← Back to Blog
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.createdAt)}
            </span>
            <span>•</span>
            <span>{calculateReadingTime(post.content)} min read</span>
          </div>

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.categories.map((category: Category) => (
                <span
                  key={category.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-secondary text-secondary-foreground border"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap leading-relaxed text-foreground">
            {post.content}
          </div>
        </div>
      </div>
    </article>
  );
}
