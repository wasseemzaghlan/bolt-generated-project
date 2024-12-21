"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalendarActivity } from "@/types/calendar";

interface TodayActivitiesProps {
  activities: CalendarActivity[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  isOpen: boolean;
}

export function TodayActivities({ activities, isOpen }: TodayActivitiesProps) {
  return (
    <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-accent/50 rounded-lg px-2">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <h4 className="font-medium">Today's Activities</h4>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-primary/5 text-primary">
          {activities.length}
        </Badge>
        <ChevronDown className={cn(
          "h-4 w-4 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </div>
    </div>
  );
}
