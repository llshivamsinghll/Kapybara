'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/providers/trpc-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import type { Category } from '@/types';
import { use } from 'react';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const postId = parseInt(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');

  // Fetch post data
  const { data: post, isLoading: postLoading } = trpc.posts.getById.useQuery(postId);

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = trpc.categories.getAll.useQuery();

  // Update post mutation
  const updatePost = trpc.posts.update.useMutation({
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (err) => {
      setError(err.message || 'Failed to update post');
    },
  });

  // Populate form when post data loads
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setExcerpt(post.excerpt || '');
      setPublished(post.published);
      setSelectedCategories(post.categories?.map((c: Category) => c.id) || []);
    }
  }, [post]);

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

    // Generate new slug if title changed
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    updatePost.mutate({
      id: postId,
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

  if (postLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Post Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The post you&apos;re trying to edit doesn&apos;t exist.
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Edit Post</h1>
        <p className="text-muted-foreground">
          Update your blog post
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
                placeholder="Brief description of the post"
                rows={3}
                className="w-full"
              />
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
                placeholder="Write your post content here"
                rows={16}
                className="w-full font-mono text-sm"
                required
              />
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
                <div className="font-medium">Published</div>
                <div className="text-sm text-muted-foreground">
                  {published
                    ? 'Post is visible to all users'
                    : 'Post is saved as draft'}
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
            disabled={updatePost.isPending}
            className="flex-1 md:flex-none"
          >
            {updatePost.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard')}
            disabled={updatePost.isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
