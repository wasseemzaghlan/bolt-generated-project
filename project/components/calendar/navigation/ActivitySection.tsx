"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CalendarActivity } from "@/types/calendar";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect, useRef } from "react";
import { ActivityListItem } from "./ActivityListItem";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getActivityColors } from "../utils/activity-colors";

interface ActivitySectionProps {
  title: string;
  icon: React.ElementType;
  activities: CalendarActivity[];
  onSelect: (date: Date) => void;
  onView: (activity: CalendarActivity) => void;
  onEdit: (activity: CalendarActivity) => void;
  onDelete: (activity: CalendarActivity) => void;
  selectedActivity: CalendarActivity | null;
}

export function ActivitySection({ 
  title, 
  icon: Icon, 
  activities,
  onSelect,
  onView,
  onEdit,
  onDelete,
  selectedActivity,
}: ActivitySectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const firstActivityColor = activities[0] ? getActivityColors(activities[0].type) : null;
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to selected activity
  useEffect(() => {
    if (selectedActivity && listRef.current) {
      const activityElement = document.getElementById(`activity-${selectedActivity.id}`);
      if (activityElement) {
        activityElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedActivity]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div
          role="button"
          tabIndex={0}
          className="w-full cursor-pointer"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "flex items-center justify-between p-2 rounded-lg transition-colors",
              "hover:bg-accent/50",
              firstActivityColor?.gradient
            )}
          >
            <div className="flex items-center gap-1.5">
              <Icon className={cn("h-3.5 w-3.5", firstActivityColor?.icon || "text-primary")} />
              <span className={cn("text-xs font-medium", firstActivityColor?.text)}>{title}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge 
                variant="secondary" 
                className={cn(
                  "h-5 px-1.5 text-[10px] font-normal",
                  firstActivityColor?.badge || "bg-primary/5 text-primary"
                )}
              >
                {activities.length}
              </Badge>
              <ChevronDown className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform",
                isOpen && "rotate-180"
              )} />
            </div>
          </motion.div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <AnimatePresence mode="wait">
          <ScrollArea className="h-[200px] pr-2" ref={listRef}>
            <div className="space-y-1 mt-1.5">
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  id={`activity-${activity.id}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ActivityListItem
                    activity={activity}
                    onSelect={onSelect}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isSelected={selectedActivity?.id === activity.id}
                  />
                </motion.div>
              ))}
              {activities.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground text-center py-3"
                >
                  No activities scheduled
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
}
