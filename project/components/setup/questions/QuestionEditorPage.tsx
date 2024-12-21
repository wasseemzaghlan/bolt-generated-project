"use client";

import { Question } from "@/types/exam";
import { QuestionEditor } from "./QuestionEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLoading } from "@/hooks/use-loading";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingButton } from "@/components/ui/loading-button";
import { Card } from "@/components/ui/card";
import { QuestionNavigation } from "./navigation/QuestionNavigation";

interface QuestionEditorPageProps {
  question?: Question;
  mode: "create" | "edit";
}

export function QuestionEditorPage({ question, mode }: QuestionEditorPageProps) {
  const { setLoading } = useLoading();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  if (mode === "edit" && !question) {
    router.push("/setup/questions");
    return null;
  }

  const handleSave = async (data: any) => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulated save
      router.push("/setup/questions");
    } catch (error) {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background">
      <div className="w-full flex flex-col h-screen">
        {/* Fixed Header */}
        <Card className="rounded-none border-x-0 border-t-0 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Link href="/setup/questions">
                <Button variant="ghost" className="flex items-center gap-2 text-sm">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Questions
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">
                {mode === "create" ? "Create Question" : "Edit Question"}
              </h1>
            </div>
            <LoadingButton 
              onClick={handleSave}
              loading={isSaving}
              className="flex items-center gap-2 text-sm"
            >
              <Save className="h-4 w-4" />
              Save Question
            </LoadingButton>
          </div>
        </Card>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-64 border-r bg-card/50 backdrop-blur-sm">
            <QuestionNavigation />
          </div>

          {/* Editor Area */}
          <ScrollArea className="flex-1">
            <div className="max-w-[1400px] mx-auto p-6">
              <Card className="border-none bg-gradient-to-br from-card/90 via-card/50 to-background/90 backdrop-blur-sm">
                <div className="p-6">
                  <QuestionEditor 
                    question={question} 
                    onSave={handleSave}
                  />
                </div>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
