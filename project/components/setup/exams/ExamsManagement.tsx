"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ExamsGrid } from "./grid/ExamsGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/use-loading";
import { ROUTES } from "@/lib/routes";

export function ExamsManagement() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const handleCreateExam = () => {
    setLoading(true, 'Loading exam editor...');
    router.push(ROUTES.SETUP.EXAMS.NEW);
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-6">
      <Card className="h-full border-none bg-gradient-to-br from-card/90 via-card/50 to-background/90 backdrop-blur-sm">
        <CardHeader className="border-b bg-card/50 backdrop-blur-sm flex flex-row items-center justify-between space-y-0">
          <CardTitle>Exam Management</CardTitle>
          <Button 
            onClick={handleCreateExam}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Exam
          </Button>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="p-6">
            <ExamsGrid />
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
