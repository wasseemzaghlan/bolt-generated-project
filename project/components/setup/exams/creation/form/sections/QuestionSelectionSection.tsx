"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { QuestionSelectionGrid } from "./QuestionSelectionGrid";

interface QuestionSelectionSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  formData: any;
  onFormDataChange: (data: any) => void;
}

export function QuestionSelectionSection({
  isOpen,
  onToggle,
  formData,
  onFormDataChange,
}: QuestionSelectionSectionProps) {
  const handleQuestionsChange = (selectedQuestions: string[]) => {
    onFormDataChange({ ...formData, questions: selectedQuestions });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <Card className="shadow-lg">
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-6 hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                isOpen ? "bg-primary/10" : "bg-muted"
              )}>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              <h3 className="font-medium">Question Selection</h3>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-6 border-t">
            <QuestionSelectionGrid
              selectedQuestions={formData?.questions || []}
              onQuestionsChange={handleQuestionsChange}
            />
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
