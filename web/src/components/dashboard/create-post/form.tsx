'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormLabelRequired,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createPostAtom } from '@/state/post-state';
import { useAtomValue } from 'jotai';
import { Spinner } from '@/components/ui/spinner';

const createPostSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  slug: z.string().optional(),
});
type CreatePostSchema = z.infer<typeof createPostSchema>;

export function CreatePostForm() {
  const { mutate, isPending } = useAtomValue(createPostAtom);

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      slug: '',
    },
  });

  const onSubmit = (value: CreatePostSchema) => {
    mutate(value, {
      onSuccess: () => {},
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 p-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabelRequired
                htmlFor="title"
                label="Title"
                invalid={fieldState.invalid}
              />
              <FormControl>
                <Input placeholder="Post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SEO Slug</FormLabel>
              <FormControl>
                <Input placeholder="ex: react-something" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPending ? (
          <Spinner />
        ) : (
          <Button type="submit" className="w-full">
            Create
          </Button>
        )}
      </form>
    </Form>
  );
}
