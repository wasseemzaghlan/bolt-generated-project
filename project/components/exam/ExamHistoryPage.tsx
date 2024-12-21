"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ExamHistory } from "@/components/exam/ExamHistory";
import { ExamHistoryDetails } from "@/components/exam/ExamHistoryDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExamHistoryPage() {
  const searchParams = useSearchParams();
  const examId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {examId ? (
          <ExamHistoryDetails examId={examId} />
        ) : (
          <Card className="border-none bg-gradient-to-br from-card via-card/50 to-background">
            <CardHeader>
              <CardTitle className="text-2xl">Exam History</CardTitle>
            </CardHeader>
            <CardContent>
              <ExamHistory />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
