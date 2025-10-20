export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface PostWithCategories extends Post {
  categories: Category[];
}

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
  categoryIds: number[];
}

export interface UpdatePostInput {
  id: number;
  title?: string;
  content?: string;
  excerpt?: string;
  slug?: string;
  published?: boolean;
  categoryIds?: number[];
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
  slug: string;
}

export interface UpdateCategoryInput {
  id: number;
  name?: string;
  description?: string;
  slug?: string;
}
