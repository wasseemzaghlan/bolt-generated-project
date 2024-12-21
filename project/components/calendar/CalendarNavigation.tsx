"use client";

import { useState } from "react";
import { isSameDay, startOfDay, format } from "date-fns";
import { Card } from "@/components/ui/card";
import { useCalendarStore } from "@/hooks/use-calendar-store";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { ActivitySection } from "./navigation/ActivitySection";
import { CalendarActivity } from "@/types/calendar";

interface CalendarNavigationProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onCreateActivity: (slot: { date: Date; time?: string }) => void;
  onViewActivity: (activity: CalendarActivity) => void;
  onEditActivity: (activity: CalendarActivity) => void;
  onDeleteActivity: (activity: CalendarActivity) => void;
  selectedActivity: CalendarActivity | null;
}

export function CalendarNavigation({ 
  selectedDate, 
  onDateSelect,
  onCreateActivity,
  onViewActivity,
  onEditActivity,
  onDeleteActivity,
  selectedActivity,
}: CalendarNavigationProps) {
  const { activities } = useCalendarStore();
  const [calendarDate, setCalendarDate] = useState<Date>(selectedDate);
  
  const todayActivities = activities.filter(activity => 
    isSameDay(new Date(activity.date), new Date())
  );

  const upcomingActivities = activities.filter(activity => 
    new Date(activity.date) > startOfDay(new Date())
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleAddActivity = () => {
    onCreateActivity({ date: calendarDate });
  };

  const handleViewActivity = (activity: CalendarActivity) => {
    onDateSelect(new Date(activity.date));
  };

  return (
    <Card className="shadow-sm border-primary/5 bg-gradient-to-br from-card/90 via-card/50 to-background/90 backdrop-blur-sm">
      <div className="p-3 border-b border-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/5">
              <CalendarIcon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Calendar</h3>
              <p className="text-xs text-muted-foreground">
                {format(selectedDate, 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            className="h-7 text-xs bg-primary/5 hover:bg-primary/10 text-primary"
            onClick={handleAddActivity}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <div className="p-3 space-y-4">
        <ActivitySection
          title="Today's Activities"
          icon={Clock}
          activities={todayActivities}
          onSelect={onDateSelect}
          onView={handleViewActivity}
          onEdit={onEditActivity}
          onDelete={onDeleteActivity}
          selectedActivity={selectedActivity}
        />

        <Separator className="bg-primary/5" />

        <ActivitySection
          title="Upcoming Activities"
          icon={CalendarIcon}
          activities={upcomingActivities}
          onSelect={onDateSelect}
          onView={handleViewActivity}
          onEdit={onEditActivity}
          onDelete={onDeleteActivity}
          selectedActivity={selectedActivity}
        />
      </div>
    </Card>
  );
}
