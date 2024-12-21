"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { QuestionCategory, QuestionType } from "@/types/exam";
import { QuestionTypeForm } from "./QuestionTypeForm";
import { DirectQuestionForm } from "../../DirectQuestionForm";
import { ComplexQuestionForm } from "../../ComplexQuestionForm";
import { LoadingButton } from "@/components/ui/loading-button";
import { useQuestions } from "@/hooks/use-questions";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/routes";

interface QuestionCreationFormProps {
  category: QuestionCategory;
  type: QuestionType;
  formData: any;
  isQuestionOpen: boolean;
  isAnswerOpen: boolean;
  openSubQuestions: string[];
  onCategoryChange: (category: QuestionCategory) => void;
  onTypeChange: (type: QuestionType) => void;
  onFormDataChange: (data: any) => void;
  onQuestionToggle: () => void;
  onAnswerToggle: () => void;
  onSubQuestionToggle: (id: string) => void;
}

export function QuestionCreationForm({
  category,
  type,
  formData,
  isQuestionOpen,
  isAnswerOpen,
  openSubQuestions,
  onCategoryChange,
  onTypeChange,
  onFormDataChange,
  onQuestionToggle,
  onAnswerToggle,
  onSubQuestionToggle
}: QuestionCreationFormProps) {
  const router = useRouter();
  const { addQuestion } = useQuestions();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const validateComplexQuestion = (data: any) => {
    if (!data?.richText?.trim()) {
      toast({
        title: "Error",
        description: "Please enter the main question text",
        variant: "destructive",
      });
      return false;
    }

    if (!data?.subQuestions?.length) {
      toast({
        title: "Error",
        description: "Please add at least one sub-question",
        variant: "destructive",
      });
      return false;
    }

    for (const subQuestion of data.subQuestions) {
      if (!subQuestion.richText?.trim()) {
        toast({
          title: "Error",
          description: "Please fill in all sub-question texts",
          variant: "destructive",
        });
        return false;
      }

      if (subQuestion.type === "multiple-choice") {
        if (!subQuestion.options?.some(Boolean)) {
          toast({
            title: "Error",
            description: "Please add options for all multiple choice sub-questions",
            variant: "destructive",
          });
          return false;
        }
        if (!subQuestion.correctAnswer) {
          toast({
            title: "Error",
            description: "Please select correct answers for all multiple choice sub-questions",
            variant: "destructive",
          });
          return false;
        }
      }
    }

    return true;
  };

  const validateDirectQuestion = (data: any) => {
    if (!data?.richText?.trim()) {
      toast({
        title: "Error",
        description: "Please enter the question text",
        variant: "destructive",
      });
      return false;
    }

    if (type === "multiple-choice") {
      if (!data.options?.some(Boolean)) {
        toast({
          title: "Error",
          description: "Please add at least one option",
          variant: "destructive",
        });
        return false;
      }
      if (!data.correctAnswer) {
        toast({
          title: "Error",
          description: "Please select the correct answer",
          variant: "destructive",
        });
        return false;
      }
    }

    if (type === "true-false" && data.correctAnswer === undefined) {
      toast({
        title: "Error",
        description: "Please select the correct answer (True or False)",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!formData) {
      toast({
        title: "Error",
        description: "Please fill in the question details",
        variant: "destructive",
      });
      return;
    }

    if (category === "complex" && !validateComplexQuestion(formData)) {
      return;
    }

    if (category === "direct" && !validateDirectQuestion(formData)) {
      return;
    }

    setIsSaving(true);
    try {
      const questionData = {
        ...formData,
        category,
        type: category === "direct" ? type : "complex",
        text: formData.richText || formData.text,
        correctAnswer: type === "true-false" 
          ? formData.correctAnswer === "true"
          : formData.correctAnswer,
      };

      if (category === "complex") {
        questionData.subQuestions = formData.subQuestions.map((sub: any) => ({
          ...sub,
          text: sub.richText || sub.text,
        }));
      }

      await addQuestion(questionData);

      toast({
        title: "Success",
        description: "Question created successfully",
      });

      router.push(ROUTES.SETUP.QUESTIONS.ROOT);
    } catch (error) {
      console.error("Error creating question:", error);
      toast({
        title: "Error",
        description: "Failed to create question",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <QuestionTypeForm
        category={category}
        type={type}
        onCategoryChange={onCategoryChange}
        onTypeChange={onTypeChange}
      />

      {category === "direct" ? (
        <DirectQuestionForm
          type={type}
          onSave={onFormDataChange}
          isQuestionOpen={isQuestionOpen}
          isAnswerOpen={isAnswerOpen}
          onQuestionToggle={onQuestionToggle}
          onAnswerToggle={onAnswerToggle}
        />
      ) : (
        <ComplexQuestionForm
          onSave={onFormDataChange}
          isQuestionOpen={isQuestionOpen}
          isAnswerOpen={isAnswerOpen}
          onQuestionToggle={onQuestionToggle}
          onAnswerToggle={onAnswerToggle}
          openSubQuestions={openSubQuestions}
          onSubQuestionToggle={onSubQuestionToggle}
        />
      )}

      <div className="flex justify-end pt-6 border-t">
        <LoadingButton
          onClick={handleSave}
          loading={isSaving}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Create Question
        </LoadingButton>
      </div>
    </div>
  );
}
