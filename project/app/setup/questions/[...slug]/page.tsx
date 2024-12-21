"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuestionEditorPage } from "@/components/setup/questions/QuestionEditorPage";
import { useQuestions } from "@/hooks/use-questions";
import { useLoading } from "@/hooks/use-loading";
import { ROUTES } from "@/lib/routes";

interface QuestionPageProps {
  params: { slug: string[] };
}

export default function QuestionPage({ params }: QuestionPageProps) {
  const router = useRouter();
  const { questions } = useQuestions();
  const { setLoading } = useLoading();
  
  const [action, id] = params.slug;
  const isEdit = action === "edit";
  const isNew = action === "new";
  
  const question = isEdit ? questions.find(q => q.id === id) : undefined;

  useEffect(() => {
    setLoading(false);
    
    if (isEdit && !question && id !== 'default') {
      router.push(ROUTES.SETUP.QUESTIONS.ROOT);
    }
  }, [id, question, router, setLoading, isEdit]);

  if (isNew) {
    return <QuestionEditorPage mode="create" />;
  }

  if (isEdit) {
    if (!question && id !== 'default') {
      return null;
    }
    return <QuestionEditorPage question={question} mode="edit" />;
  }

  router.push(ROUTES.SETUP.QUESTIONS.ROOT);
  return null;
}
