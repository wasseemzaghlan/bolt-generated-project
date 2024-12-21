"use client";

import { MonthView } from "./views/MonthView";
import { WeekView } from "./views/WeekView";
import { DayView } from "./views/DayView";
import { useCalendarStore } from "@/hooks/use-calendar-store";
import { CalendarActivity } from "@/types/calendar";
import { Card } from "@/components/ui/card";

interface CalendarViewProps {
  view: 'day' | 'week' | 'month';
  selectedDate: Date;
  onSlotClick: (date: Date, time?: string) => void;
  onEditActivity: (activity: CalendarActivity) => void;
  onActivityClick: (activity: CalendarActivity) => void;
  onDeleteActivity: (activity: CalendarActivity) => void;
  filteredActivities?: CalendarActivity[];
}

export function CalendarView({ 
  view, 
  selectedDate, 
  onSlotClick,
  onEditActivity,
  onActivityClick,
  onDeleteActivity,
  filteredActivities
}: CalendarViewProps) {
  const { activities } = useCalendarStore();
  const displayActivities = filteredActivities || activities;

  return (
    <Card className="p-6 shadow-sm border-primary/5">
      {view === 'month' && (
        <MonthView 
          selectedDate={selectedDate}
          onSlotClick={onSlotClick}
          activities={displayActivities}
          onEditActivity={onEditActivity}
          onActivityClick={onActivityClick}
          onDeleteActivity={onDeleteActivity}
        />
      )}
      {view === 'week' && (
        <WeekView 
          selectedDate={selectedDate}
          onSlotClick={onSlotClick}
          activities={displayActivities}
          onEditActivity={onEditActivity}
          onActivityClick={onActivityClick}
          onDeleteActivity={onDeleteActivity}
        />
      )}
      {view === 'day' && (
        <DayView 
          selectedDate={selectedDate}
          onSlotClick={onSlotClick}
          activities={displayActivities}
          onEditActivity={onEditActivity}
          onActivityClick={onActivityClick}
          onDeleteActivity={onDeleteActivity}
        />
      )}
    </Card>
  );
}
