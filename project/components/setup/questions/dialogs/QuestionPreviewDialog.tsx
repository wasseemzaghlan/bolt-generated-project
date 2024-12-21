"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Question } from "@/types/exam";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { FileText, Clock, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
}

export function QuestionPreviewDialog({
  open,
  onOpenChange,
  question
}: QuestionPreviewDialogProps) {
  if (!question) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Question Preview</span>
            <Badge variant="outline" className={getQuestionTypeColor(question.type)}>
              {question.type}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card className="col-span-2">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm font-medium">Question Text</span>
                    </div>
                    <div className="prose dark:prose-invert">
                      {question.richText || question.text}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{question.points} Points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Estimated time: {Math.ceil(question.points / 2)} min</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {question.type === 'multiple-choice' && question.options && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-sm font-medium mb-4">Answer Options</h3>
                    <div className="space-y-3">
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className={cn(
                            "p-4 rounded-lg border",
                            option === question.correctAnswer && "border-primary bg-primary/5"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {option === question.correctAnswer && (
                              <Badge variant="default">Correct Answer</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {question.type === 'true-false' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-sm font-medium mb-4">Correct Answer</h3>
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "p-4 rounded-lg border flex-1 text-center",
                          question.correctAnswer === true && "border-primary bg-primary/5"
                        )}
                      >
                        True
                        {question.correctAnswer === true && (
                          <Badge variant="default" className="ml-2">Correct</Badge>
                        )}
                      </div>
                      <div
                        className={cn(
                          "p-4 rounded-lg border flex-1 text-center",
                          question.correctAnswer === false && "border-primary bg-primary/5"
                        )}
                      >
                        False
                        {question.correctAnswer === false && (
                          <Badge variant="default" className="ml-2">Correct</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {question.type === 'descriptive' && question.defaultAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-sm font-medium mb-4">Model Answer</h3>
                    <div className="prose dark:prose-invert">
                      {question.defaultAnswer}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {question.hint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-sm font-medium mb-4">Hint</h3>
                    <div className="prose dark:prose-invert">
                      {question.hint}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
