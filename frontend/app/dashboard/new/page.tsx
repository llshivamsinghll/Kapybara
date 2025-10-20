'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateSlug } from '@/lib/utils';

export default function NewPostPage() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);

  const { data: categories } = trpc.categories.getAll.useQuery();

  const createMutation = trpc.posts.create.useMutation({
    onSuccess: (data) => {
      utils.posts.getAll.invalidate();
      router.push('/dashboard');
    },
    onError: (error) => {
      alert(`Error creating post: ${error.message}`);
    },
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (autoGenerateSlug && title) {
      setSlug(generateSlug(title));
    }
  }, [title, autoGenerateSlug]);

  const handleSubmit = async (e: React.FormEvent, shouldPublish: boolean) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !slug.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    createMutation.mutate({
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
        <h1 className="text-4xl font-bold text-white mb-2">Create New Post</h1>
        <p className="text-zinc-400">Write and publish your blog post</p>
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
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-zinc-300">Slug *</label>
                <label className="flex items-center text-sm text-zinc-400">
                  <input
                    type="checkbox"
                    checked={autoGenerateSlug}
                    onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                    className="mr-2 rounded border-zinc-700 bg-zinc-900 text-indigo-500 focus:ring-indigo-500"
                  />
                  Auto-generate
                </label>
              </div>
              <Input
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setAutoGenerateSlug(false);
                }}
                placeholder="post-slug"
                required
                disabled={autoGenerateSlug}
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
              placeholder="# Your Post Title

Write your content here using **Markdown** formatting.

## Subheading

- Bullet point 1
- Bullet point 2

```javascript
const code = 'example';
```"
              rows={20}
              className="font-mono text-sm"
              required
            />
            <div className="mt-2 text-sm text-zinc-500">
              Supports Markdown with GitHub Flavored Markdown (GFM) extensions
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={createMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={(e) => handleSubmit(e, false)}
            isLoading={createMutation.isPending && !published}
            disabled={createMutation.isPending}
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            onClick={(e) => handleSubmit(e, true)}
            isLoading={createMutation.isPending && published}
            disabled={createMutation.isPending}
          >
            Publish Post
          </Button>
        </div>
      </form>
    </div>
  );
}
