import { fetchData } from '@/lib/api-client';
import { FetchError } from '@/lib/class/fetch-error';
import { GetAllCategoriesResponse } from '@/types/category';
import { atomWithQuery } from 'jotai-tanstack-query';

export const getAllCategoriesAtom = atomWithQuery(() => {
  return {
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetchData<GetAllCategoriesResponse>({
        method: 'GET',
        path: '/categories',
        name: 'get-all-categories',
      });

      if (response instanceof FetchError) {
        throw new Error(response.error);
      }

      return response;
    },
  };
});
