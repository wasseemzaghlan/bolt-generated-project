"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, MessageSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuestionNavigation() {
  const sections = [
    {
      id: "question-details",
      title: "Question Details",
      icon: FileText,
      subsections: [
        { id: "basic-info", title: "Basic Information" },
        { id: "content", title: "Question Content" },
        { id: "attachments", title: "Attachments" }
      ]
    },
    {
      id: "answer-details",
      title: "Answer Details",
      icon: MessageSquare,
      subsections: [
        { id: "answer-type", title: "Answer Type" },
        { id: "correct-answer", title: "Correct Answer" },
        { id: "options", title: "Answer Options" }
      ]
    }
  ];

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground px-2">
          Question Sections
        </h3>
        <div className="space-y-1">
          {sections.map((section) => (
            <div key={section.id} className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sm font-medium"
              >
                <section.icon className="h-4 w-4" />
                <span>{section.title}</span>
                <ChevronRight className="h-4 w-4 ml-auto" />
              </Button>
              <div className="pl-8 space-y-1">
                {section.subsections.map((subsection) => (
                  <Button
                    key={subsection.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm font-normal",
                      "hover:bg-accent/50"
                    )}
                  >
                    {subsection.title}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
