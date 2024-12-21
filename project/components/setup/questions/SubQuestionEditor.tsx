"use client";

import { useState } from "react";
import { SubQuestion, QuestionType } from "@/types/exam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "./editor/RichTextEditor";
import { MultipleChoiceEditor } from "./form/MultipleChoiceEditor";
import { TrueFalseEditor } from "./form/TrueFalseEditor";
import { ChevronDown, ChevronRight, Trash2, FileText, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
  'multiple-choice': 'Multiple Choice',
  'true-false': 'True/False',
  'descriptive': 'Descriptive'
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
  const [isQuestionOpen, setIsQuestionOpen] = useState(true);
  const [isAnswerOpen, setIsAnswerOpen] = useState(true);
  const [title, setTitle] = useState(subQuestion.text || `Q${index + 1}`);

  const handleChange = (updates: Partial<SubQuestion>) => {
    onUpdate({ ...subQuestion, ...updates });
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    handleChange({ text: value });
  };

  const handleTypeChange = (type: QuestionType) => {
    handleChange({
      type,
      correctAnswer: undefined,
      options: type === "multiple-choice" ? ["", "", "", ""] : undefined,
    });
  };

  return (
    <Card className="shadow-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between p-4 hover:bg-muted/50">
          <CollapsibleTrigger asChild>
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
              <Input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder={`Q${index + 1}`}
                className="max-w-[200px] font-medium"
                onClick={(e) => e.stopPropagation()}
              />
              <span className="text-sm text-muted-foreground">
                {QUESTION_TYPES[subQuestion.type]}
              </span>
            </div>
          </CollapsibleTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <CollapsibleContent>
          <div className="p-4 space-y-4">
            {/* Question Details Section */}
            <Collapsible open={isQuestionOpen} onOpenChange={setIsQuestionOpen}>
              <Card className="shadow-sm">
                <div className="flex items-center justify-between p-4 hover:bg-muted/50">
                  <CollapsibleTrigger asChild>
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
                      <FileText className="h-4 w-4" />
                      <h3 className="font-medium">Question Details</h3>
                    </div>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent>
                  <div className="p-4 border-t space-y-4">
                    <div className="grid grid-cols-[1fr,200px] gap-4">
                      <div className="space-y-2">
                        <Label>Question Text</Label>
                        <RichTextEditor
                          value={subQuestion.richText}
                          onChange={(value) => handleChange({ richText: value })}
                          placeholder="Enter your sub-question here..."
                          height="200px"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Points</Label>
                          <Input
                            type="number"
                            min="1"
                            value={subQuestion.points}
                            onChange={(e) => handleChange({ points: parseInt(e.target.value) })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Select
                            value={subQuestion.type}
                            onValueChange={handleTypeChange}
                          >
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
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Answer Details Section */}
            <Collapsible open={isAnswerOpen} onOpenChange={setIsAnswerOpen}>
              <Card className="shadow-sm">
                <div className="flex items-center justify-between p-4 hover:bg-muted/50">
                  <CollapsibleTrigger asChild>
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
                      <MessageSquare className="h-4 w-4" />
                      <h3 className="font-medium">Answer Details</h3>
                    </div>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent>
                  <div className="p-4 border-t">
                    {subQuestion.type === "multiple-choice" && (
                      <MultipleChoiceEditor
                        options={subQuestion.options || []}
                        correctAnswer={subQuestion.correctAnswer as string}
                        onOptionsChange={(options) => handleChange({ options })}
                        onCorrectAnswerChange={(answer) => handleChange({ correctAnswer: answer })}
                      />
                    )}

                    {subQuestion.type === "true-false" && (
                      <TrueFalseEditor
                        correctAnswer={subQuestion.correctAnswer as boolean}
                        onCorrectAnswerChange={(value) => handleChange({ correctAnswer: value })}
                      />
                    )}

                    {subQuestion.type === "descriptive" && (
                      <div className="space-y-2">
                        <Label>Default Answer</Label>
                        <RichTextEditor
                          value={subQuestion.defaultAnswer || ""}
                          onChange={(value) => handleChange({ defaultAnswer: value })}
                          placeholder="Enter a default answer..."
                          height="200px"
                        />
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
