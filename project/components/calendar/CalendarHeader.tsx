"use client";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CalendarHeaderProps {
  view: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const viewOptions = {
  day: { label: "Day View", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  week: { label: "Week View", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  month: { label: "Month View", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" }
} as const;

export function CalendarHeader({
  view,
  onViewChange,
  selectedDate,
  onDateChange,
}: CalendarHeaderProps) {
  const navigateDate = (direction: 'prev' | 'next') => {
    if (view === 'month') {
      onDateChange(direction === 'prev' ? subMonths(selectedDate, 1) : addMonths(selectedDate, 1));
    } else if (view === 'week') {
      onDateChange(direction === 'prev' ? subWeeks(selectedDate, 1) : addWeeks(selectedDate, 1));
    } else {
      onDateChange(direction === 'prev' ? subDays(selectedDate, 1) : addDays(selectedDate, 1));
    }
  };

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 p-3 rounded-lg border border-primary/10 shadow-sm backdrop-blur-sm">
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate('prev')}
            className="h-7 w-7 hover:bg-primary/5 hover:text-primary border-primary/10"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate('next')}
            className="h-7 w-7 hover:bg-primary/5 hover:text-primary border-primary/10"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-full bg-primary/10">
            <CalendarIcon className="h-4 w-4 text-primary" />
          </div>
          <motion.div 
            className="space-y-0.5"
            key={selectedDate.toISOString()}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-base font-medium text-gray-800 dark:text-gray-200">
              {format(selectedDate, view === 'day' ? 'MMMM d, yyyy' : 'MMMM yyyy')}
            </h2>
            <Badge variant="secondary" className={cn("text-xs px-1.5 py-0.5", viewOptions[view].color)}>
              {viewOptions[view].label}
            </Badge>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Select value={view} onValueChange={(value: 'day' | 'week' | 'month') => onViewChange(value)}>
          <SelectTrigger className="w-[150px] h-8 text-xs bg-white/50 dark:bg-gray-800/50 border-primary/10 hover:bg-primary/5">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(viewOptions).map(([value, { label }]) => (
              <SelectItem key={value} value={value} className="text-xs">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    </div>
  );
}
