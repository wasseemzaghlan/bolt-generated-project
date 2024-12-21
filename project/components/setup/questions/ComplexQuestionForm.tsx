"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "./editor/RichTextEditor";
import { SubQuestionEditor } from "./form/SubQuestionEditor";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronRight, FileText, MessageSquare } from "lucide-react";
import { SubQuestion } from "@/types/exam";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ComplexQuestionFormProps {
  onSave: (data: any) => void;
  isQuestionOpen: boolean;
  isAnswerOpen: boolean;
  onQuestionToggle: () => void;
  onAnswerToggle: () => void;
  openSubQuestions: string[];
  onSubQuestionToggle: (id: string) => void;
}

export function ComplexQuestionForm({
  onSave,
  isQuestionOpen,
  isAnswerOpen,
  onQuestionToggle,
  onAnswerToggle,
  openSubQuestions,
  onSubQuestionToggle,
}: ComplexQuestionFormProps) {
  const [formData, setFormData] = useState({
    text: "",
    richText: "",
    points: "10",
    subQuestions: [] as SubQuestion[],
  });

  useEffect(() => {
    onSave(formData);
  }, [formData, onSave]);

  const handleAddSubQuestion = () => {
    const newSubQuestion: SubQuestion = {
      id: `sub_${Date.now()}`,
      text: "",
      richText: "",
      type: "multiple-choice",
      points: 10,
      options: ["", "", "", ""],
    };
    setFormData(prev => ({
      ...prev,
      subQuestions: [...prev.subQuestions, newSubQuestion]
    }));
  };

  const handleUpdateSubQuestion = (index: number, updated: SubQuestion) => {
    const updatedSubQuestions = [...formData.subQuestions];
    updatedSubQuestions[index] = updated;
    setFormData(prev => ({
      ...prev,
      subQuestions: updatedSubQuestions
    }));
  };

  const handleRemoveSubQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subQuestions: prev.subQuestions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <Collapsible open={isQuestionOpen} onOpenChange={onQuestionToggle}>
        <Card className="shadow-lg">
          <div className="p-4 hover:bg-muted/50">
            <CollapsibleTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
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
                <FileText className="h-4 w-4" />
                <h3 className="font-medium">Question Details</h3>
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="p-6 border-t">
              <div className="grid grid-cols-[1fr,200px] gap-6">
                <div className="space-y-4">
                  <Label>Question Text</Label>
                  <RichTextEditor
                    value={formData.richText}
                    onChange={(value) => setFormData(prev => ({ ...prev, richText: value, text: value }))}
                    placeholder="Enter your question here..."
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Points</Label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.points}
                      onChange={(e) => setFormData(prev => ({ ...prev, points: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={isAnswerOpen} onOpenChange={onAnswerToggle}>
        <Card className="shadow-lg">
          <div className="p-4 hover:bg-muted/50">
            <div className="flex items-center justify-between">
              <CollapsibleTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
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
                  <MessageSquare className="h-4 w-4" />
                  <h3 className="font-medium">Sub-Questions</h3>
                </div>
              </CollapsibleTrigger>
              <Button
                type="button"
                onClick={handleAddSubQuestion}
                className="text-sm"
              >
                <Plus className="h-3.5 w-3.5 mr-2" />
                Add Sub-Question
              </Button>
            </div>
          </div>
          <CollapsibleContent>
            <div className="p-6 border-t space-y-6">
              {formData.subQuestions.map((subQuestion, index) => (
                <SubQuestionEditor
                  key={subQuestion.id}
                  index={index}
                  subQuestion={subQuestion}
                  onUpdate={(updated) => handleUpdateSubQuestion(index, updated)}
                  onRemove={() => handleRemoveSubQuestion(index)}
                  isFirst={index === 0}
                  isLast={index === formData.subQuestions.length - 1}
                  isOpen={openSubQuestions.includes(subQuestion.id)}
                  onToggle={() => onSubQuestionToggle(subQuestion.id)}
                />
              ))}

              {formData.subQuestions.length === 0 && (
                <Card className="p-6 border-2 border-dashed border-primary/20 bg-muted/50">
                  <div className="text-center text-muted-foreground">
                    <p>No sub-questions added yet.</p>
                    <p className="text-sm">Click the "Add Sub-Question" button to get started.</p>
                  </div>
                </Card>
              )}
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
