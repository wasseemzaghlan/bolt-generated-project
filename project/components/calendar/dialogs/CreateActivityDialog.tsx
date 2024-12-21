"use client";

import { useState, useEffect } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateActivityData } from "@/types/calendar";
import { useToast } from "@/hooks/use-toast";
import { format, isValid } from "date-fns";
import { cn } from "@/lib/utils";

interface CreateActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSlot: {
    date: Date;
    time?: string;
  } | null;
  onSave: (data: CreateActivityData) => void;
}

const initialFormData: Partial<CreateActivityData> = {
  title: "",
  type: "study",
  description: "",
  duration: 60,
};

export function CreateActivityDialog({
  open,
  onOpenChange,
  selectedSlot,
  onSave,
}: CreateActivityDialogProps) {
  const [formData, setFormData] = useState<Partial<CreateActivityData>>(initialFormData);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(selectedSlot?.date);
  const { toast } = useToast();

  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
    }
    if (selectedSlot?.date) {
      setSelectedDate(selectedSlot.date);
    }
  }, [open, selectedSlot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !formData.title || !formData.type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!isValid(selectedDate)) {
      toast({
        title: "Invalid Date",
        description: "The selected date is invalid.",
        variant: "destructive",
      });
      return;
    }

    try {
      onSave({
        ...formData,
        date: selectedDate,
        time: selectedSlot?.time,
        title: formData.title!,
        type: formData.type as 'study' | 'exam' | 'practice' | 'other',
      });

      toast({
        title: "Activity Created",
        description: "Your activity has been added to the calendar.",
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {selectedSlot?.time && (
            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                value={format(new Date(`1970-01-01T${selectedSlot.time}`), 'h:mm a')}
                disabled
                className="bg-muted"
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
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Activity</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
