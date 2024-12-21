"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, MoreHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProgressLineProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number[];
}

export function ProgressLine({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
}: ProgressLineProps) {
  // Show 7 questions: first, current-2, current-1, current, current+1, current+2, and last
  const getVisibleQuestions = () => {
    const visibleIndices = new Set<number>();
    
    // Always show first question
    visibleIndices.add(0);
    
    // Show current question and adjacent ones if possible
    if (currentQuestion > 1) visibleIndices.add(currentQuestion - 2);
    if (currentQuestion > 0) visibleIndices.add(currentQuestion - 1);
    visibleIndices.add(currentQuestion);
    if (currentQuestion < totalQuestions - 1) visibleIndices.add(currentQuestion + 1);
    if (currentQuestion < totalQuestions - 2) visibleIndices.add(currentQuestion + 2);
    
    // Always show last question
    if (totalQuestions > 1) visibleIndices.add(totalQuestions - 1);

    return Array.from(visibleIndices).sort((a, b) => a - b);
  };

  const visibleQuestions = getVisibleQuestions();

  const getProgressColor = (index: number) => {
    if (answeredQuestions.includes(index)) {
      return 'from-green-500 to-green-600';
    }
    if (index === currentQuestion) {
      return 'from-green-400 to-green-500';
    }
    return 'from-gray-200 to-gray-300';
  };

  const renderQuestionIndicator = (index: number, showDots = false) => {
    const isAnswered = answeredQuestions.includes(index);
    const isCurrent = currentQuestion === index;
    
    if (showDots) {
      return (
        <div className="flex items-center justify-center w-8">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </div>
      );
    }

    return (
      <Tooltip key={index}>
        <TooltipTrigger asChild>
          <motion.div
            className="relative"
            initial={false}
            animate={{
              scale: isCurrent ? 1.2 : 1,
              y: isCurrent ? -2 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                transition-all duration-200
                ${isCurrent 
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg ring-2 ring-green-500 ring-offset-2' 
                  : isAnswered 
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 shadow-sm'
                }
              `}
              whileHover={{ scale: isCurrent ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs font-medium">{index + 1}</span>
            </motion.div>

            {isCurrent && (
              <motion.div
                className="absolute inset-0 rounded-full bg-green-500/20 -z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">Question {index + 1}</p>
          <p className={`text-xs ${
            isAnswered 
              ? 'text-green-500' 
              : isCurrent 
                ? 'text-green-400'
                : 'text-muted-foreground'
          }`}>
            {isAnswered ? 'Completed' : isCurrent ? 'Current' : 'Not answered'}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div className="relative flex justify-center">
      <div className="relative pt-2 pb-1 w-full">
        {/* Progress line */}
        <div className="absolute top-[1.15rem] left-0 w-full h-1.5 bg-secondary/30 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            {Array.from({ length: totalQuestions - 1 }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-full flex-1 bg-gradient-to-r ${getProgressColor(index)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              />
            ))}
          </div>
        </div>

        {/* Question indicators */}
        <div className="relative flex justify-between items-center">
          {visibleQuestions.map((index, arrayIndex) => (
            <React.Fragment key={index}>
              {arrayIndex > 0 && index - visibleQuestions[arrayIndex - 1] > 1 && (
                <div className="flex-shrink-0">
                  {renderQuestionIndicator(index, true)}
                </div>
              )}
              <div className="flex-shrink-0">
                {renderQuestionIndicator(index)}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
