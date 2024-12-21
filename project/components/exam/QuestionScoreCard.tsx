"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Question } from "@/types/exam";

interface QuestionScoreCardProps {
  question: Question;
  questionNumber: number;
  earned: number;
  total: number;
}

export function QuestionScoreCard({
  question,
  questionNumber,
  earned,
  total,
}: QuestionScoreCardProps) {
  return (
    <Card className="h-full bg-gradient-to-br from-card/90 to-background border shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/5">
            Question {questionNumber}
          </Badge>
          <Badge variant="secondary" className="font-semibold">
            {earned} / {total} points
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {question.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full aspect-video rounded-lg overflow-hidden"
            >
              <Image
                src={question.image.url}
                alt={question.image.alt}
                fill
                className="object-cover transition-transform hover:scale-105 duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          )}
          <div>
            <p className="font-medium leading-relaxed">{question.text}</p>
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/60" />
              {question.type === "true-false" ? "True/False Question" : "Descriptive Question"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
