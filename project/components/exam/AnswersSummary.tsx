"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileText, CheckCircle, XCircle } from "lucide-react";
import { Question, ExamAnswer } from "@/types/exam";
import Image from "next/image";
import { motion } from "framer-motion";

interface AnswersSummaryProps {
  questions: Question[];
  answers: ExamAnswer[];
}

export function AnswersSummary({ questions, answers }: AnswersSummaryProps) {
  const totalQuestions = questions.length;
  const answeredQuestions = answers.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Answers Summary</CardTitle>
        <CardDescription>
          {answeredQuestions} of {totalQuestions} questions answered
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {questions.map((question, index) => {
            const answer = answers.find((a) => a.questionId === question.id);
            const isAnswered = !!answer;

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="py-4">
                  <div className="flex flex-col gap-4">
                    {question.image && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image
                          src={question.image.url}
                          alt={question.image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {isAnswered ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="font-medium">
                            Question {index + 1}: {question.text}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Type: {question.type === "true-false" ? "True/False" : "Descriptive"}
                          </p>
                        </div>
                        {isAnswered && (
                          <div className="pl-4 border-l-2 border-muted">
                            <p className="text-sm font-medium">Your Answer:</p>
                            <p className="text-sm mt-1">
                              {question.type === "true-false"
                                ? answer.answer
                                  ? "True"
                                  : "False"
                                : (answer.answer as string)}
                            </p>
                            {answer.attachedFile && (
                              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                <FileText className="h-4 w-4" />
                                <span>{answer.attachedFile.name}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {index < questions.length - 1 && <Separator />}
              </motion.div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
