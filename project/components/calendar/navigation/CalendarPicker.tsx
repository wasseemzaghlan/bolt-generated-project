"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon } from "lucide-react";

interface CalendarPickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date | undefined) => void;
  onAddActivity: () => void;
}

export function CalendarPicker({ selectedDate, onDateSelect, onAddActivity }: CalendarPickerProps) {
  return (
    <div className="p-4 border-b border-primary/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <CalendarIcon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">Calendar</h3>
        </div>
        <Button 
          size="sm" 
          className="bg-primary/10 hover:bg-primary/20 text-primary"
          onClick={onAddActivity}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Activity
        </Button>
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="rounded-md border shadow-sm"
      />
    </div>
  );
}
