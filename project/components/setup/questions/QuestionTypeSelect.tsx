"use client";

import { QuestionCategory, QuestionType } from "@/types/exam";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface QuestionTypeSelectProps {
  category: QuestionCategory;
  type?: QuestionType;
  onCategoryChange: (category: QuestionCategory) => void;
  onTypeChange?: (type: QuestionType) => void;
}

const QUESTION_CATEGORIES = {
  'direct': 'Direct Question',
  'complex': 'Complex Question'
} as const;

const QUESTION_TYPES = {
  'multiple-choice': 'Multiple Choice',
  'true-false': 'True/False',
  'descriptive': 'Descriptive'
} as const;

export function QuestionTypeSelect({
  category,
  type,
  onCategoryChange,
  onTypeChange
}: QuestionTypeSelectProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Question Category</Label>
        <Select
          value={category}
          onValueChange={(value: QuestionCategory) => onCategoryChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(QUESTION_CATEGORIES).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {category === 'direct' && onTypeChange && (
        <div className="space-y-2">
          <Label>Question Type</Label>
          <Select
            value={type}
            onValueChange={(value: QuestionType) => onTypeChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(QUESTION_TYPES).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
