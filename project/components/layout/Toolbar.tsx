"use client";

import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { NotificationsPopover } from "./toolbar/NotificationsPopover";
import { CalendarPopover } from "./toolbar/CalendarPopover";
import { UserMenu } from "./toolbar/UserMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Toolbar() {
  return (
    <div className="fixed top-0 right-0 left-0 h-16 bg-background/80 backdrop-blur-sm border-b z-40">
      <div className="h-full px-4 flex items-center justify-between max-w-full mx-auto">
        <div className="w-16">
          {/* Empty div to maintain spacing for menu button */}
        </div>
        
        <div className="text-lg font-semibold">
          GoGreen Knowledge
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </Button>
          <NotificationsPopover />
          <CalendarPopover />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
