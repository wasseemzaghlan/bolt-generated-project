"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CalendarActivity } from "@/types/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, Calendar, Timer, Edit2, Trash2, GraduationCap, Building2, BookOpen, PlayCircle } from "lucide-react";
import { getActivityColors } from "../utils/activity-colors";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityDetailsDialogProps {
  activity: CalendarActivity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ActivityDetailsDialog({
  activity,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: ActivityDetailsDialogProps) {
  const router = useRouter();
  const colors = getActivityColors(activity.type);

  const handleStartExam = () => {
    if (activity.examInfo) {
      router.push("/exam/introduction");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base font-normal">{activity.title}</SheetTitle>
            <Badge variant="secondary" className={colors.badge}>
              {colors.title}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(activity.date), 'PPP')}</span>
            </div>
            {activity.time && (
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                <span>{format(new Date(`1970-01-01T${activity.time}`), 'h:mm a')}</span>
              </div>
            )}
          </div>
        </SheetHeader>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 space-y-6"
        >
          {activity.description && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium">Description</h4>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
            </div>
          )}

          <div className="space-y-1">
            <h4 className="text-xs font-medium">Duration</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Timer className="h-3.5 w-3.5" />
              <span>{activity.duration} minutes</span>
            </div>
          </div>

          {activity.type === 'exam' && activity.examInfo && (
            <Card className="p-4 space-y-4 bg-muted/50">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium">Exam Details</h4>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleStartExam}
                  className={cn(
                    "h-7 text-xs gap-1.5",
                    "bg-gradient-to-br from-primary to-primary/90"
                  )}
                >
                  <PlayCircle className="h-3.5 w-3.5" />
                  Start Exam
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <GraduationCap className="h-3.5 w-3.5" />
                      <span>Program</span>
                    </div>
                    <p className="text-xs">{activity.examInfo.program}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>Provider</span>
                    </div>
                    <p className="text-xs">{activity.examInfo.provider}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Subject</span>
                    </div>
                    <p className="text-xs">{activity.examInfo.subject}</p>
                  </div>

                  {activity.examInfo.chapter && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Chapter</span>
                      </div>
                      <p className="text-xs">{activity.examInfo.chapter}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          <div className="flex items-center gap-2 mt-8">
            <Button 
              variant="outline" 
              onClick={onEdit} 
              className="flex-1 h-8 text-xs"
            >
              <Edit2 className="h-3.5 w-3.5 mr-1.5" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              onClick={onDelete} 
              className="flex-1 h-8 text-xs text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Delete
            </Button>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
