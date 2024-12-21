"use client";

import { QuestionPreviewPage } from "@/components/setup/questions/preview/QuestionPreviewPage";

export default function QuestionPreview({ params }: { params: { id: string } }) {
  return <QuestionPreviewPage questionId={params.id} />;
}
