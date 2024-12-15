export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type GetAllCategoriesResponse = Category[];
