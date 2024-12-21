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
import { RegionDialog } from "./dialogs/RegionDialog";
import { useRegions } from "@/hooks/use-regions";

interface RegionListProps {
  onRegionSelect: (regionId: string | null) => void;
  selectedRegion: string | null;
}

export function RegionList({ onRegionSelect, selectedRegion }: RegionListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<any>(null);
  const { regions, addRegion, updateRegion, deleteRegion } = useRegions();

  const handleAdd = () => {
    setEditingRegion(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (region: any) => {
    setEditingRegion(region);
    setIsDialogOpen(true);
  };

  const handleSave = (regionData: any) => {
    if (editingRegion) {
      updateRegion(editingRegion.id, regionData);
    } else {
      addRegion(regionData);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search regions..."
          className="max-w-sm"
        />
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Region
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regions.map((region) => (
              <TableRow
                key={region.id}
                className={`cursor-pointer ${
                  selectedRegion === region.id ? "bg-muted" : ""
                }`}
                onClick={() => onRegionSelect(region.id)}
              >
                <TableCell>{region.name}</TableCell>
                <TableCell>{region.code}</TableCell>
                <TableCell>{region.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(region);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRegion(region.id);
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

      <RegionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        region={editingRegion}
        onSave={handleSave}
      />
    </div>
  );
}
