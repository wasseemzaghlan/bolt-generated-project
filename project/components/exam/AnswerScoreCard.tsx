"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { ExamAnswer, Question } from "@/types/exam";
import { FilePreview } from "./FilePreview";

interface AnswerScoreCardProps {
  question: Question;
  answer: ExamAnswer | undefined;
  feedback?: string;
  isCorrect: boolean;
}

export function AnswerScoreCard({
  question,
  answer,
  feedback,
  isCorrect,
}: AnswerScoreCardProps) {
  return (
    <Card className="h-full bg-gradient-to-br from-card/90 to-background border shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/5">
            Your Answer
          </Badge>
          {feedback && (
            <Badge variant={isCorrect ? "default" : "destructive"} className="font-semibold">
              {isCorrect ? "Correct" : "Incorrect"}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[100px]"
          >
            <p className="text-sm font-medium mb-2 text-muted-foreground">Your Response:</p>
            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
              <p className="text-sm leading-relaxed">
                {question.type === "true-false"
                  ? answer?.answer ? "True" : "False"
                  : answer?.answer || "No answer provided"}
              </p>
            </div>
          </motion.div>

          {answer?.attachedFile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FilePreview file={answer.attachedFile} />
            </motion.div>
          )}

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-muted/30 p-4 rounded-lg border border-border/50"
            >
              <p className="text-sm">
                <span className="font-medium text-primary">Feedback: </span>
                {feedback}
              </p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
