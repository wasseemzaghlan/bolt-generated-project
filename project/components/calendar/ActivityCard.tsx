"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarActivity } from "@/types/calendar";
import { Clock, MoreVertical, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDisplayTime } from "@/lib/calendar-utils";
import { getActivityColors } from "./utils/activity-colors";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ActivityCardProps {
  activity: CalendarActivity;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onClick: (activity: CalendarActivity) => void;
  className?: string;
  compact?: boolean;
}

export function ActivityCard({ 
  activity, 
  onEdit, 
  onDelete,
  onClick,
  className, 
  compact = false 
}: ActivityCardProps) {
  const router = useRouter();
  const colors = getActivityColors(activity.type);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(activity);
  };

  const handleStartExam = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/exam/introduction");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("group relative", className)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div 
        role="button"
        tabIndex={0}
        className={cn(
          "rounded-md p-1.5",
          "border border-border/50",
          "transition-all duration-200",
          "hover:shadow-lg hover:scale-[1.02]",
          colors.gradient,
          colors.hoverGradient
        )}
      >
        <div className="flex items-center gap-1.5">
          {activity.time && (
            <div className={cn("flex items-center gap-1 text-[0.6rem]", colors.text)}>
              <Clock className="h-2 w-2" />
              <span>{formatDisplayTime(activity.time)}</span>
            </div>
          )}
          <span className={cn("flex-1 truncate text-[0.7rem] font-normal", colors.text)}>
            {activity.title}
          </span>
          {!compact && (
            <Badge variant="secondary" className={cn("text-[0.6rem] px-1 h-3.5", colors.badge)}>
              {colors.title}
            </Badge>
          )}
          {activity.type === 'exam' && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity",
                colors.text
              )}
              onClick={handleStartExam}
            >
              <PlayCircle className="h-3 w-3" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity",
                  colors.text
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem onClick={onEdit}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={onDelete}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
