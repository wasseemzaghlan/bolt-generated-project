"use client";

import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  message: string;
  setLoading: (isLoading: boolean, message?: string) => void;
}

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  message: '',
  setLoading: (isLoading: boolean, message: string = 'Loading...') => 
    set({ isLoading, message }),
}));
