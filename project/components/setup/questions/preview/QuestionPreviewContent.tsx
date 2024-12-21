"use client";

import { Question } from "@/types/exam";
import { Badge } from "@/components/ui/badge";
import { QuestionTextSection } from "./sections/QuestionTextSection";
import { QuestionAnswerSection } from "./sections/QuestionAnswerSection";
import { QuestionHintSection } from "./sections/QuestionHintSection";

interface QuestionPreviewContentProps {
  question: Question;
}

export function QuestionPreviewContent({ question }: QuestionPreviewContentProps) {
  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'true-false':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'descriptive':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'complex':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Question Details</h2>
        <Badge variant="outline" className={getQuestionTypeColor(question.type)}>
          {question.type}
        </Badge>
      </div>

      <QuestionTextSection question={question} />
      <QuestionAnswerSection question={question} />
      {question.hint && <QuestionHintSection hint={question.hint} />}
    </div>
  );
}
