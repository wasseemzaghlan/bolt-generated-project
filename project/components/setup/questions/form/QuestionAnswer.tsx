"use client";

import { QuestionType } from "@/types/exam";
import { MultipleChoiceAnswer } from "./MultipleChoiceAnswer";
import { TrueFalseAnswer } from "./TrueFalseAnswer";
import { DescriptiveAnswer } from "./DescriptiveAnswer";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionAnswerProps {
  type: QuestionType;
  options?: string[];
  correctAnswer?: string | boolean;
  onOptionsChange?: (options: string[]) => void;
  onCorrectAnswerChange: (answer: string | boolean) => void;
}

export function QuestionAnswer({
  type,
  options = [],
  correctAnswer,
  onOptionsChange,
  onCorrectAnswerChange,
}: QuestionAnswerProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={type}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        {type === "multiple-choice" && onOptionsChange && (
          <MultipleChoiceAnswer
            options={options}
            correctAnswer={correctAnswer as string}
            onOptionsChange={onOptionsChange}
            onCorrectAnswerChange={onCorrectAnswerChange as (answer: string) => void}
          />
        )}

        {type === "true-false" && (
          <TrueFalseAnswer
            value={correctAnswer as boolean}
            onChange={onCorrectAnswerChange as (answer: boolean) => void}
          />
        )}

        {type === "descriptive" && (
          <DescriptiveAnswer
            value={correctAnswer as string || ""}
            onChange={onCorrectAnswerChange as (answer: string) => void}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
