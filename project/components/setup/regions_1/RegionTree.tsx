"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRegions } from "@/hooks/use-regions";
import { useCountries } from "@/hooks/use-countries";
import { useCities } from "@/hooks/use-cities";
import { motion, AnimatePresence } from "framer-motion";
import { RegionDialog } from "./dialogs/RegionDialog";
import { CountryDialog } from "./dialogs/CountryDialog";
import { CityDialog } from "./dialogs/CityDialog";

interface RegionTreeProps {
  selectedItem: {
    type: 'region' | 'country' | 'city';
    id: string | null;
  };
  onSelect: (item: { type: 'region' | 'country' | 'city'; id: string | null }) => void;
}

export function RegionTree({ selectedItem, onSelect }: RegionTreeProps) {
  const { regions, addRegion } = useRegions();
  const [expandedRegions, setExpandedRegions] = useState<string[]>([]);
  const [expandedCountries, setExpandedCountries] = useState<string[]>([]);
  const [dialogState, setDialogState] = useState<{
    type: 'region' | 'country' | 'city';
    isOpen: boolean;
    parentId?: string;
  }>({
    type: 'region',
    isOpen: false
  });

  const toggleRegion = (regionId: string) => {
    setExpandedRegions(prev =>
      prev.includes(regionId)
        ? prev.filter(id => id !== regionId)
        : [...prev, regionId]
    );
  };

  const toggleCountry = (countryId: string) => {
    setExpandedCountries(prev =>
      prev.includes(countryId)
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    );
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
    <div className="space-y-2">
      <Button
        variant="ghost"
        className="w-full justify-start font-normal hover:bg-muted/50"
        onClick={() => handleOpenDialog('region')}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Region
      </Button>

      <div className="space-y-1">
        {regions.map((region) => (
          <RegionNode
            key={region.id}
            region={region}
            expanded={expandedRegions.includes(region.id)}
            onToggle={() => toggleRegion(region.id)}
            selectedItem={selectedItem}
            onSelect={onSelect}
            expandedCountries={expandedCountries}
            onToggleCountry={toggleCountry}
            onAddClick={handleOpenDialog}
          />
        ))}
      </div>

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

interface RegionNodeProps {
  region: any;
  expanded: boolean;
  onToggle: () => void;
  selectedItem: {
    type: 'region' | 'country' | 'city';
    id: string | null;
  };
  onSelect: (item: { type: 'region' | 'country' | 'city'; id: string | null }) => void;
  expandedCountries: string[];
  onToggleCountry: (countryId: string) => void;
  onAddClick: (type: 'region' | 'country' | 'city', parentId?: string) => void;
}

function RegionNode({
  region,
  expanded,
  onToggle,
  selectedItem,
  onSelect,
  expandedCountries,
  onToggleCountry,
  onAddClick,
}: RegionNodeProps) {
  const { countries } = useCountries(region.id);
  const isSelected = selectedItem.type === 'region' && selectedItem.id === region.id;

  return (
    <div>
      <div className="flex items-center">
        <div
          onClick={onToggle}
          className="p-1 hover:bg-muted rounded-sm cursor-pointer"
        >
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "flex-1 justify-start font-normal hover:bg-muted/50",
            isSelected && "bg-muted"
          )}
          onClick={() => onSelect({ type: 'region', id: region.id })}
        >
          <span className="ml-2">{region.name}</span>
        </Button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-6 overflow-hidden"
          >
            <Button
              variant="ghost"
              className="w-full justify-start font-normal hover:bg-muted/50 text-sm"
              onClick={() => onAddClick('country', region.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Country
            </Button>

            {countries.map((country) => (
              <CountryNode
                key={country.id}
                country={country}
                expanded={expandedCountries.includes(country.id)}
                onToggle={() => onToggleCountry(country.id)}
                selectedItem={selectedItem}
                onSelect={onSelect}
                onAddClick={onAddClick}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CountryNodeProps {
  country: any;
  expanded: boolean;
  onToggle: () => void;
  selectedItem: {
    type: 'region' | 'country' | 'city';
    id: string | null;
  };
  onSelect: (item: { type: 'region' | 'country' | 'city'; id: string | null }) => void;
  onAddClick: (type: 'region' | 'country' | 'city', parentId?: string) => void;
}

function CountryNode({
  country,
  expanded,
  onToggle,
  selectedItem,
  onSelect,
  onAddClick,
}: CountryNodeProps) {
  const { cities } = useCities(country.id);
  const isSelected = selectedItem.type === 'country' && selectedItem.id === country.id;

  return (
    <div>
      <div className="flex items-center">
        <div
          onClick={onToggle}
          className="p-1 hover:bg-muted rounded-sm cursor-pointer"
        >
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "flex-1 justify-start font-normal hover:bg-muted/50",
            isSelected && "bg-muted"
          )}
          onClick={() => onSelect({ type: 'country', id: country.id })}
        >
          <span className="ml-2">{country.name}</span>
        </Button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-6 overflow-hidden"
          >
            <Button
              variant="ghost"
              className="w-full justify-start font-normal hover:bg-muted/50 text-sm"
              onClick={() => onAddClick('city', country.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add City
            </Button>

            {cities.map((city) => (
              <Button
                key={city.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start font-normal hover:bg-muted/50",
                  selectedItem.type === 'city' && selectedItem.id === city.id && "bg-muted"
                )}
                onClick={() => onSelect({ type: 'city', id: city.id })}
              >
                <span className="ml-6">{city.name}</span>
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
