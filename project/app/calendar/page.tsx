"use client";

import { useState, useCallback } from "react";
import { CalendarView } from "@/components/calendar/CalendarView";
import { CalendarFilters } from "@/components/calendar/CalendarFilters";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarNavigation } from "@/components/calendar/CalendarNavigation";
import { ActivitySlidePanel } from "@/components/calendar/dialogs/ActivitySlidePanel";
import { ActivityDetailsDialog } from "@/components/calendar/dialogs/ActivityDetailsDialog";
import { Card } from "@/components/ui/card";
import { useCalendarStore } from "@/hooks/use-calendar-store";
import { CalendarActivity, CreateActivityData } from "@/types/calendar";
import { useToast } from "@/hooks/use-toast";

export default function CalendarPage() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<CalendarActivity | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    time?: string;
  } | null>(null);
  const [filteredActivities, setFilteredActivities] = useState<CalendarActivity[] | undefined>();

  const { activities, addActivity, updateActivity, deleteActivity } = useCalendarStore();
  const { toast } = useToast();

  const handleCreateActivity = (slot: { date: Date; time?: string }) => {
    setSelectedSlot(slot);
    setIsCreateDialogOpen(true);
  };

  const handleEditActivity = (activity: CalendarActivity) => {
    setSelectedActivity(activity);
    setIsEditDialogOpen(true);
  };

  const handleViewActivity = (activity: CalendarActivity) => {
    setSelectedActivity(activity);
    setSelectedDate(new Date(activity.date));
    setIsDetailsDialogOpen(true);
  };

  const handleDeleteActivity = (activity: CalendarActivity) => {
    deleteActivity(activity.id);
    setSelectedActivity(null);
    toast({
      title: "Activity deleted",
      description: "The activity has been deleted successfully.",
    });
  };

  const handleSaveActivity = (data: CreateActivityData) => {
    addActivity(data);
    setIsCreateDialogOpen(false);
    toast({
      title: "Activity created",
      description: "The activity has been created successfully.",
    });
  };

  const handleUpdateActivity = (id: string, data: Partial<CreateActivityData>) => {
    updateActivity(id, data);
    setIsEditDialogOpen(false);
    toast({
      title: "Activity updated",
      description: "The activity has been updated successfully.",
    });
  };

  const handleFiltersChange = useCallback((filters: any) => {
    let filtered = [...activities];

    if (filters.program) {
      filtered = filtered.filter(activity => activity.title.toLowerCase().includes(filters.program.toLowerCase()));
    }

    if (filters.activityType) {
      filtered = filtered.filter(activity => activity.type === filters.activityType);
    }

    if (filters.duration) {
      filtered = filtered.filter(activity => {
        if (filters.duration === 'short') return activity.duration && activity.duration < 30;
        if (filters.duration === 'medium') return activity.duration && activity.duration >= 30 && activity.duration <= 60;
        if (filters.duration === 'long') return activity.duration && activity.duration > 60;
        return true;
      });
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm) ||
        activity.description?.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredActivities(filtered.length === activities.length ? undefined : filtered);
  }, [activities]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1920px] mx-auto space-y-4">
        <CalendarFilters onFiltersChange={handleFiltersChange} />
        
        <div className="grid grid-cols-[300px,1fr] gap-4">
          <div className="space-y-4">
            <Card className="shadow-sm border-primary/5">
              <CalendarNavigation 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onCreateActivity={handleCreateActivity}
                onViewActivity={handleViewActivity}
                onEditActivity={handleEditActivity}
                onDeleteActivity={handleDeleteActivity}
                selectedActivity={selectedActivity}
              />
            </Card>
          </div>
          
          <div>
            <CalendarHeader 
              view={view}
              onViewChange={setView}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
            <CalendarView 
              view={view}
              selectedDate={selectedDate}
              onSlotClick={handleCreateActivity}
              onActivityClick={handleViewActivity}
              onEditActivity={handleEditActivity}
              onDeleteActivity={handleDeleteActivity}
              filteredActivities={filteredActivities}
            />
          </div>
        </div>
      </div>

      {selectedSlot && (
        <ActivitySlidePanel
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          selectedDate={selectedSlot.date}
          selectedTime={selectedSlot.time}
          onSave={handleSaveActivity}
        />
      )}

      {selectedActivity && (
        <>
          <ActivitySlidePanel
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            selectedDate={new Date(selectedActivity.date)}
            selectedTime={selectedActivity.time}
            activity={selectedActivity}
            onSave={(data) => handleUpdateActivity(selectedActivity.id, data)}
          />
          
          <ActivityDetailsDialog
            open={isDetailsDialogOpen}
            onOpenChange={setIsDetailsDialogOpen}
            activity={selectedActivity}
            onEdit={() => {
              setIsDetailsDialogOpen(false);
              setIsEditDialogOpen(true);
            }}
            onDelete={() => {
              setIsDetailsDialogOpen(false);
              handleDeleteActivity(selectedActivity);
            }}
          />
        </>
      )}
    </div>
  );
}
