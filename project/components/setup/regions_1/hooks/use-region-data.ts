"use client";

import { useState, useEffect } from 'react';
import { useRegions } from '@/hooks/use-regions';
import { useCountries } from '@/hooks/use-countries';
import { useCities } from '@/hooks/use-cities';

export function useRegionData(selectedRegion: string | null, selectedCountry: string | null) {
  const [isLoading, setIsLoading] = useState(true);
  const { regions } = useRegions();
  const { countries } = useCountries(selectedRegion);
  const { cities } = useCities(selectedCountry);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay for demo
        await new Promise(resolve => setTimeout(resolve, 500));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedRegion, selectedCountry]);

  return {
    isLoading,
    regions,
    countries,
    cities,
  };
}
