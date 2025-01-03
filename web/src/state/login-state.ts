import { toast } from 'sonner';
import { fetchData } from '@/lib/api-client';
import { FetchError } from '@/lib/class/fetch-error';
import { LoginResponse } from '@/types/auth';
import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';
import { setTokenStore } from '@/store/login-store';
import { GenericResponse } from '@/types/base';

interface LoginAdminProps {
  email: string;
  password: string;
}

export const loginAdminAtom = atomWithMutation(() => {
  return {
    mutationFn: async ({ email, password }: LoginAdminProps) => {
      const response = await fetchData<LoginResponse>({
        method: 'POST',
        path: '/auth/login',
        name: 'login-admin',
        body: {
          email: email,
          password: password,
        },
      });

      // Set localStorage token store
      if (response.token) {
        localStorage.setItem('token', response.token.toString());
      }

      return response;
    },
    onError: (error: FetchError) => {
      if (error.status === 401) {
        toast.error('Invalid email or password', {
          description: 'Please try again',
        });
      }

      if (error.status === 500) {
        toast.error('Server Error', {
          description: 'Please try again later',
        });
      }
    },
    onSuccess: () => {
      // Redirect to the dashboard when the login is successful
      window.location.href = '/dashboard';
      toast.success('Login successful', {
        description: 'You are now logged in',
      });
    },
  };
});

export const fetchAuthAtom = atomWithQuery(() => {
  return {
    queryKey: ['auth'],
    queryFn: async () => {
      const res = await fetchData<GenericResponse>({
        method: 'GET',
        path: '/auth',
        name: 'fetch-auth',
      });

      return res;
    },
    onError: (error: FetchError) => {
      if (error.status === 401) {
        toast.error('Unauthorized', {
          description: 'Please login to access this page',
        });
        window.location.href = '/admin';
      }

      if (error.status === 500) {
        toast.error('Server Error', {
          description: 'Please try again later',
        });
      }
    },
  };
});
