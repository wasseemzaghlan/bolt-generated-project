"use client";

import { useEffect, useState } from 'react';
import { ExamRecord } from '@/types/exam';
import { getExamRecords } from '@/lib/exam-storage';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Trophy, Clock, FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function ExamHistory() {
  const [records, setRecords] = useState<ExamRecord[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadRecords = () => {
      const examRecords = getExamRecords().sort((a, b) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
      setRecords(examRecords);
    };

    loadRecords();
    // Set up an interval to check for new records
    const interval = setInterval(loadRecords, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleReviewExam = (id: string) => {
    router.push(`/exam/history?id=${id}`);
  };

  if (records.length === 0) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No exam records found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {records.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card hover:bg-accent/5 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{record.examTitle}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatDistanceToNow(new Date(record.completedAt), { addSuffix: true })}
                  </div>
                </div>
                <CardDescription>
                  Exam ID: {record.id.split('_')[1]}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="font-medium">
                        {record.score.earnedPoints} / {record.score.totalPoints}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({Math.round((record.score.earnedPoints / record.score.totalPoints) * 100)}%)
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {Math.floor(record.duration / 60)}m {record.duration % 60}s
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Questions</p>
                      <p className="font-medium">
                        {record.answers.length} Answered
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReviewExam(record.id)}
                    className="flex items-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    Review Exam
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
}
