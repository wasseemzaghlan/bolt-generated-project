"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const notifications = [
  {
    title: "New Exam Available",
    description: "Advanced Potions Mastery exam is now available",
    time: "2 hours ago",
    unread: true,
  },
  {
    title: "Exam Result",
    description: "Your Charms Theory exam has been graded",
    time: "1 day ago",
    unread: false,
  },
];

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Notifications</p>
            <Button variant="ghost" size="sm" className="text-xs">
              Mark all as read
            </Button>
          </div>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-4 p-4 hover:bg-muted/50 cursor-pointer",
                notification.unread && "bg-muted/30"
              )}
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
              {notification.unread && (
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
