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
import { useCountries } from "@/hooks/use-countries";
import { Plus, Minus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  city?: any;
  onSave: (data: any) => void;
  defaultCountryId?: string;
}

export function CityDialog({
  open,
  onOpenChange,
  city,
  onSave,
  defaultCountryId,
}: CityDialogProps) {
  const { regions } = useRegions();
  const [formDataList, setFormDataList] = useState([{
    name: "",
    population: "",
    area: "",
    regionId: "",
    countryId: defaultCountryId || "",
  }]);

  const { countries } = useCountries(formDataList[0].regionId || null);

  useEffect(() => {
    if (city) {
      setFormDataList([{
        name: city.name,
        population: city.population?.toString() || "",
        area: city.area?.toString() || "",
        regionId: city.regionId || "",
        countryId: city.countryId || "",
      }]);
    } else {
      const defaultCountry = countries.find(c => c.id === defaultCountryId);
      setFormDataList([{
        name: "",
        population: "",
        area: "",
        regionId: defaultCountry?.regionId || "",
        countryId: defaultCountryId || "",
      }]);
    }
  }, [city, defaultCountryId, countries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validRecords = formDataList.filter(data => 
      data.name && data.countryId && data.regionId
    );
    
    if (validRecords.length === 0) return;
    
    if (city) {
      onSave(validRecords[0]);
    } else {
      validRecords.forEach(data => onSave(data));
    }
  };

  const addRecord = () => {
    setFormDataList(prev => [...prev, {
      name: "",
      population: "",
      area: "",
      regionId: formDataList[0].regionId,
      countryId: formDataList[0].countryId,
    }]);
  };

  const removeRecord = (index: number) => {
    setFormDataList(prev => prev.filter((_, i) => i !== index));
  };

  const updateRecord = (index: number, field: string, value: string) => {
    setFormDataList(prev => prev.map((record, i) => {
      if (i === index) {
        const updated = { ...record, [field]: value };
        // If changing region, reset country
        if (field === 'regionId') {
          updated.countryId = '';
        }
        return updated;
      }
      return record;
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{city ? "Edit City" : "Add Cities"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formDataList.map((formData, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                {!city && formDataList.length > 1 && (
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
                    disabled={!!defaultCountryId}
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
                  <Label>Country</Label>
                  <Select
                    value={formData.countryId}
                    onValueChange={(value) => updateRecord(index, 'countryId', value)}
                    disabled={!formData.regionId || !!defaultCountryId}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries
                        .filter(country => country.regionId === formData.regionId)
                        .map((country) => (
                          <SelectItem key={country.id} value={country.id}>
                            {country.name}
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
                  <Label>Population</Label>
                  <Input
                    type="number"
                    value={formData.population}
                    onChange={(e) => updateRecord(index, 'population', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Area (km²)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.area}
                    onChange={(e) => updateRecord(index, 'area', e.target.value)}
                  />
                </div>
              </div>
            ))}

            {!city && (
              <Button
                type="button"
                variant="outline"
                onClick={addRecord}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another City
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
