"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, MessageSquare, ListChecks, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationSection {
  id: string;
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  onClick: () => void;
  subsections?: Array<{
    id: string;
    title: string;
    isOpen: boolean;
    onClick: () => void;
  }>;
}

interface QuestionNavigatorProps {
  sections: NavigationSection[];
  className?: string;
}

export function QuestionNavigator({ sections, className }: QuestionNavigatorProps) {
  return (
    <div className={cn(
      "w-64 border-r bg-card/50 backdrop-blur-sm",
      "sticky top-0 h-[calc(100vh-4rem)]",
      className
    )}>
      <div className="p-4 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
          Question Sections
        </h3>
      </div>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-1"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={section.onClick}
                  className={cn(
                    "w-full justify-start gap-2 font-medium",
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

                {section.subsections && section.isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 space-y-1"
                  >
                    {section.subsections.map((subsection) => (
                      <Button
                        key={subsection.id}
                        variant="ghost"
                        size="sm"
                        onClick={subsection.onClick}
                        className={cn(
                          "w-full justify-start text-sm",
                          subsection.isOpen && "bg-accent/50 text-accent-foreground"
                        )}
                      >
                        <ListChecks className="h-3 w-3 mr-2" />
                        {subsection.title}
                      </Button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
