"use client";

import { Card } from "@/components/ui/card";
import { QuestionTypeSelector } from "../../QuestionTypeSelector";
import { QuestionCategory, QuestionType } from "@/types/exam";

interface QuestionTypeFormProps {
  category: QuestionCategory;
  type: QuestionType;
  onCategoryChange: (category: QuestionCategory) => void;
  onTypeChange: (type: QuestionType) => void;
}

export function QuestionTypeForm({
  category,
  type,
  onCategoryChange,
  onTypeChange,
}: QuestionTypeFormProps) {
  return (
    <Card className="p-6 border-2 border-primary/10">
      <QuestionTypeSelector
        category={category}
        type={type}
        onCategoryChange={onCategoryChange}
        onTypeChange={onTypeChange}
      />
    </Card>
  );
}
