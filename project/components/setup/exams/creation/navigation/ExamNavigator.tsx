"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationSection {
  id: string;
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  onClick: () => void;
}

interface ExamNavigatorProps {
  sections: NavigationSection[];
}

export function ExamNavigator({ sections }: ExamNavigatorProps) {
  return (
    <div className="w-64 border-r bg-card/50 backdrop-blur-sm">
      <div className="p-4 border-b">
        <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
          Exam Sections
        </h3>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-2">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={section.onClick}
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  section.isOpen && "bg-accent text-accent-foreground"
                )}
              >
                <section.icon className="h-4 w-4" />
                <span>{section.title}</span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 ml-auto transition-transform",
                    section.isOpen && "rotate-90"
                  )}
                />
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
