"use client";

import { Region } from "@/types/region";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CityDialog } from "./dialogs/city-dialog";
import { Edit, Trash2 } from "lucide-react";
import { Chip } from "@/components/ui/chip";

interface CitiesTabProps {
  regions: Region[];
  onAdd: (data: { name: string; countyId: string }) => void;
  onEdit: (id: string, data: { name: string; countyId: string }) => void;
  onDelete: (id: string) => void;
}

export function CitiesTab({ regions, onAdd, onEdit, onDelete }: CitiesTabProps) {
  const cities = regions.flatMap((region) =>
    region.counties.flatMap((county) =>
      county.cities.map((city) => ({
        ...city,
        countyName: county.name,
        regionName: region.name,
      }))
    )
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Cities</h2>
        <CityDialog mode="add" regions={regions} onSave={onAdd} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>County</TableHead>
            <TableHead>Region</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cities.map((city) => (
            <TableRow key={city.id}>
              <TableCell>{city.name}</TableCell>
              <TableCell>
                <Chip variant="secondary">{city.countyName}</Chip>
              </TableCell>
              <TableCell>
                <Chip variant="default">{city.regionName}</Chip>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <CityDialog
                    mode="edit"
                    regions={regions}
                    initialData={{
                      name: city.name,
                      countyId: city.countyId,
                    }}
                    onSave={(data) => onEdit(city.id, data)}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(city.id)}
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
  );
}
