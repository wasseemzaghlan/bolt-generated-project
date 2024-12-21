"use client";

import { useRouter } from 'next/navigation';
import { useLoading } from './use-loading';
import { useCallback } from 'react';

export function useNavigation() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const navigate = useCallback((path: string, loadingMessage: string = 'Loading...') => {
    setLoading(true, loadingMessage);
    setTimeout(() => {
      router.push(path);
      // Add a small delay before hiding the loading state to ensure smooth transition
      setTimeout(() => setLoading(false), 500);
    }, 300);
  }, [router, setLoading]);

  return { navigate };
}
