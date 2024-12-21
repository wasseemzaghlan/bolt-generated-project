"use client";

import { useState } from "react";
import { Question, QuestionCategory, QuestionType } from "@/types/exam";

export function useQuestionForm(initialQuestion?: Question) {
  const [category, setCategory] = useState<QuestionCategory>(
    initialQuestion?.category || 'direct'
  );

  const [type, setType] = useState<QuestionType>(
    initialQuestion?.category === 'direct' ? initialQuestion.type : 'multiple-choice'
  );

  const handleCategoryChange = (newCategory: QuestionCategory) => {
    setCategory(newCategory);
    if (newCategory === 'direct') {
      setType('multiple-choice');
    }
  };

  return {
    category,
    type,
    setType,
    handleCategoryChange,
  };
}
