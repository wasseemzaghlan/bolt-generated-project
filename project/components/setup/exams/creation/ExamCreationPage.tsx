"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ExamCreationForm } from "./form/ExamCreationForm";
import { ExamCreationHeader } from "./layout/ExamCreationHeader";
import { ExamNavigator } from "./navigation/ExamNavigator";
import { useExamCreation } from "./hooks/useExamCreation";

export function ExamCreationPage() {
  const {
    formData,
    isDetailsOpen,
    isQuestionsOpen,
    isInstructionsOpen,
    navigationSections,
    handleFormDataChange,
    setIsDetailsOpen,
    setIsQuestionsOpen,
    setIsInstructionsOpen
  } = useExamCreation();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background">
      <div className="max-w-[1920px] mx-auto">
        <Card className="border-none bg-gradient-to-br from-card/90 via-card/50 to-background/90 backdrop-blur-sm">
          <ExamCreationHeader />

          <div className="flex">
            <ExamNavigator sections={navigationSections} />

            <ExamCreationForm
              formData={formData}
              isDetailsOpen={isDetailsOpen}
              isQuestionsOpen={isQuestionsOpen}
              isInstructionsOpen={isInstructionsOpen}
              onFormDataChange={handleFormDataChange}
              onDetailsToggle={() => setIsDetailsOpen(!isDetailsOpen)}
              onQuestionsToggle={() => setIsQuestionsOpen(!isQuestionsOpen)}
              onInstructionsToggle={() => setIsInstructionsOpen(!isInstructionsOpen)}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
