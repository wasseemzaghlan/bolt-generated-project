"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useRegions } from "@/hooks/use-regions";
import { useCountries } from "@/hooks/use-countries";
import { useCities } from "@/hooks/use-cities";
import { RegionDialog } from "../dialogs/RegionDialog";
import { CountryDialog } from "../dialogs/CountryDialog";
import { CityDialog } from "../dialogs/CityDialog";
import { RegionActions } from "./RegionActions";
import { RegionFilters } from "./RegionFilters";
import { useToast } from "@/hooks/use-toast";
import { TableCheckbox } from "./TableCheckbox";

interface RegionGridProps {
  type: 'region' | 'country' | 'city';
  regions: any[];
  countries: any[];
  cities: any[];
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

export function RegionGrid({ type, regions = [], countries = [], cities = [] }: RegionGridProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [dialogState, setDialogState] = useState<{
    type: 'region' | 'country' | 'city';
    isOpen: boolean;
    parentId?: string;
    editItem?: any;
  }>({
    type: 'region',
    isOpen: false
  });

  const { addRegion, updateRegion, deleteRegion } = useRegions();
  const { addCountry, updateCountry, deleteCountry } = useCountries(null);
  const { addCity, updateCity, deleteCity } = useCities(null);
  const { toast } = useToast();

  const items = type === 'region' ? regions 
    : type === 'country' ? countries 
    : cities;

  const filteredItems = items.filter(item => {
    if (type === 'country' && filters.regionId) {
      if (item.regionId !== filters.regionId) return false;
    }
    if (type === 'city') {
      if (filters.regionId && item.regionId !== filters.regionId) return false;
      if (filters.countryId && item.countryId !== filters.countryId) return false;
    }
    return Object.entries(filters).every(([key, value]) => {
      if (!value || key === 'regionId' || key === 'countryId') return true;
      const itemValue = String(item[key] || '').toLowerCase();
      return itemValue.includes(value.toLowerCase());
    });
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = String(a[sortConfig.key] || '');
    const bValue = String(b[sortConfig.key] || '');
    return sortConfig.direction === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? sortedItems.map(item => item.id) : []);
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    setSelectedItems(prev => 
      checked ? [...prev, itemId] : prev.filter(id => id !== itemId)
    );
  };

  const handleSave = async (data: any) => {
    try {
      switch (dialogState.type) {
        case 'region':
          if (dialogState.editItem) {
            await updateRegion(dialogState.editItem.id, data);
          } else {
            await addRegion(data);
          }
          break;
        case 'country':
          if (dialogState.editItem) {
            await updateCountry(dialogState.editItem.id, data);
          } else {
            await addCountry({ ...data, regionId: dialogState.parentId || data.regionId });
          }
          break;
        case 'city':
          if (dialogState.editItem) {
            await updateCity(dialogState.editItem.id, data);
          } else {
            await addCity({ ...data, countryId: dialogState.parentId || data.countryId });
          }
          break;
      }

      setDialogState(prev => ({ ...prev, isOpen: false }));
      toast({
        title: "Success",
        description: `${dialogState.editItem ? 'Updated' : 'Added'} successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (items: any[]) => {
    try {
      for (const item of items) {
        switch (type) {
          case 'region':
            // Delete all related countries and cities first
            const relatedCountries = countries.filter(c => c.regionId === item.id);
            for (const country of relatedCountries) {
              const relatedCities = cities.filter(c => c.countryId === country.id);
              for (const city of relatedCities) {
                await deleteCity(city.id);
              }
              await deleteCountry(country.id);
            }
            await deleteRegion(item.id);
            break;
          case 'country':
            // Delete all related cities first
            const relatedCities = cities.filter(c => c.countryId === item.id);
            for (const city of relatedCities) {
              await deleteCity(city.id);
            }
            await deleteCountry(item.id);
            break;
          case 'city':
            await deleteCity(item.id);
            break;
        }
      }
      setSelectedItems([]);
      toast({
        title: "Deleted successfully",
        description: `Selected ${type}s have been deleted.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete ${type}s.`,
        variant: "destructive"
      });
    }
  };

  const handleAddChild = (parentId: string) => {
    if (type === 'region') {
      setDialogState({
        type: 'country',
        isOpen: true,
        parentId
      });
    } else if (type === 'country') {
      setDialogState({
        type: 'city',
        isOpen: true,
        parentId
      });
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'code', label: 'Code' },
    ...(type !== 'region' ? [{ key: 'parent', label: 'Parent' }] : []),
  ];

  return (
    <Card className="border shadow-sm">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${type}s...`}
                value={filters.name || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                className="pl-9 w-[300px]"
              />
            </div>
            <RegionFilters
              type={type}
              filters={filters}
              onFiltersChange={setFilters}
              regions={regions}
              countries={countries}
            />
          </div>
          <div className="flex items-center gap-2">
            {selectedItems.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={() => handleDelete(
                  sortedItems.filter(item => selectedItems.includes(item.id))
                )}
                className="flex items-center gap-2"
              >
                Delete Selected ({selectedItems.length})
              </Button>
            )}
            <Button onClick={() => setDialogState({ type, isOpen: true })} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <TableCheckbox
                    checked={selectedItems.length === sortedItems.length}
                    indeterminate={selectedItems.length > 0 && selectedItems.length < sortedItems.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {columns.map(column => (
                  <TableHead key={column.key}>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 hover:bg-transparent px-0 font-medium"
                    >
                      {column.label}
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder={`Filter ${column.label.toLowerCase()}...`}
                      value={filters[column.key] || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, [column.key]: e.target.value }))}
                      className="mt-2 h-7 text-xs"
                    />
                  </TableHead>
                ))}
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <TableCheckbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {item.code && <Badge variant="secondary">{item.code}</Badge>}
                  </TableCell>
                  {type !== 'region' && (
                    <TableCell>
                      {type === 'country' 
                        ? regions.find(r => r.id === item.regionId)?.name
                        : countries.find(c => c.id === item.countryId)?.name
                      }
                    </TableCell>
                  )}
                  <TableCell>
                    <RegionActions
                      item={item}
                      type={type}
                      onEdit={() => setDialogState({ type, isOpen: true, editItem: item })}
                      onDelete={() => handleDelete([item])}
                      onAddChild={() => handleAddChild(item.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {dialogState.isOpen && (
        <>
          {dialogState.type === 'region' && (
            <RegionDialog
              open={true}
              onOpenChange={(open) => setDialogState(prev => ({ ...prev, isOpen: open }))}
              region={dialogState.editItem}
              onSave={handleSave}
            />
          )}
          {dialogState.type === 'country' && (
            <CountryDialog
              open={true}
              onOpenChange={(open) => setDialogState(prev => ({ ...prev, isOpen: open }))}
              country={dialogState.editItem}
              onSave={handleSave}
              defaultRegionId={dialogState.parentId}
            />
          )}
          {dialogState.type === 'city' && (
            <CityDialog
              open={true}
              onOpenChange={(open) => setDialogState(prev => ({ ...prev, isOpen: open }))}
              city={dialogState.editItem}
              onSave={handleSave}
              defaultCountryId={dialogState.parentId}
            />
          )}
        </>
      )}
    </Card>
  );
}
