"use client";

import { useState } from "react";
import { DirectQuestion, QuestionType } from "@/types/exam";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AttachmentUploader } from "./AttachmentUploader";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/ui/loading-button";
import { useLoading } from "@/components/providers/LoadingProvider";
import { RichTextEditor } from "../editor/RichTextEditor";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { QuestionAnswer } from "./QuestionAnswer";

interface DirectQuestionFormProps {
  question?: DirectQuestion;
  type: QuestionType;
  onSave: (data: Partial<DirectQuestion>) => void;
}

export function DirectQuestionForm({ question, type, onSave }: DirectQuestionFormProps) {
  const { isLoading } = useLoading();
  const [formData, setFormData] = useState({
    text: question?.text || "",
    richText: question?.richText || "",
    points: question?.points?.toString() || "10",
    correctAnswer: question?.correctAnswer?.toString() || "",
    options: question?.options || [],
    attachment: null as File | null,
    hint: question?.hint || "",
  });

  const [isQuestionOpen, setIsQuestionOpen] = useState(true);
  const [isAnswerOpen, setIsAnswerOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      category: 'direct',
      type,
      points: parseInt(formData.points),
      correctAnswer: type === "true-false" 
        ? formData.correctAnswer === "true"
        : formData.correctAnswer,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Collapsible open={isQuestionOpen} onOpenChange={setIsQuestionOpen}>
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
              <div className="flex items-center gap-4" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  <Label>Points:</Label>
                  <Input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData(prev => ({ ...prev, points: e.target.value }))}
                    className="w-20"
                    min="1"
                  />
                </div>
                <AttachmentUploader
                  onFileSelect={(file) => setFormData(prev => ({ ...prev, attachment: file }))}
                  currentFile={formData.attachment}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-6 border-t space-y-4">
              <RichTextEditor
                value={formData.richText}
                onChange={(value) => setFormData(prev => ({ ...prev, richText: value, text: value }))}
                placeholder="Enter your question here..."
                height="200px"
              />
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={isAnswerOpen} onOpenChange={setIsAnswerOpen}>
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
                correctAnswer={formData.correctAnswer}
                onOptionsChange={(options) => setFormData(prev => ({ ...prev, options }))}
                onCorrectAnswerChange={(answer) => setFormData(prev => ({ 
                  ...prev, 
                  correctAnswer: answer.toString() 
                }))}
              />
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <div className="flex justify-end">
        <LoadingButton type="submit" loading={isLoading}>
          Save Question
        </LoadingButton>
      </div>
    </form>
  );
}
