'use client';

import { fetchAuthAtom } from '@/state/login-state';
import { useAtomValue } from 'jotai';

export function useAuth() {
  const token = localStorage.getItem('token');
  if (token == null || token === '') {
    window.location.href = '/admin';
  }

  useAtomValue(fetchAuthAtom);
}
