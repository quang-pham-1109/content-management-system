'use client';

import { ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useHydrateAtoms } from 'jotai/react/utils';
import { queryClientAtom } from 'jotai-tanstack-query';
import { Provider } from 'jotai';

// Attach the query client to the provider
const queryClient = new QueryClient();

const ClientProviders = ({ children }: { children: ReactNode }) => {
  // Hydrate the query client atom
  useHydrateAtoms([[queryClientAtom, queryClient]]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>
    </QueryClientProvider>
  );
};

export default ClientProviders;
