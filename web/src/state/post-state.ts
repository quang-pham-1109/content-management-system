import { fetchData } from '@/lib/api-client';
import { FetchError } from '@/lib/class/fetch-error';
import { GenericResponse } from '@/types/base';
import { CreatePostResponse, GetAllPostsResponse, Post } from '@/types/post';
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';
import { toast } from 'sonner';

export const getAllPostsAtom = atomWithQuery(() => {
  return {
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetchData<GetAllPostsResponse>({
        method: 'GET',
        path: '/posts',
        name: 'get-all-posts',
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

export const createPostAtom = atomWithMutation(() => {
  return {
    mutationFn: async ({
      title,
      slug,
    }: {
      title: string;
      slug?: string | undefined;
    }) => {
      const response = await fetchData<Post>({
        method: 'POST',
        path: '/posts',
        name: 'create-post',
        body: {
          title: title,
          slug: slug ?? '',
        },
      });

      if (response instanceof FetchError) {
        throw new Error(response);
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

export const editPostContentAtom = atomWithMutation(() => {
  return {
    mutationFn: async ({
      content,
      postId,
    }: {
      content?: string;
      postId: number;
    }) => {
      const response = await fetchData<GenericResponse>({
        method: 'PUT',
        path: `/posts/${postId}`,
        name: 'edit-post-content',
        body: {
          content: content ?? '',
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
    onSuccess: () => {
      toast.success('Post updated');
    },
  };
});
