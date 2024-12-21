"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarActivity } from "@/types/calendar";
import { Clock, MoreVertical, ChevronDown, Calendar, Timer, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getActivityColors } from "../utils/activity-colors";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ActivityListItemProps {
  activity: CalendarActivity;
  onSelect: (date: Date) => void;
  onView: (activity: CalendarActivity) => void;
  onEdit: (activity: CalendarActivity) => void;
  onDelete: (activity: CalendarActivity) => void;
  isSelected: boolean;
}

export function ActivityListItem({ 
  activity, 
  onSelect,
  onView,
  onEdit,
  onDelete,
  isSelected,
}: ActivityListItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const colors = getActivityColors(activity.type);

  const handleClick = () => {
    onSelect(new Date(activity.date));
    onView(activity);
    setIsOpen(true);
  };

  const handleStartExam = () => {
    router.push("/exam/introduction");
  };

  return (
    <div
      className={cn(
        "w-full rounded-lg transition-all duration-200",
        "hover:shadow-lg",
        colors.gradient,
        colors.hoverGradient,
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
    >
      <div className="flex items-center justify-between p-2.5">
        <div 
          role="button"
          tabIndex={0}
          className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <div className={cn("w-0.5 h-7 rounded-full self-stretch", colors.border)} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className={cn("text-xs font-normal truncate", colors.text)}>
                {activity.title}
              </p>
            </div>
            <div className={cn("flex items-center gap-2 text-[0.65rem]", colors.text)}>
              <div className="flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                <span>{format(new Date(activity.date), "h:mm a")}</span>
              </div>
              <Badge variant="secondary" className={cn("text-[0.6rem] px-1 h-3.5", colors.badge)}>
                {colors.title}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          {activity.type === 'exam' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleStartExam}
              className={cn("h-6 w-6", colors.text)}
            >
              <PlayCircle className="h-3.5 w-3.5" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-6 w-6", colors.text)}
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem onClick={() => onEdit(activity)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => onDelete(activity)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div
            role="button"
            tabIndex={0}
            className="p-1 hover:bg-accent/20 rounded-sm cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(!isOpen);
              }
            }}
          >
            <ChevronDown 
              className={cn(
                "h-3.5 w-3.5 transition-transform", 
                colors.text,
                isOpen && "rotate-180"
              )} 
            />
          </div>
        </div>
      </div>

      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "px-4 pb-3 space-y-2.5",
              colors.gradient
            )}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="h-3.5 w-3.5" />
                <span className={colors.text}>
                  {format(new Date(activity.date), "PPPP")}
                </span>
              </div>
              
              {activity.time && (
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="h-3.5 w-3.5" />
                  <span className={colors.text}>
                    Starts at {format(new Date(`1970-01-01T${activity.time}`), "h:mm a")}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-xs">
                <Timer className="h-3.5 w-3.5" />
                <span className={colors.text}>
                  Duration: {activity.duration} minutes
                </span>
              </div>
            </div>

            {activity.description && (
              <div className="pt-2 border-t border-border/10">
                <p className={cn("text-xs whitespace-pre-wrap", colors.text)}>
                  {activity.description}
                </p>
              </div>
            )}

            {activity.type === 'exam' && (
              <div className="pt-2 border-t border-border/10">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleStartExam}
                  className="w-full h-7 text-xs bg-primary/10 hover:bg-primary/20 text-primary"
                >
                  <PlayCircle className="h-3.5 w-3.5 mr-1.5" />
                  Start Exam
                </Button>
              </div>
            )}
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
