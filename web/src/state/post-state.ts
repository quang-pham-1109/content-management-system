import { fetchData } from '@/lib/api-client';
import { FetchError } from '@/lib/class/fetch-error';
import { GenericResponse } from '@/types/base';
import { GetAllPostsResponse, Post } from '@/types/post';
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';
import { toast } from 'sonner';
import { atom } from 'jotai';

interface EditPostProps {
  postId: number;
  content?: string;
  status?: string;
  title?: string;
  categoryId?: number;
}

export const postAtom = atom<Post | null>(null);

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

export const getPostAtom = atomWithQuery((get) => {
  const post = get(postAtom);

  return {
    queryKey: ['post', post?.id],
    queryFn: async () => {
      const response = await fetchData<Post>({
        method: 'GET',
        path: `/posts/${post?.id}`,
        name: 'get-post',
      });

      if (response instanceof FetchError) {
        throw new Error(response);
      }

      return response;
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

export const editPostAtom = atomWithMutation(() => {
  return {
    mutationFn: async ({
      postId,
      content,
      status,
      title,
      categoryId,
    }: EditPostProps) => {
      // Dynamically construct the body object to exclude undefined or empty values
      const body: Record<string, any> = {};
      if (content) body.content = content;
      if (status) body.status = status;
      if (title) body.title = title;
      if (categoryId) body.categoryId = categoryId;

      const response = await fetchData<GenericResponse>({
        method: 'PUT',
        path: `/posts/${postId}`,
        name: 'edit-post-content',
        body,
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
