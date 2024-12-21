"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountryList } from "./CountryList";
import { motion, AnimatePresence } from "framer-motion";

interface RegionRowProps {
  region: any;
  countries: any[];
  cities: any[];
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: () => void;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  selectedItem: {
    type: 'region' | 'country' | 'city';
    id: string | null;
  };
  onSelectItem: (item: { type: 'region' | 'country' | 'city'; id: string | null }) => void;
  onAddCountry: (regionId: string) => void;
  onEditCountry: (country: any) => void;
}

export function RegionRow({
  region,
  countries,
  cities,
  isExpanded,
  isSelected,
  onToggle,
  onSelect,
  onEdit,
  onDelete,
  selectedItem,
  onSelectItem,
  onAddCountry,
  onEditCountry,
}: RegionRowProps) {
  const regionCountries = countries.filter(c => c.regionId === region.id);

  return (
    <>
      <TableRow
        className={cn(
          "cursor-pointer transition-colors",
          isSelected && "bg-muted"
        )}
      >
        <TableCell className="font-medium">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            <span onClick={onSelect}>{region.name}</span>
          </div>
        </TableCell>
        <TableCell>
          <Badge variant="secondary">{region.code}</Badge>
        </TableCell>
        <TableCell className="max-w-[300px] truncate">
          {region.description}
        </TableCell>
        <TableCell>
          <Badge variant="outline">
            {regionCountries.length} Countries
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <td colSpan={5} className="p-0">
              <CountryList
                countries={regionCountries}
                cities={cities}
                selectedItem={selectedItem}
                onSelectItem={onSelectItem}
                onAddCountry={() => onAddCountry(region.id)}
                onEditCountry={onEditCountry}
              />
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}
