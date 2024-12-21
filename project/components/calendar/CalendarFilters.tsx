"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight, Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";

interface CalendarFilters {
  program: string;
  activityType: string;
  duration: string;
  search: string;
}

interface CalendarFiltersProps {
  onFiltersChange: (filters: CalendarFilters) => void;
}

export function CalendarFilters({ onFiltersChange }: CalendarFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<CalendarFilters>({
    program: "",
    activityType: "",
    duration: "",
    search: "",
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (key: keyof CalendarFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onFiltersChange(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {
      program: "",
      activityType: "",
      duration: "",
      search: "",
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-2" ref={containerRef}>
      <Card className="shadow-sm border-primary/5">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-2 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  isOpen ? "bg-primary/10" : "bg-muted"
                )}>
                  {isOpen ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium">Filters</span>
                </div>
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="p-3 pt-2 border-t space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label className="text-[0.65rem] text-muted-foreground">Program</Label>
                  <Select
                    value={filters.program}
                    onValueChange={(value) => handleFilterChange("program", value)}
                  >
                    <SelectTrigger className="text-xs h-8">
                      <SelectValue placeholder="Select Program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arcane" className="text-xs">Arcane Studies</SelectItem>
                      <SelectItem value="potions" className="text-xs">Potions Mastery</SelectItem>
                      <SelectItem value="defense" className="text-xs">Defense Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-[0.65rem] text-muted-foreground">Activity Type</Label>
                  <Select
                    value={filters.activityType}
                    onValueChange={(value) => handleFilterChange("activityType", value)}
                  >
                    <SelectTrigger className="text-xs h-8">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="study" className="text-xs">Study Session</SelectItem>
                      <SelectItem value="exam" className="text-xs">Exam</SelectItem>
                      <SelectItem value="practice" className="text-xs">Practice</SelectItem>
                      <SelectItem value="other" className="text-xs">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-[0.65rem] text-muted-foreground">Duration</Label>
                  <Select
                    value={filters.duration}
                    onValueChange={(value) => handleFilterChange("duration", value)}
                  >
                    <SelectTrigger className="text-xs h-8">
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short" className="text-xs">Short ({"< 30 min"})</SelectItem>
                      <SelectItem value="medium" className="text-xs">Medium (30-60 min)</SelectItem>
                      <SelectItem value="long" className="text-xs">Long ({"> 60 min"})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-[0.65rem] text-muted-foreground">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input 
                      placeholder="Search activities..." 
                      className="pl-8 text-xs h-8"
                      value={filters.search}
                      onChange={(e) => handleFilterChange("search", e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleReset} className="text-xs h-7">
                  Reset
                </Button>
                <Button size="sm" onClick={handleSearch} className="text-xs h-7">
                  Apply Filters
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}
