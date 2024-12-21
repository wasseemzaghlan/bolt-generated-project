"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { motion } from "framer-motion";
import { ProgressLine } from "./ProgressLine";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useState } from "react";

interface NavigationControlsProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number[];
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export function NavigationControls({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  onNext,
  onPrevious,
  onSubmit,
}: NavigationControlsProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  const handleNavigation = async (direction: 'next' | 'previous') => {
    setIsNavigating(true);
    setTimeout(() => {
      if (direction === 'next') {
        onNext();
      } else {
        onPrevious();
      }
      setIsNavigating(false);
    }, 500);
  };

  const handleSubmitClick = async () => {
    setIsNavigating(true);
    setTimeout(() => {
      onSubmit();
      setIsNavigating(false);
    }, 500);
  };

  return (
    <motion.div 
      className="sticky bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between gap-8">
          <Button
            variant="outline"
            onClick={() => handleNavigation('previous')}
            disabled={isFirstQuestion || isNavigating}
            className="flex items-center gap-2 min-w-[120px] bg-background hover:bg-primary/5"
          >
            {isNavigating ? (
              <LoadingSpinner size="sm" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
            Previous
          </Button>

          <div className="flex-1 max-w-2xl">
            <ProgressLine
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              answeredQuestions={answeredQuestions}
            />
          </div>

          {isLastQuestion ? (
            <Button 
              onClick={handleSubmitClick}
              disabled={isNavigating}
              className="flex items-center gap-2 min-w-[120px] bg-primary hover:bg-primary/90"
            >
              {isNavigating ? (
                <LoadingSpinner size="sm" className="text-primary-foreground" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Submit
            </Button>
          ) : (
            <Button 
              onClick={() => handleNavigation('next')}
              disabled={isNavigating}
              className="flex items-center gap-2 min-w-[120px] bg-primary hover:bg-primary/90"
            >
              {isNavigating ? (
                <LoadingSpinner size="sm" className="text-primary-foreground" />
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
