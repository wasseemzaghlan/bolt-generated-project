"use client";

import { Question } from "@/types/exam";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MessageSquare, CheckCircle2 } from "lucide-react";

interface QuestionAnswerSectionProps {
  question: Question;
}

export function QuestionAnswerSection({ question }: QuestionAnswerSectionProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <Label className="text-lg font-semibold">Answer Details</Label>
        </div>
      </CardHeader>
      <CardContent>
        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg border bg-muted/30",
                  option === question.correctAnswer && "border-primary bg-primary/5"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {option === question.correctAnswer && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                    <span>{option}</span>
                  </span>
                  {option === question.correctAnswer && (
                    <Badge variant="default">Correct Answer</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="grid grid-cols-2 gap-4">
            <div
              className={cn(
                "p-4 rounded-lg border text-center",
                question.correctAnswer === true && "border-primary bg-primary/5"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                {question.correctAnswer === true && (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
                <span>True</span>
              </div>
            </div>
            <div
              className={cn(
                "p-4 rounded-lg border text-center",
                question.correctAnswer === false && "border-primary bg-primary/5"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                {question.correctAnswer === false && (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
                <span>False</span>
              </div>
            </div>
          </div>
        )}

        {question.type === 'descriptive' && question.defaultAnswer && (
          <div className="space-y-2">
            <Label>Model Answer</Label>
            <Textarea
              value={question.defaultAnswer}
              readOnly
              className="min-h-[200px] bg-muted font-light resize-none"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
