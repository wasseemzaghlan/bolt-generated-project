"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CalendarPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Upcoming Exams</p>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Advanced Transfiguration</p>
                <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
              </div>
              <Check className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Magical Theory</p>
                <p className="text-xs text-muted-foreground">Friday, 2:00 PM</p>
              </div>
              <Check className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
