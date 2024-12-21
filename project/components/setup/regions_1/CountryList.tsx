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
import { CountryDialog } from "./dialogs/CountryDialog";
import { useCountries } from "@/hooks/use-countries";

interface CountryListProps {
  selectedRegion: string | null;
  onCountrySelect: (countryId: string | null) => void;
  selectedCountry: string | null;
}

export function CountryList({
  selectedRegion,
  onCountrySelect,
  selectedCountry,
}: CountryListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<any>(null);
  const { countries, addCountry, updateCountry, deleteCountry } = useCountries(selectedRegion);

  const handleAdd = () => {
    setEditingCountry(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (country: any) => {
    setEditingCountry(country);
    setIsDialogOpen(true);
  };

  const handleSave = (countryData: any) => {
    if (editingCountry) {
      updateCountry(editingCountry.id, countryData);
    } else {
      addCountry({ ...countryData, regionId: selectedRegion });
    }
    setIsDialogOpen(false);
  };

  if (!selectedRegion) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Please select a region first
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search countries..."
          className="max-w-sm"
        />
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Country
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Capital</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countries.map((country) => (
              <TableRow
                key={country.id}
                className={`cursor-pointer ${
                  selectedCountry === country.id ? "bg-muted" : ""
                }`}
                onClick={() => onCountrySelect(country.id)}
              >
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.code}</TableCell>
                <TableCell>{country.capital}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(country);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCountry(country.id);
                      }}
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

      <CountryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        country={editingCountry}
        onSave={handleSave}
      />
    </div>
  );
}
