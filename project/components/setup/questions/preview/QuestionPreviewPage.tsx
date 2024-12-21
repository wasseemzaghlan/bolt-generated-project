"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuestions } from "@/hooks/use-questions";
import { QuestionPreviewHeader } from "./QuestionPreviewHeader";
import { QuestionPreviewContent } from "./QuestionPreviewContent";
import { useLoading } from "@/hooks/use-loading";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestionPreviewPageProps {
  questionId: string;
}

export function QuestionPreviewPage({ questionId }: QuestionPreviewPageProps) {
  const router = useRouter();
  const { questions } = useQuestions();
  const { setLoading } = useLoading();
  const question = questions.find(q => q.id === questionId);

  useEffect(() => {
    setLoading(false);
    if (!question && questionId !== 'default') {
      router.push("/setup/questions");
    }
  }, [questionId, question, router, setLoading]);

  if (!question && questionId !== 'default') return null;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background">
      <div className="w-full">
        <QuestionPreviewHeader />
        <div className="p-6">
          <Card className="max-w-[1200px] mx-auto">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {question && <QuestionPreviewContent question={question} />}
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
