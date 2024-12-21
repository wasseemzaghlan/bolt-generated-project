"use client";

import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ExamBasicFields } from "../fields/ExamBasicFields";
import { ExamCategoryFields } from "../fields/ExamCategoryFields";

interface ExamDetailsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  formData: any;
  onFormDataChange: (data: any) => void;
}

export function ExamDetailsSection({
  isOpen,
  onToggle,
  formData,
  onFormDataChange,
}: ExamDetailsSectionProps) {
  const handleChange = (field: string, value: any) => {
    onFormDataChange({ ...formData, [field]: value });
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
              <h3 className="font-medium">Exam Details</h3>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-6 border-t space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <ExamBasicFields
                title={formData?.title || ""}
                reference={formData?.reference || ""}
                year={formData?.year || new Date().getFullYear()}
                duration={formData?.duration || 60}
                onChange={handleChange}
              />

              <ExamCategoryFields
                program={formData?.program || ""}
                subject={formData?.subject || ""}
                provider={formData?.provider || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
