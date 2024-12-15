import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title must be at least 2 characters long'),
    content: z.string().optional(),
    slug: z.string().optional(),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>['body'];

export const updatePostSchema = z.object({
  body: z.object({
    content: z.string().optional(),
    status: z.string().optional(),
    title: z.string().optional(),
    slug: z.string().optional(),
    categoryId: z.number().optional(),
  }),
});

export type UpdatePostInput = z.infer<typeof updatePostSchema>['body'];
