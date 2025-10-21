'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/providers/trpc-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import type { Category } from '@/types';

export default function CategoriesPage() {
  const router = useRouter();
  const utils = trpc.useContext();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Fetch categories
  const { data: categories, isLoading } = trpc.categories.getAll.useQuery();

  // Create mutation
  const createMutation = trpc.categories.create.useMutation({
    onSuccess: () => {
      utils.categories.getAll.invalidate();
      resetForm();
    },
    onError: (err) => {
      setError(err.message || 'Failed to create category');
    },
  });

  // Update mutation
  const updateMutation = trpc.categories.update.useMutation({
    onSuccess: () => {
      utils.categories.getAll.invalidate();
      resetForm();
    },
    onError: (err) => {
      setError(err.message || 'Failed to update category');
    },
  });

  // Delete mutation
  const deleteMutation = trpc.categories.delete.useMutation({
    onSuccess: () => {
      utils.categories.getAll.invalidate();
      setDeletingId(null);
    },
    onError: (err) => {
      alert(`Error deleting category: ${err.message}`);
      setDeletingId(null);
    },
  });

  const resetForm = () => {
    setName('');
    setDescription('');
    setError('');
    setShowCreateForm(false);
    setEditingId(null);
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setDescription(category.description || '');
    setEditingId(category.id);
    setShowCreateForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        name: name.trim(),
        slug,
        description: description.trim() || undefined,
      });
    } else {
      createMutation.mutate({
        name: name.trim(),
        slug,
        description: description.trim() || undefined,
      });
    }
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This will remove it from all posts.`)) {
      setDeletingId(id);
      deleteMutation.mutate({ id });
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-3">Categories</h1>
            <p className="text-xl text-muted-foreground">Organize your blog posts</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
            <Button
              onClick={() => {
                resetForm();
                setShowCreateForm(!showCreateForm);
              }}
            >
              {showCreateForm ? 'Cancel' : 'New Category'}
            </Button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {(showCreateForm || editingId) && (
          <Card className="mb-8 border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl mb-6">
                {editingId ? 'Edit Category' : 'Create New Category'}
              </CardTitle>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Technology, Travel, Food"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of this category (optional)"
                    rows={3}
                    className="w-full"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive rounded-md text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : editingId ? 'Update Category' : 'Create Category'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardHeader>
          </Card>
        )}

        {/* Categories List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        ) : categories && categories.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              All Categories ({categories.length})
            </h2>
            <div className="grid gap-4">
              {categories.map((category: Category) => (
                <Card
                  key={category.id}
                  className={`transition-all ${
                    editingId === category.id ? 'border-2 border-primary' : 'hover:border-primary'
                  }`}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{category.name}</CardTitle>
                        {category.description && (
                          <CardDescription className="text-base">
                            {category.description}
                          </CardDescription>
                        )}
                        <CardDescription className="mt-2 text-sm">
                          Slug: <span className="font-mono">{category.slug}</span>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(category)}
                          disabled={isSubmitting}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(category.id, category.name)}
                          disabled={deletingId === category.id}
                          isLoading={deletingId === category.id}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-card border-2 rounded-lg">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <h3 className="text-2xl font-bold mb-3">No categories yet</h3>
            <p className="text-muted-foreground mb-8">
              Create your first category to organize your blog posts
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              Create Your First Category
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
