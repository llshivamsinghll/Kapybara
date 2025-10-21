'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/providers/trpc-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import type { Category } from '@/types';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = trpc.categories.getAll.useQuery();

  // Create post mutation
  const createPost = trpc.posts.create.useMutation({
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (err) => {
      setError(err.message || 'Failed to create post');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    if (selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    createPost.mutate({
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt.trim() || content.trim().substring(0, 150) + '...',
      published,
      categoryIds: selectedCategories,
    });
  };

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Post</h1>
        <p className="text-muted-foreground">
          Write and publish a new blog post
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title *
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="w-full"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                Excerpt
              </label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the post (optional - will be auto-generated from content)"
                rows={3}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Leave empty to auto-generate from content
              </p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Content * (Markdown supported)
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here. Markdown is supported."
                rows={16}
                className="w-full font-mono text-sm"
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                You can use Markdown formatting (# headers, **bold**, *italic*, etc.)
              </p>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Categories *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories?.map((category: Category) => (
                  <label
                    key={category.id}
                    className={`
                      flex items-center gap-2 p-3 rounded-md border-2 cursor-pointer transition-colors
                      ${
                        selectedCategories.includes(category.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </label>
                ))}
              </div>
              {categories?.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  No categories available. Please create categories first.
                </p>
              )}
            </div>

            {/* Published Toggle */}
            <div className="flex items-center gap-3 p-4 bg-muted rounded-md">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-5 h-5"
              />
              <label htmlFor="published" className="flex-1">
                <div className="font-medium">Publish immediately</div>
                <div className="text-sm text-muted-foreground">
                  {published
                    ? 'Post will be visible to all users'
                    : 'Post will be saved as draft'}
                </div>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-md text-destructive text-sm">
                {error}
              </div>
            )}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={createPost.isPending}
            className="flex-1 md:flex-none"
          >
            {createPost.isPending ? 'Creating...' : published ? 'Publish Post' : 'Save as Draft'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard')}
            disabled={createPost.isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
