"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CityList } from "./CityList";
import { motion, AnimatePresence } from "framer-motion";

interface CountryListProps {
  countries: any[];
  cities: any[];
  selectedItem: {
    type: 'region' | 'country' | 'city';
    id: string | null;
  };
  onSelectItem: (item: { type: 'region' | 'country' | 'city'; id: string | null }) => void;
  onAddCountry: () => void;
  onEditCountry: (country: any) => void;
}

export function CountryList({
  countries,
  cities,
  selectedItem,
  onSelectItem,
  onAddCountry,
  onEditCountry,
}: CountryListProps) {
  const [expandedCountries, setExpandedCountries] = useState<string[]>([]);

  const toggleCountry = (countryId: string) => {
    setExpandedCountries(prev =>
      prev.includes(countryId)
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    );
  };

  return (
    <div className="pl-8 pr-4 py-2 space-y-2">
      {countries.map(country => (
        <div
          key={country.id}
          className={cn(
            "rounded-lg p-2 transition-colors",
            selectedItem.type === 'country' && selectedItem.id === country.id && "bg-muted"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => toggleCountry(country.id)}
              >
                {expandedCountries.includes(country.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              <span 
                className="cursor-pointer"
                onClick={() => onSelectItem({ type: 'country', id: country.id })}
              >
                {country.name}
              </span>
              <Badge variant="secondary">{country.code}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {cities.filter(c => c.countryId === country.id).length} Cities
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onEditCountry(country)}
              >
                <Pencil className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {expandedCountries.includes(country.id) && (
              <CityList
                country={country}
                cities={cities.filter(c => c.countryId === country.id)}
                selectedItem={selectedItem}
                onSelectItem={onSelectItem}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-muted-foreground"
        onClick={onAddCountry}
      >
        <Plus className="h-3 w-3 mr-2" />
        Add Country
      </Button>
    </div>
  );
}
