'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PostListSkeleton } from '@/components/ui/loading';
import { formatDate } from '@/lib/utils';
import type { Post, Category } from '@/types/trpc';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-zinc-400">Manage your blog posts and categories</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/categories">
            <Button variant="outline">Manage Categories</Button>
          </Link>
          <Link href="/dashboard/new">
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{posts?.length || 0}</CardTitle>
            <CardDescription>Total Posts</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{publishedPosts.length}</CardTitle>
            <CardDescription>Published</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{draftPosts.length}</CardTitle>
            <CardDescription>Drafts</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {error && (
        <div className="bg-red-950/50 border border-red-800 rounded-lg p-6 mb-8">
          <h3 className="text-red-300 font-semibold mb-2">Error Loading Posts</h3>
          <p className="text-red-400">{error.message}</p>
        </div>
      )}

      {/* Posts List */}
      {isLoading ? (
        <PostListSkeleton />
      ) : posts && posts.length > 0 ? (
        <div className="space-y-8">
          {/* Published Posts */}
          {publishedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Published Posts</h2>
              <div className="space-y-4">
                {publishedPosts.map((post: Post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="mb-2">{post.title}</CardTitle>
                          <CardDescription>
                            Published on {formatDate(post.createdAt)}
                            {post.categories && post.categories.length > 0 && (
                              <span className="ml-3">
                                {post.categories.map((cat: Category) => (
                                  <span key={cat.id} className="inline-block ml-1 px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs rounded">
                                    {cat.name}
                                  </span>
                                ))}
                              </span>
                            )}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2 items-start">
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="ghost" size="sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </Button>
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
              <h2 className="text-2xl font-bold text-white mb-4">Drafts</h2>
              <div className="space-y-4">
                {draftPosts.map((post: Post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow border-dashed">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="mb-2">
                            {post.title}
                            <span className="ml-2 text-sm font-normal text-yellow-300 bg-yellow-950 border border-yellow-800 px-2 py-1 rounded">
                              Draft
                            </span>
                          </CardTitle>
                          <CardDescription>
                            Last updated {formatDate(post.updatedAt)}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2 items-start">
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
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
          <p className="text-zinc-400 mb-6">Get started by creating your first blog post!</p>
          <Link href="/dashboard/new">
            <Button>Create Your First Post</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
