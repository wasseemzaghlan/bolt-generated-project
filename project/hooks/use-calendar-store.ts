"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalendarActivity, CreateActivityData } from '@/types/calendar';
import { format } from 'date-fns';

interface CalendarStore {
  activities: CalendarActivity[];
  addActivity: (data: CreateActivityData) => CalendarActivity;
  updateActivity: (id: string, data: Partial<CreateActivityData>) => void;
  deleteActivity: (id: string) => void;
  getActivitiesForDate: (date: Date) => CalendarActivity[];
}

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set, get) => ({
      activities: [],
      addActivity: (data) => {
        const newActivity = {
          id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: data.title,
          description: data.description,
          date: data.date.toISOString(),
          time: data.time,
          type: data.type,
          duration: data.duration,
        };

        set((state) => ({
          activities: [...state.activities, newActivity],
        }));

        return newActivity;
      },
      updateActivity: (id, data) =>
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id
              ? {
                  ...activity,
                  ...data,
                  date: data.date ? data.date.toISOString() : activity.date,
                }
              : activity
          ),
        })),
      deleteActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id),
        })),
      getActivitiesForDate: (date) => {
        const { activities } = get();
        return activities.filter(
          (activity) => format(new Date(activity.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        );
      },
    }),
    {
      name: 'calendar-storage',
    }
  )
);
