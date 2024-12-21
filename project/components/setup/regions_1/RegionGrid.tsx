"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight } from "lucide-react";
import { useRegions } from "@/hooks/use-regions";
import { useCountries } from "@/hooks/use-countries";
import { useCities } from "@/hooks/use-cities";
import { motion } from "framer-motion";
import { RegionDialog } from "./dialogs/RegionDialog";
import { CountryDialog } from "./dialogs/CountryDialog";
import { CityDialog } from "./dialogs/CityDialog";
import { cn } from "@/lib/utils";

interface RegionGridProps {
  selectedItem: {
    type: 'region' | 'country' | 'city';
    id: string | null;
  };
  onSelect: (item: { type: 'region' | 'country' | 'city'; id: string | null }) => void;
}

export function RegionGrid({ selectedItem, onSelect }: RegionGridProps) {
  const { regions, addRegion } = useRegions();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { countries } = useCountries(selectedRegion);
  const { cities } = useCities(selectedCountry);
  const [dialogState, setDialogState] = useState<{
    type: 'region' | 'country' | 'city';
    isOpen: boolean;
    parentId?: string;
  }>({
    type: 'region',
    isOpen: false
  });

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
    setSelectedCountry(null);
    onSelect({ type: 'region', id: regionId });
  };

  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId);
    onSelect({ type: 'country', id: countryId });
  };

  const handleOpenDialog = (type: 'region' | 'country' | 'city', parentId?: string) => {
    setDialogState({
      type,
      isOpen: true,
      parentId
    });
  };

  const handleCloseDialog = () => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  const handleSave = (data: any) => {
    switch (dialogState.type) {
      case 'region':
        addRegion(data);
        break;
      case 'country':
        if (dialogState.parentId) {
          const { addCountry } = useCountries(dialogState.parentId);
          addCountry({ ...data, regionId: dialogState.parentId });
        }
        break;
      case 'city':
        if (dialogState.parentId) {
          const { addCity } = useCities(dialogState.parentId);
          addCity({ ...data, countryId: dialogState.parentId });
        }
        break;
    }
    handleCloseDialog();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Regions</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenDialog('region')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Region
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {regions.map((region) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between",
                  selectedRegion === region.id && "bg-muted"
                )}
                onClick={() => handleRegionSelect(region.id)}
              >
                <span>{region.name}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedRegion && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Countries</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenDialog('country', selectedRegion)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Country
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {countries.map((country) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between",
                    selectedCountry === country.id && "bg-muted"
                  )}
                  onClick={() => handleCountrySelect(country.id)}
                >
                  <span>{country.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedCountry && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Cities</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenDialog('city', selectedCountry)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add City
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {cities.map((city) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between",
                    selectedItem.type === 'city' && selectedItem.id === city.id && "bg-muted"
                  )}
                  onClick={() => onSelect({ type: 'city', id: city.id })}
                >
                  <span>{city.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {dialogState.isOpen && (
        <>
          {dialogState.type === 'region' && (
            <RegionDialog
              open={true}
              onOpenChange={handleCloseDialog}
              onSave={handleSave}
            />
          )}
          {dialogState.type === 'country' && (
            <CountryDialog
              open={true}
              onOpenChange={handleCloseDialog}
              onSave={handleSave}
            />
          )}
          {dialogState.type === 'city' && (
            <CityDialog
              open={true}
              onOpenChange={handleCloseDialog}
              onSave={handleSave}
            />
          )}
        </>
      )}
    </div>
  );
}
