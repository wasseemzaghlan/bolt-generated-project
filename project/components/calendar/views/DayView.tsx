"use client";

import { motion } from "framer-motion";
import { format, isSameHour, parseISO, isSameDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CalendarActivity } from "@/types/calendar";
import { CellActivityButton } from "../CellActivityButton";
import { ActivityCard } from "../ActivityCard";

interface DayViewProps {
  selectedDate: Date;
  onSlotClick: (date: Date, time: string) => void;
  activities: CalendarActivity[];
  onEditActivity: (activity: CalendarActivity) => void;
  onActivityClick: (activity: CalendarActivity) => void;
  onDeleteActivity: (activity: CalendarActivity) => void;
}

export function DayView({ 
  selectedDate, 
  onSlotClick, 
  activities, 
  onEditActivity,
  onActivityClick,
  onDeleteActivity
}: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getDayActivities = (date: Date, hour: number) => {
    return activities.filter(activity => {
      const activityDate = new Date(activity.date);
      return isSameDay(activityDate, date) && 
             (!activity.time || parseInt(activity.time.split(':')[0]) === hour);
    });
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-[auto,1fr] gap-4">
        {hours.map((hour, index) => {
          const hourDate = new Date(selectedDate);
          hourDate.setHours(hour);
          
          const hourActivities = getDayActivities(selectedDate, hour);
          const isCurrentHour = isSameHour(new Date(), hourDate);

          return (
            <motion.div
              key={hour}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className="contents"
            >
              <div className="text-sm text-muted-foreground py-4 text-right">
                {format(new Date().setHours(hour), 'ha')}
              </div>
              <div
                className={cn(
                  "border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors p-2 min-h-[100px]",
                  "hover:shadow-md relative group",
                  isCurrentHour && "bg-primary/5"
                )}
                onClick={() => onSlotClick(selectedDate, `${hour}:00`)}
              >
                <CellActivityButton 
                  onClick={() => onSlotClick(selectedDate, `${hour}:00`)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                {hourActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onEdit={(e) => {
                      e.stopPropagation();
                      onEditActivity(activity);
                    }}
                    onDelete={(e) => {
                      e.stopPropagation();
                      onDeleteActivity(activity);
                    }}
                    onClick={onActivityClick}
                    className="mb-2"
                    compact
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
