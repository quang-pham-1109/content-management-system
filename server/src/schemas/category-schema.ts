import { z } from 'zod';

export const commentSchema = z.object({
  body: z.object({
    CardId: z.number(),
    Comment: z.string(),
  }),
});
