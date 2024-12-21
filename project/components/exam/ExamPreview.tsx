"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExamAnswer, Question } from "@/types/exam";
import { Check, FileText } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useState } from "react";

interface ExamPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  answers: ExamAnswer[];
  questions: Question[];
}

export function ExamPreview({
  isOpen,
  onClose,
  onConfirm,
  answers,
  questions,
}: ExamPreviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm();
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Your Answers</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] mt-4">
          <div className="space-y-6 pr-4">
            {questions.map((question, index) => {
              const answer = answers.find((a) => a.questionId === question.id);
              return (
                <div key={question.id} className="space-y-2">
                  <h3 className="font-medium">
                    Question {index + 1}: {question.text}
                  </h3>
                  <div className="pl-4 space-y-1">
                    <p className="text-sm text-muted-foreground">Your answer:</p>
                    <p className="font-medium">
                      {question.type === "true-false"
                        ? answer?.answer ? "True" : "False"
                        : answer?.answer || "No answer provided"}
                    </p>
                    {answer?.attachedFile && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{answer.attachedFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Go Back
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <LoadingSpinner size="sm" className="text-primary-foreground" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Confirm Submission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
