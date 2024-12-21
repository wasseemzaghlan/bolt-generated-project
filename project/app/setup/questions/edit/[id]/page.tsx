"use client";

import { QuestionEditorPage } from "@/components/setup/questions/QuestionEditorPage";
import { useQuestions } from "@/hooks/use-questions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/use-loading";

interface EditQuestionPageProps {
  params: { id: string };
}

export default function EditQuestionPage({ params }: EditQuestionPageProps) {
  const router = useRouter();
  const { questions } = useQuestions();

  const { setLoading } = useLoading();
  const question = questions.find(q => q.id === params.id);

  useEffect(() => {
    setLoading(false);
    
    if (params.id !== 'default' && !question) {
      router.push('/setup/questions');
    }
  }, [params.id, question, router, setLoading]);

  if (!question && params.id !== 'default') {
    return null;
  }

  return <QuestionEditorPage question={question} mode="edit" />;
}
