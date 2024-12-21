"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MenuState {
  isOpen: boolean;
  isLocked: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleLock: () => void;
}

export const useMenu = create<MenuState>()(
  persist(
    (set) => ({
      isOpen: false,
      isLocked: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      toggleLock: () => set((state) => ({ 
        isLocked: !state.isLocked,
        isOpen: false
      })),
    }),
    {
      name: 'menu-storage',
    }
  )
);
