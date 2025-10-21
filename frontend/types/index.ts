export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}
