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

interface CountyDialogProps {
  mode: "add" | "edit";
  regions: Region[];
  initialData?: { name: string; regionId: string };
  onSave: (data: { name: string; regionId: string }) => void;
  trigger?: React.ReactNode;
}

export function CountyDialog({
  mode,
  regions,
  initialData,
  onSave,
  trigger,
}: CountyDialogProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [regionId, setRegionId] = useState(initialData?.regionId || "");
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    onSave({ name, regionId });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">{mode === "add" ? "Add County" : "Edit"}</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New County" : "Edit County"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">County Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter county name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="region">Region</Label>
            <Select value={regionId} onValueChange={setRegionId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} className="w-full">
            {mode === "add" ? "Add County" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
