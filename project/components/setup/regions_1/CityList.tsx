"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CityDialog } from "./dialogs/CityDialog";
import { useCities } from "@/hooks/use-cities";

interface CityListProps {
  selectedCountry: string | null;
}

export function CityList({ selectedCountry }: CityListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<any>(null);
  const { cities, addCity, updateCity, deleteCity } = useCities(selectedCountry);

  const handleAdd = () => {
    setEditingCity(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (city: any) => {
    setEditingCity(city);
    setIsDialogOpen(true);
  };

  const handleSave = (cityData: any) => {
    if (editingCity) {
      updateCity(editingCity.id, cityData);
    } else {
      addCity({ ...cityData, countryId: selectedCountry });
    }
    setIsDialogOpen(false);
  };

  if (!selectedCountry) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Please select a country first
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search cities..."
          className="max-w-sm"
        />
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add City
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Population</TableHead>
              <TableHead>Area (km²)</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.population?.toLocaleString()}</TableCell>
                <TableCell>{city.area}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(city)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCity(city.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CityDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        city={editingCity}
        onSave={handleSave}
      />
    </div>
  );
}
