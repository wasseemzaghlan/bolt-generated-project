"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuestions } from "@/hooks/use-questions";
import { Question, QuestionCategory, QuestionType } from "@/types/exam";
import { useToast } from "@/hooks/use-toast";
import { DirectQuestionForm } from "./DirectQuestionForm";
import { ComplexQuestionForm } from "./ComplexQuestionForm";
import { QuestionTypeSelector } from "./QuestionTypeSelector";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface QuestionEditorProps {
  question?: Question;
  onSave: (data: any) => Promise<void>;
}

export function QuestionEditor({ question, onSave }: QuestionEditorProps) {
  const router = useRouter();
  const { addQuestion, updateQuestion } = useQuestions();
  const { toast } = useToast();
  const [category, setCategory] = useState<QuestionCategory>(
    question?.category || 'direct'
  );
  const [type, setType] = useState<QuestionType>(
    question?.type || 'multiple-choice'
  );
  const [isTypeOpen, setIsTypeOpen] = useState(true);

  const handleCategoryChange = (newCategory: QuestionCategory) => {
    setCategory(newCategory);
    if (newCategory === 'direct') {
      setType('multiple-choice');
    }
  };

  const handleSubmit = async (data: Partial<Question>) => {
    try {
      const updatedData = {
        ...data,
        category,
        type: category === 'direct' ? type : data.type,
      };

      if (question) {
        await updateQuestion(question.id, updatedData);
        toast({
          title: "Question updated",
          description: "The question has been updated successfully.",
        });
      } else {
        await addQuestion(updatedData);
        toast({
          title: "Question created",
          description: "The question has been created successfully.",
        });
      }

      await onSave(updatedData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save question. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <Collapsible open={isTypeOpen} onOpenChange={setIsTypeOpen}>
        <Card className="shadow-lg">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isTypeOpen ? "bg-primary/10" : "bg-muted"
                )}>
                  {isTypeOpen ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5" />
                  )}
                </div>
                <h3 className="text-sm font-medium">Question Type</h3>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 border-t">
              <QuestionTypeSelector
                category={category}
                type={type}
                onCategoryChange={handleCategoryChange}
                onTypeChange={setType}
              />
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {category === 'direct' ? (
        <DirectQuestionForm
          question={question?.category === 'direct' ? question : undefined}
          type={type}
          onSave={handleSubmit}
        />
      ) : (
        <ComplexQuestionForm
          question={question?.category === 'complex' ? question : undefined}
          onSave={handleSubmit}
        />
      )}
    </div>
  );
}
