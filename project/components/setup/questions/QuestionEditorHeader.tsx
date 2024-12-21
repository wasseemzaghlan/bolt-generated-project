"use client";

import { Card } from "@/components/ui/card";
import { QuestionTypeSelect } from "./QuestionTypeSelect";
import { QuestionCategory, QuestionType } from "@/types/exam";

interface QuestionEditorHeaderProps {
  category: QuestionCategory;
  type?: QuestionType;
  onCategoryChange: (category: QuestionCategory) => void;
  onTypeChange: (type: QuestionType) => void;
}

export function QuestionEditorHeader({
  category,
  type,
  onCategoryChange,
  onTypeChange,
}: QuestionEditorHeaderProps) {
  return (
    <Card className="p-6">
      <QuestionTypeSelect
        category={category}
        type={category === 'direct' ? type : undefined}
        onCategoryChange={onCategoryChange}
        onTypeChange={onTypeChange}
      />
    </Card>
  );
}
