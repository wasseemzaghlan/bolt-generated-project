"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Country {
  id: string;
  regionId: string;
  name: string;
  code: string;
  capital: string;
}

interface CountriesStore {
  countries: Country[];
  addCountry: (country: Omit<Country, 'id'>) => void;
  updateCountry: (id: string, country: Partial<Country>) => void;
  deleteCountry: (id: string) => void;
}

const useCountriesStore = create<CountriesStore>()(
  persist(
    (set) => ({
      countries: [],
      addCountry: (country) =>
        set((state) => ({
          countries: [
            ...state.countries,
            { ...country, id: `country_${Date.now()}` },
          ],
        })),
      updateCountry: (id, country) =>
        set((state) => ({
          countries: state.countries.map((c) =>
            c.id === id ? { ...c, ...country } : c
          ),
        })),
      deleteCountry: (id) =>
        set((state) => ({
          countries: state.countries.filter((c) => c.id !== id),
        })),
    }),
    {
      name: 'countries-storage',
    }
  )
);

export const useCountries = (regionId: string | null) => {
  const store = useCountriesStore();
  const filteredCountries = regionId
    ? store.countries.filter((country) => country.regionId === regionId)
    : store.countries;

  return {
    countries: filteredCountries,
    addCountry: store.addCountry,
    updateCountry: store.updateCountry,
    deleteCountry: store.deleteCountry,
  };
};
