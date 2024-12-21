"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export function ExamCreationHeader() {
  const router = useRouter();

  return (
    <div className="p-6 border-b bg-card/50 backdrop-blur-sm flex items-center gap-4">
      <Button
        variant="ghost"
        onClick={() => router.push(ROUTES.SETUP.EXAMS.ROOT)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Exams
      </Button>
      <h1 className="text-xl font-semibold">Create New Exam</h1>
    </div>
  );
}
