"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrueFalseEditorProps {
  correctAnswer?: boolean;
  onCorrectAnswerChange: (value: boolean) => void;
}

export function TrueFalseEditor({
  correctAnswer,
  onCorrectAnswerChange,
}: TrueFalseEditorProps) {
  const options = [
    { value: true, label: "True" },
    { value: false, label: "False" }
  ];

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Correct Answer</Label>
      
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = correctAnswer === option.value;
          
          return (
            <div key={option.label} className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 w-6 p-0 rounded-full",
                  isSelected 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-2 border-input hover:bg-muted"
                )}
                onClick={() => onCorrectAnswerChange(option.value)}
              >
                {isSelected ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              </Button>
              <Label className="text-base">{option.label}</Label>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-muted-foreground">
        Select the correct answer for this True/False question
      </p>
    </div>
  );
}
