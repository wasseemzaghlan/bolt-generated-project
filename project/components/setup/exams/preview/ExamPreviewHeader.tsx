"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export function ExamPreviewHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 p-6 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <Button 
        variant="ghost" 
        onClick={() => router.push(ROUTES.SETUP.EXAMS.ROOT)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Exams
      </Button>
      <h1 className="text-2xl font-bold">Exam Preview</h1>
    </div>
  );
}
