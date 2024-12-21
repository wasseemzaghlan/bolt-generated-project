"use client";

import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { CalendarActivity } from "@/types/calendar";
import { CalendarCell } from "./CalendarCell";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MonthViewProps {
  selectedDate: Date;
  onSlotClick: (date: Date) => void;
  activities: CalendarActivity[];
  onEditActivity: (activity: CalendarActivity) => void;
  onActivityClick: (activity: CalendarActivity) => void;
  onDeleteActivity: (activity: CalendarActivity) => void;
}

export function MonthView({ 
  selectedDate, 
  onSlotClick, 
  activities, 
  onEditActivity,
  onActivityClick,
  onDeleteActivity
}: MonthViewProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getDayActivities = (date: Date) => {
    return activities.filter(activity => 
      isSameDay(new Date(activity.date), date)
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      {/* Fixed Header */}
      <div className="grid grid-cols-7 gap-3 mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400 bg-gradient-to-br from-primary/5 to-primary/10 rounded-md backdrop-blur-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Scrollable Calendar Grid */}
      <ScrollArea className="flex-1 pr-4">
        <div className="grid grid-cols-7 gap-3">
          {days.map((date) => {
            const dayActivities = getDayActivities(date);
            return (
              <CalendarCell
                key={date.toString()}
                date={date}
                activities={dayActivities}
                isToday={isSameDay(date, new Date())}
                isSelected={isSameDay(date, selectedDate)}
                isCurrentMonth={isSameMonth(date, selectedDate)}
                onSlotClick={onSlotClick}
                onActivityClick={onActivityClick}
                onEditActivity={onEditActivity}
                onDeleteActivity={onDeleteActivity}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
