"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface QuestionTypeCellProps {
  type: string;
}

export function QuestionTypeCell({ type }: QuestionTypeCellProps) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return {
          label: 'Multiple Choice',
          className: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200/50'
        };
      case 'true-false':
        return {
          label: 'True/False',
          className: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200/50'
        };
      case 'descriptive':
        return {
          label: 'Descriptive',
          className: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200/50'
        };
      case 'complex':
        return {
          label: 'Complex',
          className: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/50'
        };
      default:
        return {
          label: type,
          className: 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200/50'
        };
    }
  };

  const config = getTypeConfig(type);

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-xs font-normal py-0.5 px-2",
        config.className
      )}
    >
      {config.label}
    </Badge>
  );
}
