"use client";

import { QuestionEditor } from "@/components/setup/questions/QuestionEditor";
import { QuestionNavigation } from "./navigation/QuestionNavigation";
import { useQuestions } from "@/hooks/use-questions";
import { useEffect } from "react";
import { useLoading } from "@/hooks/use-loading";

interface QuestionEditorWrapperProps {
  questionId: string;
}

export function QuestionEditorWrapper({ questionId }: QuestionEditorWrapperProps) {
  const { questions } = useQuestions();
  const { setLoading } = useLoading();
  const question = questions.find(q => q.id === questionId);

  // Reset loading state when component mounts
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  if (questionId !== 'default' && !question) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Question not found</h1>
        <QuestionNavigation />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <QuestionNavigation />
        <h1 className="text-2xl font-bold">
          {questionId === 'default' ? 'Create Question' : 'Edit Question'}
        </h1>
      </div>
      <QuestionEditor question={question} />
    </>
  );
}
