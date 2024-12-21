"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RegionFiltersProps {
  type: 'region' | 'country' | 'city';
  filters: Record<string, string>;
  onFiltersChange: (filters: Record<string, string>) => void;
  regions: any[];
  countries: any[];
}

export function RegionFilters({
  type,
  filters,
  onFiltersChange,
  regions = [],
  countries = [],
}: RegionFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    if (key === 'regionId' && !value) {
      delete newFilters.countryId;
    }
    onFiltersChange(newFilters);
  };

  if (type === 'region') return null;

  return (
    <div className="flex items-center gap-4">
      {type !== 'region' && (
        <Select
          value={filters.regionId || "all"}
          onValueChange={(value) => handleFilterChange('regionId', value === 'all' ? '' : value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map(region => (
              <SelectItem key={region.id} value={region.id}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {type === 'city' && filters.regionId && (
        <Select
          value={filters.countryId || "all"}
          onValueChange={(value) => handleFilterChange('countryId', value === 'all' ? '' : value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries
              .filter(country => country.regionId === filters.regionId)
              .map(country => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
