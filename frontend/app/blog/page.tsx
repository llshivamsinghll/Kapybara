'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { LoadingSpinner, PostListSkeleton } from '@/components/ui/loading';
import { formatDate, calculateReadingTime } from '@/lib/utils';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: categories, isLoading: categoriesLoading } = trpc.categories.getAll.useQuery();
  
  const { data: posts, isLoading: postsLoading, error } = trpc.posts.getPublished.useQuery();

  const filteredPosts = posts?.filter((post: any) => {
    if (selectedCategory === 'all') return true;
    return post.categories.some((cat: any) => cat.id.toString() === selectedCategory);
  });

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-950/50 border border-red-800 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-300 mb-2">Error Loading Posts</h2>
          <p className="text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Blog Posts</h1>
        <p className="text-xl text-zinc-400">
          Explore our latest articles, tutorials, and insights
        </p>
      </div>

      {/* Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-64">
          {categoriesLoading ? (
            <div className="h-10 bg-zinc-800 rounded-lg animate-pulse"></div>
          ) : (
            <Select
              label="Filter by Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={[
                { value: 'all', label: 'All Categories' },
                ...(categories?.map((cat: any) => ({
                  value: cat.id.toString(),
                  label: cat.name,
                })) || []),
              ]}
            />
          )}
        </div>

        <div className="text-sm text-zinc-400">
          {filteredPosts ? `${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''} found` : ''}
        </div>
      </div>

      {/* Posts Grid */}
      {postsLoading ? (
        <PostListSkeleton />
      ) : filteredPosts && filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>
                    {formatDate(post.createdAt)} · {calculateReadingTime(post.content)} min read
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {post.excerpt && (
                    <p className="text-zinc-400 line-clamp-3 mb-4">{post.excerpt}</p>
                  )}
                  {post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category: any) => (
                        <span
                          key={category.id}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-950 text-indigo-300 border border-indigo-800"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
          <p className="text-zinc-400 mb-6">
            {selectedCategory === 'all' 
              ? 'Be the first to create a post!' 
              : 'No posts in this category yet.'}
          </p>
          <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Create your first post →
          </Link>
        </div>
      )}
    </div>
  );
}
