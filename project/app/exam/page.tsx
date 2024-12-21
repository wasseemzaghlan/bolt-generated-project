"use client";

import { useState, useEffect } from "react";
import { ExamAnswer, ExamScore } from "@/types/exam";
import { sampleExam } from "@/data/sample-exam";
import { QuestionCard } from "@/components/exam/QuestionCard";
import { AnswerCard } from "@/components/exam/AnswerCard";
import { ModernProgress } from "@/components/exam/ModernProgress";
import { NavigationControls } from "@/components/exam/NavigationControls";
import { ExamPreview } from "@/components/exam/ExamPreview";
import { QuestionList } from "@/components/exam/QuestionList";
import { ScoreCard } from "@/components/exam/ScoreCard";
import { ExamDetails } from "@/components/exam/ExamDetails";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { saveExamRecord } from "@/lib/exam-storage";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/use-loading";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

export default function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [examScore, setExamScore] = useState<ExamScore | null>(null);
  const [startTime] = useState<number>(Date.now());
  const { toast } = useToast();
  const router = useRouter();
  const { isLoading, setLoading } = useLoading();

  const answeredQuestionIndices = answers.map(answer => 
    sampleExam.questions.findIndex(q => q.id === answer.questionId)
  ).filter(index => index !== -1);

  const handleAnswerChange = async (answer: ExamAnswer) => {
    setLoading(true, 'Saving your answer...');
    try {
      setAnswers((prev) => {
        const existing = prev.findIndex((a) => a.questionId === answer.questionId);
        if (existing !== -1) {
          const updated = [...prev];
          updated[existing] = answer;
          return updated;
        }
        return [...prev, answer];
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < sampleExam.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleTimeUp = () => {
    toast({
      title: "Time's up!",
      description: "Your exam will be automatically submitted.",
      variant: "destructive",
    });
    handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true, 'Submitting your exam...');
    try {
      const unansweredQuestions = sampleExam.questions.filter(
        (q) => !answers.find((a) => a.questionId === q.id)
      );

      if (unansweredQuestions.length > 0) {
        toast({
          title: "Incomplete Exam",
          description: `Please answer all questions before submitting. ${unansweredQuestions.length} questions remaining.`,
          variant: "destructive",
        });
        return;
      }

      const questionScores = sampleExam.questions.map((question) => {
        const answer = answers.find((a) => a.questionId === question.id);
        let earned = 0;
        let feedback = "";

        if (question.type === "true-false" && answer) {
          earned = answer.answer === question.correctAnswer ? question.points : 0;
          feedback = earned ? "Correct! ✨" : "Incorrect answer. Keep practicing!";
        } else if (question.type === "multiple-choice" && answer) {
          earned = answer.answer === question.correctAnswer ? question.points : 0;
          feedback = earned ? "Correct! ✨" : "Incorrect answer. Keep practicing!";
        } else if (answer?.answer) {
          earned = Math.floor(question.points * 0.8);
          feedback = "Your answer has been recorded and will be reviewed.";
        }

        return {
          questionId: question.id,
          earned,
          total: question.points,
          feedback,
        };
      });

      const totalPoints = sampleExam.questions.reduce((sum, q) => sum + q.points, 0);
      const earnedPoints = questionScores.reduce((sum, score) => sum + score.earned, 0);
      const duration = Math.floor((Date.now() - startTime) / 1000);

      const score: ExamScore = {
        totalPoints,
        earnedPoints,
        questionScores,
      };

      setExamScore(score);
      await saveExamRecord(sampleExam.title, score, answers, duration);

      toast({
        title: "Exam Submitted Successfully",
        description: "Your answers have been recorded. View your results below.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (examScore) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <ScoreCard 
            score={examScore} 
            answers={answers} 
            questions={sampleExam.questions}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background">
        <div className="h-screen flex">
          <div className="w-80 h-screen overflow-y-auto hide-scrollbar border-r bg-card/50 backdrop-blur-sm">
            <div className="p-4 space-y-4">
              <ExamDetails
                subject="Advanced Wizardry"
                year={2024}
                examName="Mastery Certification"
                provider="Magical Academy"
                program="Arcane Studies"
              />

              <QuestionList
                questions={sampleExam.questions}
                answers={answers}
                currentQuestion={currentQuestion}
                onQuestionSelect={setCurrentQuestion}
              />
            </div>
          </div>

          <div className="flex-1 h-screen overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
                <div className="p-4">
                  <ModernProgress
                    currentQuestion={currentQuestion}
                    totalQuestions={sampleExam.questions.length}
                    answeredQuestions={answeredQuestionIndices}
                    onTimeUp={handleTimeUp}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar pb-32">
                <div className="max-w-3xl mx-auto p-4 space-y-6">
                  <QuestionCard
                    question={sampleExam.questions[currentQuestion]}
                    currentQuestion={currentQuestion}
                  />

                  <AnswerCard
                    question={sampleExam.questions[currentQuestion]}
                    answer={answers.find(
                      (a) => a.questionId === sampleExam.questions[currentQuestion].id
                    )}
                    onAnswerChange={handleAnswerChange}
                  />
                </div>
              </div>

              <NavigationControls
                currentQuestion={currentQuestion}
                totalQuestions={sampleExam.questions.length}
                answeredQuestions={answeredQuestionIndices}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onSubmit={() => setShowPreview(true)}
              />
            </div>
          </div>
        </div>

        <ExamPreview
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          onConfirm={handleSubmit}
          answers={answers}
          questions={sampleExam.questions}
        />
      </div>
    </>
  );
}
