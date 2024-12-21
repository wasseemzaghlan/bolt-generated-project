"use client";

import { format, isSameDay, parseISO, isValid } from 'date-fns';
import { CalendarActivity } from '@/types/calendar';

export function formatDisplayDate(date: Date | null): string {
  if (!date || !isValid(date)) {
    return '';
  }
  try {
    return format(date, 'PPP');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

export function formatDisplayTime(time: string | undefined): string {
  if (!time) return '';
  
  try {
    const [hours, minutes] = time.split(':').map(Number);
    if (!validateTimeString(time)) {
      return '';
    }
    
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
}

export function getActivitiesForDay(activities: CalendarActivity[], date: Date): CalendarActivity[] {
  if (!date || !isValid(date)) return [];
  
  return activities.filter(activity => {
    try {
      const activityDate = new Date(activity.date);
      return isValid(activityDate) && isSameDay(activityDate, date);
    } catch {
      return false;
    }
  });
}

export function getActivitiesForHour(activities: CalendarActivity[], date: Date, hour: number): CalendarActivity[] {
  if (!date || !isValid(date)) return [];
  
  return activities.filter(activity => {
    try {
      const activityDate = new Date(activity.date);
      if (!isValid(activityDate)) return false;
      
      const sameDay = isSameDay(activityDate, date);
      if (!activity.time) return sameDay;
      
      const activityHour = parseInt(activity.time.split(':')[0]);
      return sameDay && activityHour === hour;
    } catch {
      return false;
    }
  });
}

export function validateTimeString(time: string | undefined): boolean {
  if (!time) return false;
  
  try {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(time)) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  } catch {
    return false;
  }
}

export function createSafeDate(date: Date | string | null): Date | null {
  if (!date) return null;
  
  try {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return isValid(parsedDate) ? parsedDate : null;
  } catch {
    return null;
  }
}
