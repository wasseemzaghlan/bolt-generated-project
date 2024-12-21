"use client";

import { motion } from "framer-motion";
import { format, addDays, startOfWeek, isSameHour, parseISO, isSameDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CalendarActivity } from "@/types/calendar";
import { CellActivityButton } from "../CellActivityButton";
import { ActivityCard } from "../ActivityCard";

interface WeekViewProps {
  selectedDate: Date;
  onSlotClick: (date: Date, time: string) => void;
  activities: CalendarActivity[];
  onEditActivity: (activity: CalendarActivity) => void;
  onActivityClick: (activity: CalendarActivity) => void;
  onDeleteActivity: (activity: CalendarActivity) => void;
}

export function WeekView({ 
  selectedDate, 
  onSlotClick, 
  activities, 
  onEditActivity,
  onActivityClick,
  onDeleteActivity
}: WeekViewProps) {
  const weekStart = startOfWeek(selectedDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getSlotActivities = (date: Date, hour: number) => {
    return activities.filter(activity => {
      const activityDate = new Date(activity.date);
      return isSameDay(activityDate, date) && 
             (!activity.time || parseInt(activity.time.split(':')[0]) === hour);
    });
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-[auto,repeat(7,1fr)] gap-2">
        {/* Time column */}
        <div className="w-20" />
        {/* Day headers */}
        {days.map((day, index) => (
          <motion.div
            key={day.toString()}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "text-center p-2 font-medium border-b rounded-t-lg",
              isSameDay(day, new Date()) && "bg-primary/10"
            )}
          >
            <div className="text-sm text-muted-foreground">
              {format(day, 'EEE')}
            </div>
            <div className="text-lg">{format(day, 'd')}</div>
          </motion.div>
        ))}

        {/* Time slots */}
        {hours.map((hour) => (
          <motion.div
            key={hour}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="contents"
          >
            <div className="text-sm text-muted-foreground py-2 pr-2 text-right">
              {format(new Date().setHours(hour), 'ha')}
            </div>
            {days.map((day) => {
              const slotActivities = getSlotActivities(day, hour);
              const isCurrentHour = isSameHour(new Date(), new Date(day).setHours(hour));

              return (
                <div
                  key={`${day}-${hour}`}
                  className={cn(
                    "border hover:bg-accent/50 cursor-pointer transition-colors p-1 min-h-[60px] relative group",
                    "hover:shadow-md",
                    isCurrentHour && "bg-primary/5"
                  )}
                  onClick={() => onSlotClick(day, `${hour}:00`)}
                >
                  <CellActivityButton 
                    onClick={() => onSlotClick(day, `${hour}:00`)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {slotActivities.map((activity) => (
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
                      className="mb-1"
                      compact
                    />
                  ))}
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
