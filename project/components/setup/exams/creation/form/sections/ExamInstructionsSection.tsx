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
import { RichTextEditor } from "@/components/setup/questions/editor/RichTextEditor";

interface ExamInstructionsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  formData: any;
  onFormDataChange: (data: any) => void;
}

export function ExamInstructionsSection({
  isOpen,
  onToggle,
  formData,
  onFormDataChange,
}: ExamInstructionsSectionProps) {
  const handleInstructionsChange = (value: string) => {
    onFormDataChange({ ...formData, instructions: value });
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
              <h3 className="font-medium">Instructions</h3>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-6 border-t">
            <div className="space-y-4">
              <Label>Exam Instructions</Label>
              <RichTextEditor
                value={formData?.instructions || ""}
                onChange={handleInstructionsChange}
                placeholder="Enter exam instructions..."
                height="300px"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
