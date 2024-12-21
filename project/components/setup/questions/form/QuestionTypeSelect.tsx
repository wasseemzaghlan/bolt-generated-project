"use client";

import { QuestionType } from "@/types/exam";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface QuestionTypeSelectProps {
  value: QuestionType;
  onChange: (value: QuestionType) => void;
}

const QUESTION_TYPES = {
  'multiple-choice': 'Multiple Choice',
  'true-false': 'True/False',
  'descriptive': 'Descriptive'
} as const;

export function QuestionTypeSelect({ value, onChange }: QuestionTypeSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="type">Type</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
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
  );
}
