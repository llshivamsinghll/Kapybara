'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading';
import { formatDate, calculateReadingTime, getWordCount } from '@/lib/utils';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { data: post, isLoading, error } = trpc.posts.getBySlug.useQuery({ slug });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-12 bg-zinc-800 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-zinc-800 rounded w-1/2 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-zinc-800 rounded"></div>
            <div className="h-4 bg-zinc-800 rounded"></div>
            <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-950/50 border border-red-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-red-300 mb-2">Post Not Found</h2>
          <p className="text-red-400 mb-6">{error?.message || 'The post you\'re looking for doesn\'t exist.'}</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content);
  const wordCount = getWordCount(post.content);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-zinc-400 mb-6">
          <time dateTime={post.createdAt.toString()}>
            {formatDate(post.createdAt)}
          </time>
          <span>•</span>
          <span>{readingTime} min read</span>
          <span>•</span>
          <span>{wordCount} words</span>
        </div>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((category: any) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.id}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-950 text-indigo-300 border border-indigo-800 hover:bg-indigo-900 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-zinc-400 leading-relaxed border-l-4 border-indigo-600 pl-4 italic">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Divider */}
      <hr className="border-zinc-800 mb-8" />

      {/* Content */}
      <div className="prose prose-lg prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-indigo-300" {...props}>
                  {children}
                </code>
              );
            },
            h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2 text-white">{children}</h3>,
            p: ({ children }) => <p className="mb-4 leading-relaxed text-zinc-300">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-zinc-300">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-zinc-300">{children}</ol>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-zinc-700 pl-4 italic my-4 text-zinc-400">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-indigo-400 hover:text-indigo-300 underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-zinc-800">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link href="/blog">
            <Button variant="outline">
              ← Back to All Posts
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button>
              Create Your Own Post
            </Button>
          </Link>
        </div>
      </footer>
    </article>
  );
}
