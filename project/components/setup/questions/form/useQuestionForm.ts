"use client";

import { useState } from "react";
import { Question, QuestionType } from "@/types/exam";

interface QuestionFormState {
  text: string;
  richText: string;
  type: QuestionType;
  points: string;
  correctAnswer: string;
  defaultAnswer: string;
  hint: string;
  options: string[];
  optionsRichText: string[];
  defaultAnswerRichText: string;
  hintRichText: string;
}

const DEFAULT_OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4"];

export function useQuestionForm(question?: Question) {
  const [formData, setFormData] = useState<QuestionFormState>({
    text: question?.text || "",
    richText: question?.richText || "",
    type: question?.type || "multiple-choice",
    points: question?.points?.toString() || "10",
    correctAnswer: question?.correctAnswer?.toString() || "",
    defaultAnswer: question?.defaultAnswer || "",
    hint: question?.hint || "",
    options: question?.options || [...DEFAULT_OPTIONS],
    optionsRichText: question?.options || [...DEFAULT_OPTIONS],
    defaultAnswerRichText: question?.defaultAnswer || "",
    hintRichText: question?.hint || "",
  });

  const updateFormData = (updates: Partial<QuestionFormState>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleTypeChange = (type: QuestionType) => {
    updateFormData({ 
      type,
      correctAnswer: "",
      options: type === "multiple-choice" ? [...DEFAULT_OPTIONS] : [],
      optionsRichText: type === "multiple-choice" ? [...DEFAULT_OPTIONS] : [],
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptionsRichText = [...formData.optionsRichText];
    newOptionsRichText[index] = value;
    updateFormData({ optionsRichText: newOptionsRichText });
  };

  const addOption = () => {
    const newOption = `Option ${formData.options.length + 1}`;
    updateFormData({
      options: [...formData.options, newOption],
      optionsRichText: [...formData.optionsRichText, newOption]
    });
  };

  const removeOption = (index: number) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    const newOptionsRichText = formData.optionsRichText.filter((_, i) => i !== index);
    const newCorrectAnswer = formData.correctAnswer === formData.options[index] 
      ? "" 
      : formData.correctAnswer;

    updateFormData({
      options: newOptions,
      optionsRichText: newOptionsRichText,
      correctAnswer: newCorrectAnswer
    });
  };

  return {
    formData,
    updateFormData,
    handleTypeChange,
    handleOptionChange,
    addOption,
    removeOption,
  };
}
