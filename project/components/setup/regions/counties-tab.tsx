"use client";

import { Region } from "@/types/region";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CountyDialog } from "./dialogs/county-dialog";
import { Edit, Trash2 } from "lucide-react";
import { Chip } from "@/components/ui/chip";

interface CountiesTabProps {
  regions: Region[];
  onAdd: (data: { name: string; regionId: string }) => void;
  onEdit: (id: string, data: { name: string; regionId: string }) => void;
  onDelete: (id: string) => void;
}

export function CountiesTab({ regions, onAdd, onEdit, onDelete }: CountiesTabProps) {
  const counties = regions.flatMap((region) =>
    region.counties.map((county) => ({
      ...county,
      regionName: region.name,
    }))
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Counties</h2>
        <CountyDialog mode="add" regions={regions} onSave={onAdd} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Cities</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {counties.map((county) => (
            <TableRow key={county.id}>
              <TableCell>{county.name}</TableCell>
              <TableCell>
                <Chip variant="secondary">{county.regionName}</Chip>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 flex-wrap">
                  {county.cities.map((city) => (
                    <Chip key={city.id} variant="default">
                      {city.name}
                    </Chip>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <CountyDialog
                    mode="edit"
                    regions={regions}
                    initialData={{
                      name: county.name,
                      regionId: county.regionId,
                    }}
                    onSave={(data) => onEdit(county.id, data)}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(county.id)}
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
