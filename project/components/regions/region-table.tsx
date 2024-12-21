"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RegionDialog } from "./region-dialog";
import { RegionWithRelations } from "@/types/region";
import { Chip } from "@/components/ui/chip";
import { Edit, Trash2 } from "lucide-react";

interface RegionTableProps {
  regions: RegionWithRelations[];
  onAdd: (data: { name: string }) => void;
  onEdit: (id: string, data: { name: string }) => void;
  onDelete: (id: string) => void;
}

export function RegionTable({ regions, onAdd, onEdit, onDelete }: RegionTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Regions</h2>
        <RegionDialog mode="add" onSave={onAdd} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Counties</TableHead>
            <TableHead>Cities</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {regions.map((region) => (
            <TableRow key={region.id}>
              <TableCell>{region.name}</TableCell>
              <TableCell>
                <div className="flex gap-2 flex-wrap">
                  {region.counties.map((county) => (
                    <Chip key={county.id} variant="secondary">
                      {county.name}
                    </Chip>
                  ))}
                </div>
              </TableCell>
              <TableCell>{region.totalCities}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <RegionDialog
                    mode="edit"
                    initialData={{ name: region.name }}
                    onSave={(data) => onEdit(region.id, data)}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(region.id)}
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
