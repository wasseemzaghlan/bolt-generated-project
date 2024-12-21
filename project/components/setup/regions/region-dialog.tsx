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
import { useState } from "react";

interface RegionDialogProps {
  mode: "add" | "edit";
  initialData?: { name: string };
  onSave: (data: { name: string }) => void;
  trigger?: React.ReactNode;
}

export function RegionDialog({ mode, initialData, onSave, trigger }: RegionDialogProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    onSave({ name });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">{mode === "add" ? "Add Region" : "Edit"}</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Region" : "Edit Region"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Region Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter region name"
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            {mode === "add" ? "Add Region" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
