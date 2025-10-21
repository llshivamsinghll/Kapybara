'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trpc } from '@/providers/trpc-provider';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PostListSkeleton } from '@/components/ui/loading';
import { formatDate } from '@/lib/utils';
import type { Post, Category } from '@/types';

export default function DashboardPage() {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const utils = trpc.useUtils();
  const { data: posts, isLoading, error } = trpc.posts.getAll.useQuery({});

  const deleteMutation = trpc.posts.delete.useMutation({
    onSuccess: () => {
      utils.posts.getAll.invalidate();
      setDeletingId(null);
    },
    onError: (error) => {
      alert(`Error deleting post: ${error.message}`);
      setDeletingId(null);
    },
  });

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setDeletingId(id);
      deleteMutation.mutate({ id });
    }
  };

  const publishedPosts = posts?.filter((p: Post) => p.published) || [];
  const draftPosts = posts?.filter((p: Post) => !p.published) || [];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-3">Dashboard</h1>
            <p className="text-xl text-muted-foreground">Manage your blog posts</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/categories">
              <Button variant="outline" size="lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Categories
              </Button>
            </Link>
            <Link href="/dashboard/new">
              <Button size="lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-4xl mb-2">{posts?.length || 0}</CardTitle>
                  <CardDescription className="text-base font-semibold">Total Posts</CardDescription>
                </div>
                <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-4xl mb-2">{publishedPosts.length}</CardTitle>
                  <CardDescription className="text-base font-semibold">Published</CardDescription>
                </div>
                <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-4xl mb-2">{draftPosts.length}</CardTitle>
                  <CardDescription className="text-base font-semibold">Drafts</CardDescription>
                </div>
                <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center">
                  <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {error && (
          <div className="border-2 border-destructive rounded-lg p-6 mb-8 bg-card">
            <h3 className="font-semibold text-lg mb-1">Error Loading Posts</h3>
            <p className="text-destructive">{error.message}</p>
          </div>
        )}

        {/* Posts List */}
        {isLoading ? (
          <PostListSkeleton />
        ) : posts && posts.length > 0 ? (
          <div className="space-y-10">
            {/* Published Posts */}
            {publishedPosts.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Published Posts ({publishedPosts.length})</h2>
                <div className="space-y-4">
                  {publishedPosts.map((post: Post) => (
                    <Card key={post.id} className="hover:border-primary transition-all">
                      <CardHeader>
                        <div className="flex flex-col lg:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="mb-3">{post.title}</CardTitle>
                            <CardDescription className="flex flex-wrap items-center gap-3">
                              Published {formatDate(post.createdAt)}
                              {post.categories && post.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 ml-4">
                                  {post.categories.map((cat: Category) => (
                                    <span key={cat.id} className="px-2 py-1 bg-secondary text-secondary-foreground border text-xs rounded-lg">
                                      {cat.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </CardDescription>
                          </div>
                          <div className="flex flex-wrap gap-2 items-start">
                            <Link href={`/blog/${post.slug}`}>
                              <Button variant="ghost" size="sm">View</Button>
                            </Link>
                            <Link href={`/dashboard/edit/${post.id}`}>
                              <Button variant="outline" size="sm">Edit</Button>
                            </Link>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(post.id, post.title)}
                              disabled={deletingId === post.id}
                              isLoading={deletingId === post.id}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Draft Posts */}
            {draftPosts.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Drafts ({draftPosts.length})</h2>
                <div className="space-y-4">
                  {draftPosts.map((post: Post) => (
                    <Card key={post.id} className="border-dashed hover:border-primary transition-all">
                      <CardHeader>
                        <div className="flex flex-col lg:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-3">
                              <CardTitle>{post.title}</CardTitle>
                              <span className="px-2 py-1 text-xs font-semibold rounded-lg bg-secondary border">Draft</span>
                            </div>
                            <CardDescription>Last updated {formatDate(post.updatedAt)}</CardDescription>
                          </div>
                          <div className="flex flex-wrap gap-2 items-start">
                            <Link href={`/dashboard/edit/${post.id}`}>
                              <Button variant="outline" size="sm">Edit</Button>
                            </Link>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(post.id, post.title)}
                              disabled={deletingId === post.id}
                              isLoading={deletingId === post.id}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-card border rounded-lg">
            <h3 className="text-2xl font-bold mb-3">No posts yet</h3>
            <p className="text-muted-foreground mb-8">
              Get started by creating your first blog post!
            </p>
            <Link href="/dashboard/new">
              <Button size="lg">Create Your First Post</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
