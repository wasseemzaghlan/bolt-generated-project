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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegions } from "@/hooks/use-regions";
import { Plus, Minus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CountryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  country?: any;
  onSave: (data: any) => void;
  defaultRegionId?: string;
}

export function CountryDialog({
  open,
  onOpenChange,
  country,
  onSave,
  defaultRegionId,
}: CountryDialogProps) {
  const { regions } = useRegions();
  const [formDataList, setFormDataList] = useState([{
    name: "",
    code: "",
    capital: "",
    regionId: defaultRegionId || "",
  }]);

  useEffect(() => {
    if (country) {
      setFormDataList([{
        name: country.name,
        code: country.code,
        capital: country.capital,
        regionId: country.regionId,
      }]);
    } else {
      setFormDataList([{
        name: "",
        code: "",
        capital: "",
        regionId: defaultRegionId || "",
      }]);
    }
  }, [country, defaultRegionId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validRecords = formDataList.filter(data => 
      data.name && data.code && data.capital && data.regionId
    );
    
    if (validRecords.length === 0) return;
    
    if (country) {
      onSave(validRecords[0]);
    } else {
      validRecords.forEach(data => onSave(data));
    }
  };

  const addRecord = () => {
    setFormDataList(prev => [...prev, {
      name: "",
      code: "",
      capital: "",
      regionId: defaultRegionId || "",
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
          <DialogTitle>{country ? "Edit Country" : "Add Countries"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formDataList.map((formData, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                {!country && formDataList.length > 1 && (
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
                  <Label>Region</Label>
                  <Select
                    value={formData.regionId}
                    onValueChange={(value) => updateRecord(index, 'regionId', value)}
                    disabled={!!defaultRegionId}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
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
                  <Label>Capital</Label>
                  <Input
                    value={formData.capital}
                    onChange={(e) => updateRecord(index, 'capital', e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}

            {!country && (
              <Button
                type="button"
                variant="outline"
                onClick={addRecord}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Country
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
