"use client";

import { useState, useEffect } from 'react';
import { useRegions } from '@/hooks/use-regions';
import { useCountries } from '@/hooks/use-countries';
import { useCities } from '@/hooks/use-cities';

export function useRegionData() {
  const [isLoading, setIsLoading] = useState(true);
  const { regions } = useRegions();
  const { countries } = useCountries(null);
  const { cities } = useCities(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
    regions: regions || [],
    countries: countries || [],
    cities: cities || [],
  };
}
