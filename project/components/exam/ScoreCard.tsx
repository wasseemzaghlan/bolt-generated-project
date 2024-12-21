"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Question, ExamAnswer, ExamScore } from "@/types/exam";
import { QuestionScoreCard } from "./QuestionScoreCard";
import { AnswerScoreCard } from "./AnswerScoreCard";
import { ScoreHeader } from "./ScoreHeader";

interface ScoreCardProps {
  score: ExamScore;
  answers: ExamAnswer[];
  questions: Question[];
}

export function ScoreCard({ score, answers, questions }: ScoreCardProps) {
  const examInfo = {
    subject: "Advanced Wizardry",
    program: "Arcane Studies",
    provider: "Magical Academy",
    examName: "Mastery Certification",
    year: 2024,
  };

  return (
    <div className="space-y-6">
      <ScoreHeader
        earnedPoints={score.earnedPoints}
        totalPoints={score.totalPoints}
        examInfo={examInfo}
      />
      
      <ScrollArea className="h-[calc(100vh-280px)] pr-4 hide-scrollbar">
        <div className="space-y-8">
          {score.questionScores.map((questionScore, index) => {
            const question = questions[index];
            const answer = answers.find(a => a.questionId === questionScore.questionId);
            
            return (
              <motion.div
                key={questionScore.questionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <QuestionScoreCard
                    question={question}
                    questionNumber={index + 1}
                    earned={questionScore.earned}
                    total={questionScore.total}
                  />
                  <AnswerScoreCard
                    question={question}
                    answer={answer}
                    feedback={questionScore.feedback}
                    isCorrect={questionScore.earned === questionScore.total}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
