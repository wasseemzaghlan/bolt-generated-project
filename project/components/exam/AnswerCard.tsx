"use client";

import { Question, ExamAnswer } from "@/types/exam";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "./FileUpload";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

interface AnswerCardProps {
  question: Question;
  answer: ExamAnswer | undefined;
  onAnswerChange: (answer: ExamAnswer) => void;
}

export function AnswerCard({ question, answer, onAnswerChange }: AnswerCardProps) {
  const handleAnswerChange = (value: string | boolean) => {
    onAnswerChange({
      questionId: question.id,
      answer: value,
      attachedFiles: answer?.attachedFiles || [],
    });
  };

  const handleFileSelect = (files: File[]) => {
    onAnswerChange({
      questionId: question.id,
      answer: answer?.answer || "",
      attachedFiles: files,
    });
  };

  return (
    <Card className="border shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Your Answer</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              {question.type === "true-false" ? (
                <RadioGroup
                  onValueChange={(value) => handleAnswerChange(value === "true")}
                  value={answer?.answer?.toString()}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="true" id={`${question.id}-true`} />
                    <Label htmlFor={`${question.id}-true`} className="text-base">True</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="false" id={`${question.id}-false`} />
                    <Label htmlFor={`${question.id}-false`} className="text-base">False</Label>
                  </div>
                </RadioGroup>
              ) : question.type === "multiple-choice" ? (
                <RadioGroup
                  onValueChange={handleAnswerChange}
                  value={answer?.answer as string}
                  className="flex flex-col space-y-3"
                >
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                      <Label htmlFor={`${question.id}-${index}`} className="text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <Textarea
                  placeholder="Enter your answer here..."
                  value={answer?.answer as string || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Supporting Documents (Optional)</Label>
              <FileUpload
                onFileSelect={handleFileSelect}
                className="w-full"
                maxFiles={question.maxAttachments || 3}
                currentFiles={answer?.attachedFiles || []}
              />
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
