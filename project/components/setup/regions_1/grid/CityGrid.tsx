"use client";

// Previous imports remain the same...

export function CityGrid({ 
  regions,
  countries,
  cities,
  selectedItem,
  onSelect,
}: CityGridProps) {
  // Previous state declarations remain the same...

  const filteredCountries = countries.filter(country =>
    !selectedRegion || country.regionId === selectedRegion
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {/* Previous header content remains the same... */}
        <div className="flex items-center gap-4">
          <Select 
            value={selectedRegion || "none"} 
            onValueChange={(value) => setSelectedRegion(value === "none" ? "" : value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">All Regions</SelectItem>
              {regions.map(region => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select 
            value={selectedCountry || "none"} 
            onValueChange={(value) => setSelectedCountry(value === "none" ? "" : value)}
            disabled={!selectedRegion}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">All Countries</SelectItem>
              {filteredCountries.map(country => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Rest of the component remains the same... */}
        </div>
      </div>
      {/* Rest of the component remains the same... */}
    </div>
  );
}
