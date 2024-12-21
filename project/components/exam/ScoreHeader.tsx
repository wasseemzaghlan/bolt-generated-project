"use client";

import { motion } from "framer-motion";
import { Trophy, Star, GraduationCap, Building2, Calendar, BookOpen, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ScoreHeaderProps {
  earnedPoints: number;
  totalPoints: number;
  examInfo: {
    subject: string;
    program: string;
    provider: string;
    examName: string;
    year: number;
    date?: Date;
    duration?: number;
  };
}

export function ScoreHeader({ earnedPoints, totalPoints, examInfo }: ScoreHeaderProps) {
  const percentage = (earnedPoints / totalPoints) * 100;
  const grade = getGrade(percentage);
  const date = examInfo.date || new Date();
  const duration = examInfo.duration || 60;

  function getGrade(percentage: number): string {
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";
    return "F";
  }

  return (
    <Card className="bg-gradient-to-br from-card via-card/50 to-background border shadow-lg">
      <CardHeader className="pb-4">
        <div className="space-y-4">
          {/* Exam Information */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{examInfo.examName}</h2>
                <p className="text-sm text-muted-foreground">{examInfo.subject}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{format(date, 'PPP')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{duration} minutes</span>
              </div>
              <Badge variant="secondary">{examInfo.year}</Badge>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground border-t"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{examInfo.provider}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{examInfo.program}</span>
            </div>
          </motion.div>

          {/* Score Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between pt-2 border-t"
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Final Score</p>
                <p className="text-xl font-semibold">
                  {earnedPoints} / {totalPoints}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({Math.round(percentage)}%)
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">{grade}</div>
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Progress value={percentage} className="h-2 bg-secondary" />
        </motion.div>
      </CardContent>
    </Card>
  );
}
