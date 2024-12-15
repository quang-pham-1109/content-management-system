import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title must be at least 2 characters long'),
    content: z.string().min(2, 'Content must be at least 2 characters long'),
    slug: z.string().optional(),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>['body'];

export const updatePostSchema = z.object({
  body: z.object({
    content: z.string().optional(),
  }),
});

export type UpdatePostInput = z.infer<typeof updatePostSchema>['body'];
