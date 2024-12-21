"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface City {
  id: string;
  countryId: string;
  regionId: string;
  name: string;
  population?: number;
  area?: number;
}

interface CitiesStore {
  cities: City[];
  addCity: (city: Omit<City, 'id'>) => void;
  updateCity: (id: string, city: Partial<City>) => void;
  deleteCity: (id: string) => void;
}

const useCitiesStore = create<CitiesStore>()(
  persist(
    (set) => ({
      cities: [],
      addCity: (city) =>
        set((state) => ({
          cities: [
            ...state.cities,
            { ...city, id: `city_${Date.now()}` },
          ],
        })),
      updateCity: (id, city) =>
        set((state) => ({
          cities: state.cities.map((c) =>
            c.id === id ? { ...c, ...city } : c
          ),
        })),
      deleteCity: (id) =>
        set((state) => ({
          cities: state.cities.filter((c) => c.id !== id),
        })),
    }),
    {
      name: 'cities-storage',
    }
  )
);

export const useCities = (countryId: string | null) => {
  const store = useCitiesStore();
  const cities = countryId
    ? store.cities.filter((city) => city.countryId === countryId)
    : store.cities;

  return {
    cities,
    addCity: store.addCity,
    updateCity: store.updateCity,
    deleteCity: store.deleteCity,
  };
};
