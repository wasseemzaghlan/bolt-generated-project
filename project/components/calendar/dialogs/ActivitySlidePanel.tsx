"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateActivityData, CalendarActivity } from "@/types/calendar";
import { useToast } from "@/hooks/use-toast";
import { format, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { activityTypeConfig } from "../utils/activity-colors";
import { ExamFields } from "../form/ExamFields";

interface ActivitySlidePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  selectedTime?: string;
  onSave: (data: CreateActivityData) => void;
  activity?: CalendarActivity | null;
}

const initialFormData: Partial<CreateActivityData> = {
  title: "",
  type: "study",
  description: "",
  duration: 60,
};

export function ActivitySlidePanel({
  open,
  onOpenChange,
  selectedDate,
  selectedTime,
  onSave,
  activity,
}: ActivitySlidePanelProps) {
  const [formData, setFormData] = useState<Partial<CreateActivityData>>(initialFormData);
  const [date, setDate] = useState<Date>(selectedDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { toast } = useToast();

  // Update date when selectedDate changes
  useEffect(() => {
    if (selectedDate && isValid(selectedDate)) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
      setIsCalendarOpen(false);
    } else {
      if (activity) {
        setFormData({
          title: activity.title,
          type: activity.type,
          description: activity.description,
          duration: activity.duration,
          examInfo: activity.examInfo,
        });
        setDate(new Date(activity.date));
      } else {
        setDate(selectedDate);
      }
    }
  }, [open, activity, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.title || !formData.type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!isValid(date)) {
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
        date,
        time: selectedTime,
        title: formData.title!,
        type: formData.type as 'study' | 'exam' | 'practice' | 'other',
      });

      toast({
        title: activity ? "Activity Updated" : "Activity Created",
        description: `Your activity has been ${activity ? 'updated' : 'added'} successfully.`,
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[540px] p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-xl font-medium">
            {activity ? "Edit Activity" : "Create New Activity"}
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="space-y-2">
              <Label className="text-sm font-normal text-muted-foreground">Date</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      if (newDate) {
                        setDate(newDate);
                        setIsCalendarOpen(false);
                      }
                    }}
                    defaultMonth={date}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {selectedTime && (
              <div className="space-y-2">
                <Label className="text-sm font-normal text-muted-foreground">Time</Label>
                <Input
                  value={format(new Date(`1970-01-01T${selectedTime}`), 'h:mm a')}
                  disabled
                  className="bg-muted font-light"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-normal text-muted-foreground">Activity Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter activity title"
                required
                className="border-muted-foreground/20 font-light"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-normal text-muted-foreground">Activity Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}
              >
                <SelectTrigger className="border-muted-foreground/20 font-light">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(activityTypeConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.type === 'exam' && (
              <div className="space-y-2">
                <Label className="text-sm font-normal text-muted-foreground">Exam Details</Label>
                <ExamFields
                  examInfo={formData.examInfo}
                  onExamSelect={(examInfo) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      examInfo,
                      title: examInfo?.title || prev.title 
                    }))
                  }
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-normal text-muted-foreground">Duration (minutes)</Label>
              <Input
                type="number"
                min="15"
                step="15"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="border-muted-foreground/20 font-light"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-normal text-muted-foreground">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter activity description"
                className="min-h-[150px] border-muted-foreground/20 font-light resize-none"
              />
            </div>
          </form>
        </ScrollArea>

        <div className="p-6 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="font-normal"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="font-normal"
            >
              {activity ? "Update" : "Create"} Activity
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
