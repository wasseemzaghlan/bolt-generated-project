"use client";

import { useRouter } from "next/navigation";
import { QuestionEditor } from "@/components/setup/questions/QuestionEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function QuestionEditorFullscreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Fixed Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Questions
              </Button>
              <h1 className="text-2xl font-bold">Create New Question</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="container py-8">
          <div className="max-w-5xl mx-auto">
            <QuestionEditor />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
