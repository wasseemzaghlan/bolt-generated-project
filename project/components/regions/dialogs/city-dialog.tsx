"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Region } from "@/types/region";
import { useState } from "react";

interface CityDialogProps {
  mode: "add" | "edit";
  regions: Region[];
  initialData?: { name: string; countyId: string };
  onSave: (data: { name: string; countyId: string }) => void;
  trigger?: React.ReactNode;
}

export function CityDialog({
  mode,
  regions,
  initialData,
  onSave,
  trigger,
}: CityDialogProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [countyId, setCountyId] = useState(initialData?.countyId || "");
  const [open, setOpen] = useState(false);

  const counties = regions.flatMap((region) =>
    region.counties.map((county) => ({
      ...county,
      regionName: region.name,
    }))
  );

  const handleSave = () => {
    onSave({ name, countyId });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">{mode === "add" ? "Add City" : "Edit"}</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New City" : "Edit City"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">City Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter city name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="county">County</Label>
            <Select value={countyId} onValueChange={setCountyId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a county" />
              </SelectTrigger>
              <SelectContent>
                {counties.map((county) => (
                  <SelectItem key={county.id} value={county.id}>
                    {county.name} ({county.regionName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} className="w-full">
            {mode === "add" ? "Add City" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
