"use client";

import { useState, useEffect } from "react";
import { useRegions } from "@/hooks/use-regions";
import { useCountries } from "@/hooks/use-countries";
import { useCities } from "@/hooks/use-cities";
import { RegionDialog } from "./dialogs/RegionDialog";
import { CountryDialog } from "./dialogs/CountryDialog";
import { CityDialog } from "./dialogs/CityDialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RegionDetailsProps {
  selectedItem: {
    type: 'region' | 'country' | 'city';
    id: string | null;
  };
  onItemUpdate: () => void;
}

export function RegionDetails({ selectedItem, onItemUpdate }: RegionDetailsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { regions, updateRegion, deleteRegion } = useRegions();
  const { countries, updateCountry, deleteCountry } = useCountries(
    selectedItem.type === 'country' ? null : selectedItem.id
  );
  const { cities, updateCity, deleteCity } = useCities(
    selectedItem.type === 'city' ? null : selectedItem.id
  );

  const selectedRegion = regions.find(r => r.id === selectedItem.id);
  const selectedCountry = countries.find(c => c.id === selectedItem.id);
  const selectedCity = cities.find(c => c.id === selectedItem.id);

  const handleSave = (data: any) => {
    switch (selectedItem.type) {
      case 'region':
        if (selectedItem.id) {
          updateRegion(selectedItem.id, data);
        }
        break;
      case 'country':
        if (selectedItem.id) {
          updateCountry(selectedItem.id, data);
        }
        break;
      case 'city':
        if (selectedItem.id) {
          updateCity(selectedItem.id, data);
        }
        break;
    }
    setIsDialogOpen(false);
    onItemUpdate();
  };

  const handleDelete = () => {
    switch (selectedItem.type) {
      case 'region':
        if (selectedItem.id) {
          deleteRegion(selectedItem.id);
        }
        break;
      case 'country':
        if (selectedItem.id) {
          deleteCountry(selectedItem.id);
        }
        break;
      case 'city':
        if (selectedItem.id) {
          deleteCity(selectedItem.id);
        }
        break;
    }
    setIsDeleteDialogOpen(false);
    onItemUpdate();
  };

  if (!selectedItem.id) {
    return (
      <div className="text-center text-muted-foreground">
        Select an item to view details
      </div>
    );
  }

  const item = selectedRegion || selectedCountry || selectedCity;
  if (!item) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDialogOpen(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {selectedRegion && (
          <>
            <div>
              <span className="font-medium">Code:</span> {selectedRegion.code}
            </div>
            <div>
              <span className="font-medium">Description:</span>{" "}
              {selectedRegion.description}
            </div>
          </>
        )}

        {selectedCountry && (
          <>
            <div>
              <span className="font-medium">Code:</span> {selectedCountry.code}
            </div>
            <div>
              <span className="font-medium">Capital:</span>{" "}
              {selectedCountry.capital}
            </div>
          </>
        )}

        {selectedCity && (
          <>
            <div>
              <span className="font-medium">Population:</span>{" "}
              {selectedCity.population?.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Area:</span> {selectedCity.area} km²
            </div>
          </>
        )}
      </div>

      {selectedItem.type === 'region' && (
        <RegionDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          region={selectedRegion}
          onSave={handleSave}
        />
      )}

      {selectedItem.type === 'country' && (
        <CountryDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          country={selectedCountry}
          onSave={handleSave}
        />
      )}

      {selectedItem.type === 'city' && (
        <CityDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          city={selectedCity}
          onSave={handleSave}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              {selectedItem.type} and all its related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
