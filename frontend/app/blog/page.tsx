'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trpc } from '@/providers/trpc-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { PostListSkeleton } from '@/components/ui/loading';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import type { Post, Category } from '@/types';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: categories, isLoading: categoriesLoading } = trpc.categories.getAll.useQuery();
  const { data: posts, isLoading: postsLoading, error } = trpc.posts.getPublished.useQuery();

  const filteredPosts = posts?.filter((post: Post) => {
    if (selectedCategory === 'all') return true;
    return post.categories.some((cat: Category) => cat.id.toString() === selectedCategory);
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="border-2 border-destructive rounded-lg p-8 text-center bg-card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Error Loading Posts</h2>
          <p className="text-destructive">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Discover insightful articles, tutorials, and stories
          </p>
        </div>

        {/* Filter */}
        <div className="mb-10 max-w-sm mx-auto">
          {categoriesLoading ? (
            <div className="h-12 bg-muted rounded-lg animate-pulse"></div>
          ) : (
            <Select
              label="Filter by Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={[
                { value: 'all', label: 'All Categories' },
                ...(categories?.map((cat: Category) => ({
                  value: cat.id.toString(),
                  label: cat.name,
                })) || []),
              ]}
            />
          )}
        </div>

        {/* Posts Grid */}
        {postsLoading ? (
          <PostListSkeleton />
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: Post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full group cursor-pointer hover:border-primary transition-all">
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(post.createdAt)}
                      <span className="mx-1">•</span>
                      {calculateReadingTime(post.content)} min read
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {post.excerpt && (
                      <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    {post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.categories.map((category: Category) => (
                          <span
                            key={category.id}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border"
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
          <div className="text-center py-20 bg-card border rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">No posts found</h3>
            <p className="text-muted-foreground mb-8">
              {selectedCategory === 'all'
                ? 'Be the first to create a post!'
                : 'No posts in this category yet.'}
            </p>
            <Link href="/dashboard/new">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all">
                Create your first post
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
