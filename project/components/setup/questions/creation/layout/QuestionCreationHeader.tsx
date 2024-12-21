"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";

export function QuestionCreationHeader() {
  const router = useRouter();

  return (
    <div className="p-6 border-b bg-card/50 backdrop-blur-sm flex items-center gap-4">
      <Button
        variant="ghost"
        onClick={() => router.push(ROUTES.SETUP.QUESTIONS.ROOT)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Questions
      </Button>
      <h1 className="text-xl font-semibold">Create New Question</h1>
    </div>
  );
}
