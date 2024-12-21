"use client";

import { motion } from "framer-motion";
import { CalendarActivity } from "@/types/calendar";
import { ActivityCard } from "../ActivityCard";
import { CellActivityButton } from "../CellActivityButton";
import { cn } from "@/lib/utils";
import { getActivityColors } from "../utils/activity-colors";

interface CalendarCellProps {
  date: Date;
  activities: CalendarActivity[];
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
  onSlotClick: (date: Date) => void;
  onActivityClick: (activity: CalendarActivity) => void;
  onEditActivity: (activity: CalendarActivity) => void;
  onDeleteActivity: (activity: CalendarActivity) => void;
}

export function CalendarCell({
  date,
  activities,
  isToday,
  isSelected,
  isCurrentMonth,
  onSlotClick,
  onActivityClick,
  onEditActivity,
  onDeleteActivity
}: CalendarCellProps) {
  // Get color scheme from the first activity of the day, if any
  const colors = activities[0] ? getActivityColors(activities[0].type) : null;

  const handleCellClick = (e: React.MouseEvent) => {
    // Only trigger slot click if clicking directly on the cell, not on activities
    if (e.currentTarget === e.target) {
      onSlotClick(date);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "min-h-[140px] rounded-xl overflow-hidden relative group",
        "transition-all duration-200 ease-in-out",
        "border border-border/50 backdrop-blur-sm",
        !isCurrentMonth && 'bg-gradient-to-br from-muted/30 to-muted/20',
        isCurrentMonth && (colors?.cellBg || 'bg-gradient-to-br from-background/60 to-background/40'),
        isToday && "ring-2 ring-primary/50 ring-offset-2",
        isSelected && "bg-gradient-to-br from-accent/50 to-accent/30"
      )}
      onClick={handleCellClick}
    >
      {/* Date header */}
      <div className={cn(
        "h-7 px-2 flex items-center justify-between",
        "bg-gradient-to-r from-background/90 via-background/80 to-background/70 backdrop-blur-sm border-b border-border/50",
        isToday && (colors?.headerBg || 'bg-gradient-to-r from-primary/20 to-primary/10')
      )}>
        <span className={cn(
          "text-xs font-medium",
          isToday && (colors?.text || 'text-primary font-bold'),
          !isCurrentMonth && "text-muted-foreground"
        )}>
          {date.getDate()}
        </span>
      </div>

      {/* Add activity button */}
      <CellActivityButton onClick={(e) => {
        e.stopPropagation();
        onSlotClick(date);
      }} />

      {/* Activities */}
      <div className="p-1.5 space-y-1 max-h-[calc(140px-2rem)] overflow-y-auto">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onEdit={(e) => {
              e.stopPropagation();
              onEditActivity(activity);
            }}
            onDelete={(e) => {
              e.stopPropagation();
              onDeleteActivity(activity);
            }}
            onClick={(activity) => {
              onActivityClick(activity);
            }}
            className="text-xs"
            compact
          />
        ))}
      </div>
    </motion.div>
  );
}
