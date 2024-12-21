"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getExamRecordById } from "@/lib/exam-storage";
import { ExamRecord } from "@/types/exam";
import { ScoreCard } from "@/components/exam/ScoreCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { sampleExam } from "@/data/sample-exam";

interface ExamHistoryDetailsProps {
  examId: string;
}

export function ExamHistoryDetails({ examId }: ExamHistoryDetailsProps) {
  const router = useRouter();
  const [record, setRecord] = useState<ExamRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExamRecord = () => {
      const examRecord = getExamRecordById(examId);
      setRecord(examRecord || null);
      setIsLoading(false);
    };

    loadExamRecord();
  }, [examId]);

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground">
        <p>Loading exam record...</p>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">Exam record not found</p>
        <Button variant="outline" onClick={() => router.push("/exam/history")}>
          Go Back to History
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push("/exam/history")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to History
        </Button>
        <div className="text-sm text-muted-foreground">
          Completed {new Date(record.completedAt).toLocaleDateString()}
        </div>
      </div>

      <ScoreCard
        score={record.score}
        answers={record.answers}
        questions={sampleExam.questions}
      />
    </motion.div>
  );
}
