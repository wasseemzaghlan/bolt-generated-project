"use client";

import { useState } from "react";
import { FileText, MessageSquare, FileQuestion } from "lucide-react";

export function useExamCreation() {
  const [formData, setFormData] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isQuestionsOpen, setIsQuestionsOpen] = useState(true);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(true);

  const navigationSections = [
    {
      id: "details",
      title: "Exam Details",
      icon: FileText,
      isOpen: isDetailsOpen,
      onClick: () => setIsDetailsOpen(!isDetailsOpen),
    },
    {
      id: "questions",
      title: "Questions Selection",
      icon: FileQuestion,
      isOpen: isQuestionsOpen,
      onClick: () => setIsQuestionsOpen(!isQuestionsOpen),
    },
    {
      id: "instructions",
      title: "Instructions",
      icon: MessageSquare,
      isOpen: isInstructionsOpen,
      onClick: () => setIsInstructionsOpen(!isInstructionsOpen),
    }
  ];

  const handleFormDataChange = (data: any) => {
    setFormData(data);
  };

  return {
    formData,
    isDetailsOpen,
    isQuestionsOpen,
    isInstructionsOpen,
    navigationSections,
    handleFormDataChange,
    setIsDetailsOpen,
    setIsQuestionsOpen,
    setIsInstructionsOpen
  };
}
