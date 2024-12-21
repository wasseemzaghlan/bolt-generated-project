"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RegionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  region?: any;
  onSave: (data: any) => void;
}

export function RegionDialog({
  open,
  onOpenChange,
  region,
  onSave,
}: RegionDialogProps) {
  const [formDataList, setFormDataList] = useState([{
    name: "",
    code: "",
    description: "",
  }]);

  useEffect(() => {
    if (region) {
      setFormDataList([{
        name: region.name,
        code: region.code,
        description: region.description,
      }]);
    } else {
      setFormDataList([{
        name: "",
        code: "",
        description: "",
      }]);
    }
  }, [region]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validRecords = formDataList.filter(data => data.name && data.code);
    
    if (validRecords.length === 0) return;
    
    if (region) {
      onSave(validRecords[0]);
    } else {
      validRecords.forEach(data => onSave(data));
    }
  };

  const addRecord = () => {
    setFormDataList(prev => [...prev, {
      name: "",
      code: "",
      description: "",
    }]);
  };

  const removeRecord = (index: number) => {
    setFormDataList(prev => prev.filter((_, i) => i !== index));
  };

  const updateRecord = (index: number, field: string, value: string) => {
    setFormDataList(prev => prev.map((record, i) => 
      i === index ? { ...record, [field]: value } : record
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{region ? "Edit Region" : "Add Regions"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formDataList.map((formData, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                {!region && formDataList.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => removeRecord(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}

                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => updateRecord(index, 'name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Code</Label>
                  <Input
                    value={formData.code}
                    onChange={(e) => updateRecord(index, 'code', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => updateRecord(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}

            {!region && (
              <Button
                type="button"
                variant="outline"
                onClick={addRecord}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Region
              </Button>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
