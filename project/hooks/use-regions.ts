"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Region {
  id: string;
  name: string;
  code: string;
  description: string;
}

interface RegionsStore {
  regions: Region[];
  addRegion: (region: Omit<Region, 'id'>) => void;
  updateRegion: (id: string, region: Partial<Region>) => void;
  deleteRegion: (id: string) => void;
}

export const useRegions = create<RegionsStore>()(
  persist(
    (set) => ({
      regions: [],
      addRegion: (region) =>
        set((state) => ({
          regions: [
            ...state.regions,
            { ...region, id: `region_${Date.now()}` },
          ],
        })),
      updateRegion: (id, region) =>
        set((state) => ({
          regions: state.regions.map((r) =>
            r.id === id ? { ...r, ...region } : r
          ),
        })),
      deleteRegion: (id) =>
        set((state) => ({
          regions: state.regions.filter((r) => r.id !== id),
        })),
    }),
    {
      name: 'regions-storage',
    }
  )
);
