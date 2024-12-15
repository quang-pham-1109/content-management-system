import { fetchData } from '@/lib/api-client';
import { Post } from '@/types/post';

export const getPost = async (postId: number): Promise<Post | null> => {
  try {
    const response = await fetchData<Post>({
      method: 'GET',
      path: `/posts/${postId}`,
      name: 'get-post',
    });

    return response;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null; // Return null to handle the "notFound" case
  }
};
