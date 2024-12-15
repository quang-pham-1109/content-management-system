export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  authorId: number;
  categoryId: number | null;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export type GetAllPostsResponse = Post[];
