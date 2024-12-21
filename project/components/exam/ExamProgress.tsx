"use client";

import { Progress } from "@/components/ui/progress";

interface ExamProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function ExamProgress({ currentQuestion, totalQuestions }: ExamProgressProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Question {currentQuestion + 1} of {totalQuestions}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
