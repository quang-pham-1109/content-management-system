import { fetchData } from '@/lib/api-client';
import { FetchError } from '@/lib/class/fetch-error';
import { CreatePostResponse } from '@/types/post';
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';
import { toast } from 'sonner';

export const getAllPostsAtom = atomWithQuery(() => {
  return {
    queryKey: 'posts',
  };
});

export const createPostAtom = atomWithMutation(() => {
  return {
    mutationFn: async ({
      title,
      slug,
    }: {
      title: string;
      slug?: string | undefined;
    }) => {
      const response = await fetchData<CreatePostResponse>({
        method: 'POST',
        path: '/posts',
        name: 'create-post',
        body: {
          title: title,
          slug: slug ?? '',
          status: 'draft',
        },
      });

      if (response instanceof FetchError) {
        throw new Error(response.error);
      }

      return response;
    },
    onError: (error: FetchError) => {
      if (error.status === 500) {
        toast.error('Server Error', {
          description: 'Please try again later',
        });
      }
    },
  };
});
