"use client";

import { useState } from "react";

export interface ExamFormData {
  title: string;
  reference: string;
  year: number;
  duration: number;
  program: string;
  subject: string;
  provider: string;
  instructions?: string;
  questions: string[];
}

const initialFormData: ExamFormData = {
  title: "",
  reference: "",
  year: new Date().getFullYear(),
  duration: 60,
  program: "",
  subject: "",
  provider: "",
  instructions: "",
  questions: [],
};

export function useExamForm() {
  const [formData, setFormData] = useState<ExamFormData>(initialFormData);

  const updateFormData = (updates: Partial<ExamFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const isValid = () => {
    return (
      formData.title &&
      formData.program &&
      formData.subject &&
      formData.provider &&
      formData.duration > 0 &&
      formData.questions.length > 0
    );
  };

  return {
    formData,
    updateFormData,
    resetForm,
    isValid,
  };
}
