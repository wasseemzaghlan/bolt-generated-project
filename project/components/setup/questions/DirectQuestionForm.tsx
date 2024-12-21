"use client";

import { useState } from "react";
import { DirectQuestion, QuestionType } from "@/types/exam";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { QuestionAnswer } from "./form/QuestionAnswer";
import { RichTextEditor } from "./editor/RichTextEditor";

interface DirectQuestionFormProps {
  question?: DirectQuestion;
  type: QuestionType;
  onSave: (data: Partial<DirectQuestion>) => void;
  isQuestionOpen: boolean;
  isAnswerOpen: boolean;
  onQuestionToggle: () => void;
  onAnswerToggle: () => void;
}

export function DirectQuestionForm({
  question,
  type,
  onSave,
  isQuestionOpen,
  isAnswerOpen,
  onQuestionToggle,
  onAnswerToggle,
}: DirectQuestionFormProps) {
  const [formData, setFormData] = useState({
    text: question?.text || "",
    richText: question?.richText || "",
    points: question?.points?.toString() || "10",
    correctAnswer: question?.correctAnswer?.toString() || "",
    options: question?.options || [],
    hint: question?.hint || "",
  });

  const handleFormChange = (updates: Partial<typeof formData>) => {
    const newFormData = { ...formData, ...updates };
    setFormData(newFormData);
    onSave(newFormData);
  };

  return (
    <div className="space-y-4">
      <Collapsible open={isQuestionOpen} onOpenChange={onQuestionToggle}>
        <Card className="shadow-lg">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-6 hover:bg-muted/50">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isQuestionOpen ? "bg-primary/10" : "bg-muted"
                )}>
                  {isQuestionOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
                <h3 className="font-medium">Question Details</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label>Points:</Label>
                  <Input
                    type="number"
                    value={formData.points}
                    onChange={(e) => handleFormChange({ points: e.target.value })}
                    className="w-20"
                    min="1"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-6 border-t space-y-4">
              <RichTextEditor
                value={formData.richText}
                onChange={(value) => handleFormChange({ richText: value, text: value })}
                placeholder="Enter your question here..."
                height="200px"
              />
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={isAnswerOpen} onOpenChange={onAnswerToggle}>
        <Card className="shadow-lg">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-6 hover:bg-muted/50">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isAnswerOpen ? "bg-primary/10" : "bg-muted"
                )}>
                  {isAnswerOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
                <h3 className="font-medium">Answer Details</h3>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-6 border-t">
              <QuestionAnswer
                type={type}
                options={formData.options}
                correctAnswer={type === "true-false" ? formData.correctAnswer === "true" : formData.correctAnswer}
                onOptionsChange={(options) => handleFormChange({ options })}
                onCorrectAnswerChange={(answer) => handleFormChange({ 
                  correctAnswer: answer.toString() 
                })}
              />
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
