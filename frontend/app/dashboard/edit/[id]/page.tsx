'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading';
import { generateSlug } from '@/lib/utils';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const utils = trpc.useUtils();
  const postId = parseInt(params.id as string);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [initialized, setInitialized] = useState(false);

  const { data: post, isLoading: postLoading } = trpc.posts.getAll.useQuery({});
  const { data: categories } = trpc.categories.getAll.useQuery();

  const currentPost = post?.find((p: any) => p.id === postId);

  const updateMutation = trpc.posts.update.useMutation({
    onSuccess: () => {
      utils.posts.getAll.invalidate();
      router.push('/dashboard');
    },
    onError: (error) => {
      alert(`Error updating post: ${error.message}`);
    },
  });

  // Initialize form with post data
  useEffect(() => {
    if (currentPost && !initialized) {
      setTitle(currentPost.title);
      setSlug(currentPost.slug);
      setExcerpt(currentPost.excerpt || '');
      setContent(currentPost.content);
      setPublished(currentPost.published);
      setSelectedCategories(currentPost.categories?.map((c: any) => c.id) || []);
      setInitialized(true);
    }
  }, [currentPost, initialized]);

  const handleSubmit = async (e: React.FormEvent, shouldPublish: boolean) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !slug.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    updateMutation.mutate({
      id: postId,
      title: title.trim(),
      slug: slug.trim(),
      content: content.trim(),
      excerpt: excerpt.trim() || undefined,
      published: shouldPublish,
      categoryIds: selectedCategories,
    });
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (postLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-950/50 border border-red-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-red-300 mb-2">Post Not Found</h2>
          <p className="text-red-400 mb-6">The post you're trying to edit doesn't exist.</p>
          <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Edit Post</h1>
        <p className="text-zinc-400">Update your blog post</p>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Title */}
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>Basic information about your post</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />

            <div>
              <Input
                label="Slug *"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="post-slug"
                required
              />
              <p className="mt-1 text-sm text-zinc-500">
                URL: /blog/{slug || 'post-slug'}
              </p>
            </div>

            <Textarea
              label="Excerpt (Optional)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary of your post"
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Select categories for your post</CardDescription>
          </CardHeader>
          <CardContent>
            {categories && categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {categories.map((category: any) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategories.includes(category.id)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-zinc-400">
                No categories available.{' '}
                <a href="/dashboard/categories" className="text-indigo-400 hover:underline">
                  Create one
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>Content *</CardTitle>
            <CardDescription>Write your post content in Markdown format</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content here using Markdown formatting..."
              rows={20}
              className="font-mono text-sm"
              required
            />
            <div className="mt-2 text-sm text-zinc-500">
              Supports Markdown with GitHub Flavored Markdown (GFM) extensions
            </div>
          </CardContent>
        </Card>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 p-4 bg-zinc-800 rounded-lg">
          <span className="text-sm font-medium text-zinc-300">Current Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
            published ? 'bg-green-950 text-green-300 border-green-800' : 'bg-yellow-950 text-yellow-300 border-yellow-800'
          }`}>
            {published ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={updateMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={(e) => handleSubmit(e, false)}
            isLoading={updateMutation.isPending}
            disabled={updateMutation.isPending}
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            onClick={(e) => handleSubmit(e, true)}
            isLoading={updateMutation.isPending}
            disabled={updateMutation.isPending}
          >
            {published ? 'Update & Keep Published' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}
