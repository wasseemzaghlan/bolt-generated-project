"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCategory, QuestionType } from "@/types/exam";
import { useQuestions } from "@/hooks/use-questions";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/routes";
import { FileText, MessageSquare } from "lucide-react";

export function useQuestionCreation(
  category: QuestionCategory,
  type: QuestionType,
  setType: (type: QuestionType) => void
) {
  const router = useRouter();
  const { addQuestion } = useQuestions();
  const { toast } = useToast();
  const [formData, setFormData] = useState<any>(null);
  const [isQuestionOpen, setIsQuestionOpen] = useState(true);
  const [isAnswerOpen, setIsAnswerOpen] = useState(true);
  const [openSubQuestions, setOpenSubQuestions] = useState<string[]>([]);

  const handleCategoryChange = (newCategory: QuestionCategory) => {
    if (newCategory === "direct") {
      setType("multiple-choice");
    }
    setFormData(null);
  };

  const handleFormDataChange = (data: any) => {
    setFormData(data);
  };

  const navigationSections = [
    {
      id: "question",
      title: "Question Details",
      icon: FileText,
      isOpen: isQuestionOpen,
      onClick: () => setIsQuestionOpen(!isQuestionOpen),
    },
    {
      id: "answer",
      title: "Answer Details",
      icon: MessageSquare,
      isOpen: isAnswerOpen,
      onClick: () => setIsAnswerOpen(!isAnswerOpen),
      subsections: category === "complex" && formData?.subQuestions ? 
        formData.subQuestions.map((sub: any, index: number) => ({
          id: sub.id,
          title: `Sub-Question ${index + 1}`,
          isOpen: openSubQuestions.includes(sub.id),
          onClick: () => {
            setOpenSubQuestions(prev => 
              prev.includes(sub.id) 
                ? prev.filter(id => id !== sub.id)
                : [...prev, sub.id]
            );
          }
        })) : undefined
    }
  ];

  return {
    formData,
    isQuestionOpen,
    isAnswerOpen,
    openSubQuestions,
    navigationSections,
    handleFormDataChange,
    handleCategoryChange,
    setIsQuestionOpen,
    setIsAnswerOpen,
    setOpenSubQuestions
  };
}
