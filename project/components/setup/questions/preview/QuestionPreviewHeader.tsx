"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function QuestionPreviewHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 p-6 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Questions
      </Button>
      <h1 className="text-2xl font-bold">Question Preview</h1>
    </div>
  );
}
