"use client";

import { Exam } from "@/types/exam";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { 
  GraduationCap, 
  Building2, 
  Calendar, 
  BookOpen,
  Clock,
  FileText,
  CheckCircle2
} from "lucide-react";

interface ExamPreviewContentProps {
  exam: Exam;
}

export function ExamPreviewContent({ exam }: ExamPreviewContentProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{exam.title}</h2>
              <Badge variant={exam.status === 'active' ? 'default' : 'secondary'}>
                {exam.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{exam.description}</p>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm">Subject: {exam.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-sm">Program: {exam.program}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm">Provider: {exam.provider}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">Year: {exam.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Duration: {exam.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">Questions: {exam.questions.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Exam Statistics</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Points:</span>
              <Badge variant="secondary">
                {exam.questions.reduce((sum, q) => sum + q.points, 0)} points
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Created:</span>
              <span className="text-sm">{format(new Date(exam.createdAt), 'PP')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Updated:</span>
              <span className="text-sm">{format(new Date(exam.updatedAt), 'PP')}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Questions Overview</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exam.questions.map((question, index) => (
              <div key={question.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{question.text}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">{question.type}</Badge>
                    <Badge variant="outline">{question.points} points</Badge>
                    {question.correctAnswer !== undefined && (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Has correct answer</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
