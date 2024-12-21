"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ProgressAnalytics } from "./ProgressAnalytics";

interface ModernProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number[];
  onTimeUp: () => void;
}

export function ModernProgress({ 
  currentQuestion, 
  totalQuestions,
  answeredQuestions,
  onTimeUp
}: ModernProgressProps) {
  return (
    <div className="space-y-3">
      <ProgressAnalytics
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        onTimeUp={onTimeUp}
      />
    </div>
  );
}
