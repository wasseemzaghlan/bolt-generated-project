"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useExams } from "@/hooks/use-exams";
import { ExamPreviewHeader } from "./ExamPreviewHeader";
import { ExamPreviewContent } from "./ExamPreviewContent";
import { useLoading } from "@/hooks/use-loading";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExamPreviewPageProps {
  examId: string;
}

export function ExamPreviewPage({ examId }: ExamPreviewPageProps) {
  const router = useRouter();
  const { exams } = useExams();
  const { setLoading } = useLoading();
  const exam = exams.find(e => e.id === examId);

  useEffect(() => {
    setLoading(false);
    if (!exam && examId !== 'default') {
      router.push("/setup/exams");
    }
  }, [examId, exam, router, setLoading]);

  if (!exam && examId !== 'default') return null;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background">
      <div className="w-full">
        <ExamPreviewHeader />
        <div className="p-6">
          <Card className="max-w-[1200px] mx-auto">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {exam && <ExamPreviewContent exam={exam} />}
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
