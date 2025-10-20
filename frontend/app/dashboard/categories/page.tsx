'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading';
import { generateSlug } from '@/lib/utils';

export default function CategoriesPage() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);

  const { data: categories, isLoading } = trpc.categories.getAll.useQuery();

  const createMutation = trpc.categories.create.useMutation({
    onSuccess: () => {
      utils.categories.getAll.invalidate();
      resetForm();
    },
    onError: (error) => {
      alert(`Error creating category: ${error.message}`);
    },
  });

  const updateMutation = trpc.categories.update.useMutation({
    onSuccess: () => {
      utils.categories.getAll.invalidate();
      resetForm();
    },
    onError: (error) => {
      alert(`Error updating category: ${error.message}`);
    },
  });

  const deleteMutation = trpc.categories.delete.useMutation({
    onSuccess: () => {
      utils.categories.getAll.invalidate();
    },
    onError: (error) => {
      alert(`Error deleting category: ${error.message}`);
    },
  });

  const resetForm = () => {
    setName('');
    setDescription('');
    setSlug('');
    setAutoGenerateSlug(true);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (category: any) => {
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description || '');
    setSlug(category.slug);
    setAutoGenerateSlug(false);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !slug.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const data = {
      name: name.trim(),
      description: description.trim() || undefined,
      slug: slug.trim(),
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete the category "${name}"? This will remove it from all associated posts.`)) {
      deleteMutation.mutate({ id });
    }
  };

  // Auto-generate slug from name
  useState(() => {
    if (autoGenerateSlug && name) {
      setSlug(generateSlug(name));
    }
  });

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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Categories</h1>
          <p className="text-zinc-400">Manage your blog categories</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Category'}
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Category' : 'Create New Category'}</CardTitle>
            <CardDescription>
              {editingId ? 'Update category information' : 'Add a new category to organize your posts'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name *"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (autoGenerateSlug) {
                    setSlug(generateSlug(e.target.value));
                  }
                }}
                placeholder="e.g., Technology, Travel, Lifestyle"
                required
              />

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-zinc-300">Slug *</label>
                  {!editingId && (
                    <label className="flex items-center text-sm text-zinc-400">
                      <input
                        type="checkbox"
                        checked={autoGenerateSlug}
                        onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                        className="mr-2 rounded border-zinc-700 bg-zinc-900 text-indigo-500 focus:ring-indigo-500"
                      />
                      Auto-generate
                    </label>
                  )}
                </div>
                <Input
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setAutoGenerateSlug(false);
                  }}
                  placeholder="category-slug"
                  required
                  disabled={autoGenerateSlug && !editingId}
                />
              </div>

              <Textarea
                label="Description (Optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this category"
                rows={3}
              />

              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={createMutation.isPending || updateMutation.isPending}
                >
                  {editingId ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Categories List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category: any) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{category.name}</CardTitle>
                    <CardDescription>
                      {category.description || 'No description'}
                    </CardDescription>
                    <div className="mt-2 text-xs text-zinc-500">
                      Slug: {category.slug}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(category.id, category.name)}
                      isLoading={deleteMutation.isPending}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No categories yet</h3>
          <p className="text-zinc-400 mb-6">Create your first category to organize your blog posts</p>
          <Button onClick={() => setShowForm(true)}>Create First Category</Button>
        </div>
      )}
    </div>
  );
}
