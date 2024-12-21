"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarActivity, CreateActivityData } from "@/types/calendar";
import { useToast } from "@/hooks/use-toast";
import { 
  formatDisplayDate, 
  formatDisplayTime, 
  validateTimeString,
  createSafeDate 
} from "@/lib/calendar-utils";

interface EditActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: CalendarActivity | null;
  onSave: (id: string, data: Partial<CreateActivityData>) => void;
}

export function EditActivityDialog({
  open,
  onOpenChange,
  activity,
  onSave,
}: EditActivityDialogProps) {
  const [formData, setFormData] = useState<Partial<CreateActivityData>>({});
  const { toast } = useToast();
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [safeDate, setSafeDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!activity) return;
    
    const newSafeDate = createSafeDate(activity.date);
    setSafeDate(newSafeDate);

    if (activity.time && validateTimeString(activity.time)) {
      setFormattedTime(formatDisplayTime(activity.time) || '');
    } else {
      setFormattedTime('');
    }

    setFormData({
      title: activity.title,
      type: activity.type,
      description: activity.description,
      duration: activity.duration,
    });
  }, [activity]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!activity?.id || !formData.title || !formData.type || !safeDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      onSave(activity.id, {
        ...formData,
        date: safeDate,
        time: activity.time,
        type: formData.type as 'study' | 'exam' | 'practice' | 'other',
      });

      toast({
        title: "Activity Updated",
        description: "Your activity has been updated successfully.",
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update activity. Please try again.",
        variant: "destructive",
      });
    }
  }, [formData, activity, safeDate, onSave, onOpenChange, toast]);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setFormData({});
      setFormattedTime("");
      setSafeDate(null);
    }
    onOpenChange(open);
  }, [onOpenChange]);

  if (!activity || !safeDate) return null;

  const displayDate = formatDisplayDate(safeDate);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              value={displayDate}
              disabled
            />
          </div>

          {formattedTime && (
            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                value={formattedTime}
                disabled
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Activity Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter activity title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Activity Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="study">Study Session</SelectItem>
                <SelectItem value="exam">Exam</SelectItem>
                <SelectItem value="practice">Practice</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              min="15"
              step="15"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter activity description"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Activity</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
