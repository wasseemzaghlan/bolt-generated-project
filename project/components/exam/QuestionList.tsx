"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Question, ExamAnswer } from "@/types/exam";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Circle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface QuestionListProps {
  questions: Question[];
  answers: ExamAnswer[];
  currentQuestion: number;
  onQuestionSelect: (index: number) => void;
}

export function QuestionList({
  questions,
  answers,
  currentQuestion,
  onQuestionSelect,
}: QuestionListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const questionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const currentQuestionElement = questionRefs.current[currentQuestion];
    if (currentQuestionElement && scrollContainerRef.current) {
      currentQuestionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentQuestion]);

  const handleQuestionSelect = async (index: number) => {
    setIsNavigating(true);
    setTimeout(() => {
      onQuestionSelect(index);
      setIsNavigating(false);
    }, 500);
  };

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-green-50/50 to-background">
      <ScrollArea 
        ref={scrollContainerRef}
        className="h-[calc(100vh-280px)] hide-scrollbar"
      >
        <div className="p-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Questions Overview
          </h3>
          <div className="space-y-2">
            {questions.map((question, index) => {
              const isAnswered = answers.some((a) => a.questionId === question.id);
              const isCurrent = currentQuestion === index;
              const hasAttachment = answers.find(
                (a) => a.questionId === question.id
              )?.attachedFile;

              return (
                <motion.div
                  key={question.id}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.02 : 1,
                    backgroundColor: isCurrent ? "var(--secondary)" : "transparent",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    ref={el => questionRefs.current[index] = el}
                    variant={isCurrent ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-left h-auto py-3 px-4 relative overflow-hidden",
                      isCurrent && "bg-secondary/50 shadow-sm",
                      isAnswered && !isCurrent && "text-primary"
                    )}
                    onClick={() => handleQuestionSelect(index)}
                    disabled={isNavigating}
                  >
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 bg-primary/5"
                        layoutId="highlight"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="mt-0.5">
                        {isNavigating && isCurrent ? (
                          <LoadingSpinner size="sm" />
                        ) : isAnswered ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">Question {index + 1}</div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {question.text}
                        </p>
                        {hasAttachment && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                            <AlertCircle className="h-3 w-3" />
                            <span>File attached</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
