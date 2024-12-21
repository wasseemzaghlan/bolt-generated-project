"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionsGrid } from "./QuestionsGrid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/use-loading";
import { ROUTES } from "@/lib/routes";

export function QuestionsManagement() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const handleCreateQuestion = () => {
    setLoading(true, 'Loading question editor...');
    router.push(ROUTES.SETUP.QUESTIONS.NEW);
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-6">
      <Card className="h-full border-none bg-gradient-to-br from-card/90 via-card/50 to-background/90 backdrop-blur-sm">
        <CardHeader className="border-b bg-card/50 backdrop-blur-sm flex flex-row items-center justify-between space-y-0">
          <CardTitle>Questions Management</CardTitle>
          <Button 
            onClick={handleCreateQuestion}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </CardHeader>
        <div className="p-6">
          <QuestionsGrid />
        </div>
      </Card>
    </div>
  );
}
