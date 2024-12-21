"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { SubQuestion, QuestionType } from "@/types/exam";
import { RichTextEditor } from "../editor/RichTextEditor";
import { MultipleChoiceEditor } from "../form/MultipleChoiceEditor";
import { TrueFalseEditor } from "../form/TrueFalseEditor";
import { DescriptiveEditor } from "../form/DescriptiveEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SubQuestionEditorProps {
  index: number;
  subQuestion: SubQuestion;
  onUpdate: (updated: SubQuestion) => void;
  onRemove: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QUESTION_TYPES = {
  "multiple-choice": "Multiple Choice",
  "true-false": "True/False",
  "descriptive": "Descriptive",
} as const;

export function SubQuestionEditor({
  index,
  subQuestion,
  onUpdate,
  onRemove,
  isFirst,
  isLast,
}: SubQuestionEditorProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleTypeChange = (type: QuestionType) => {
    onUpdate({
      ...subQuestion,
      type,
      correctAnswer: undefined,
      options: type === "multiple-choice" ? ["", "", "", ""] : undefined,
    });
  };

  return (
    <Card className="border-2 border-primary/10">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 hover:bg-muted/50">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Sub-Question {index + 1}</span>
                <span className="text-sm text-muted-foreground">
                  ({QUESTION_TYPES[subQuestion.type]})
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 pt-0 space-y-6">
            <div className="grid grid-cols-[1fr,200px] gap-6">
              <div className="space-y-4">
                <Label>Question Text</Label>
                <RichTextEditor
                  value={subQuestion.richText}
                  onChange={(value) => onUpdate({ ...subQuestion, richText: value })}
                  placeholder="Enter your sub-question here..."
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select value={subQuestion.type} onValueChange={handleTypeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(QUESTION_TYPES).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    min="1"
                    value={subQuestion.points}
                    onChange={(e) => 
                      onUpdate({ ...subQuestion, points: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Answer</Label>
              {subQuestion.type === "multiple-choice" && (
                <MultipleChoiceEditor
                  options={subQuestion.options || []}
                  correctAnswer={subQuestion.correctAnswer as string}
                  onOptionsChange={(options) => onUpdate({ ...subQuestion, options })}
                  onCorrectAnswerChange={(answer) => 
                    onUpdate({ ...subQuestion, correctAnswer: answer })
                  }
                />
              )}
              {subQuestion.type === "true-false" && (
                <TrueFalseEditor
                  correctAnswer={subQuestion.correctAnswer as boolean}
                  onCorrectAnswerChange={(value) => 
                    onUpdate({ ...subQuestion, correctAnswer: value })
                  }
                />
              )}
              {subQuestion.type === "descriptive" && (
                <DescriptiveEditor
                  value={subQuestion.defaultAnswer || ""}
                  onChange={(value) => 
                    onUpdate({ ...subQuestion, defaultAnswer: value })
                  }
                />
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
