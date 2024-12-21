"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface CityListProps {
  country: any;
  cities: any[];
  selectedItem: {
    type: 'region' | 'country' | 'city';
    id: string | null;
  };
  onSelectItem: (item: { type: 'region' | 'country' | 'city'; id: string | null }) => void;
}

export function CityList({
  country,
  cities,
  selectedItem,
  onSelectItem,
}: CityListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="pl-8 mt-2 space-y-1"
    >
      {cities.map(city => (
        <div
          key={city.id}
          className={cn(
            "flex items-center justify-between p-2 rounded-lg",
            selectedItem.type === 'city' && selectedItem.id === city.id && "bg-muted"
          )}
          onClick={() => onSelectItem({ type: 'city', id: city.id })}
        >
          <span>{city.name}</span>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {city.population?.toLocaleString() || "N/A"} pop.
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                // Handle edit city
              }}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-muted-foreground"
        onClick={() => {
          // Handle add city
        }}
      >
        <Plus className="h-3 w-3 mr-2" />
        Add City
      </Button>
    </motion.div>
  );
}
