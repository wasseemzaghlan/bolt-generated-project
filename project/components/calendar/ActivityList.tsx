"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CalendarActivity } from "@/types/calendar";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface ActivityListProps {
  activities: CalendarActivity[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  title: string;
  icon: React.ElementType;
}

export function ActivityList({ activities, selectedDate, onDateSelect, title, icon: Icon }: ActivityListProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div 
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className="w-full cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            <span className="font-medium">{title}</span>
          </div>
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )} />
        </motion.div>
      </div>

      <CollapsibleContent>
        <AnimatePresence mode="wait">
          <div className="space-y-2 mt-2">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ActivityCard
                  activity={activity}
                  selectedDate={selectedDate}
                  onDateSelect={onDateSelect}
                />
              </motion.div>
            ))}
            {activities.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground text-center py-4"
              >
                No activities scheduled
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ActivityCard({ activity, selectedDate, onDateSelect }: {
  activity: CalendarActivity;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div 
        role="button"
        tabIndex={0}
        onClick={() => {
          onDateSelect(new Date(activity.date));
          setIsExpanded(!isExpanded);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onDateSelect(new Date(activity.date));
            setIsExpanded(!isExpanded);
          }
        }}
        className={cn(
          "w-full text-left p-3 rounded-lg",
          "hover:bg-accent/50 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary/20"
        )}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="w-1 h-8 rounded-full bg-primary/20" />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{activity.title}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{format(new Date(activity.date), "h:mm a")}</span>
            </div>
          </div>
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isExpanded && "rotate-180"
          )} />
        </div>
      </div>

      <CollapsibleContent>
        <div className="px-4 py-2 ml-8 border-l-2 border-primary/10">
          {activity.description && (
            <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Duration: {activity.duration} minutes</span>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
