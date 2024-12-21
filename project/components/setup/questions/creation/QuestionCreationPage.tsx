"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { QuestionCategory, QuestionType } from "@/types/exam";
import { QuestionCreationHeader } from "./layout/QuestionCreationHeader";
import { QuestionCreationForm } from "./form/QuestionCreationForm";
import { QuestionNavigator } from "../navigation/QuestionNavigator";
import { useQuestionCreation } from "./hooks/useQuestionCreation";

export function QuestionCreationPage() {
  const router = useRouter();
  const [category, setCategory] = useState<QuestionCategory>("direct");
  const [type, setType] = useState<QuestionType>("multiple-choice");
  
  const {
    formData,
    isQuestionOpen,
    isAnswerOpen,
    openSubQuestions,
    navigationSections,
    handleFormDataChange,
    handleCategoryChange: handleCategoryChangeHook,
    setIsQuestionOpen,
    setIsAnswerOpen,
    setOpenSubQuestions
  } = useQuestionCreation(category, type, setType);

  const handleCategoryChange = (newCategory: QuestionCategory) => {
    setCategory(newCategory);
    handleCategoryChangeHook(newCategory);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background">
      <div className="max-w-[1920px] mx-auto">
        <Card className="border-none bg-gradient-to-br from-card/90 via-card/50 to-background/90 backdrop-blur-sm">
          <QuestionCreationHeader />

          <div className="flex">
            <QuestionNavigator sections={navigationSections} />

            <QuestionCreationForm
              category={category}
              type={type}
              formData={formData}
              isQuestionOpen={isQuestionOpen}
              isAnswerOpen={isAnswerOpen}
              openSubQuestions={openSubQuestions}
              onCategoryChange={handleCategoryChange}
              onTypeChange={setType}
              onFormDataChange={handleFormDataChange}
              onQuestionToggle={() => setIsQuestionOpen(!isQuestionOpen)}
              onAnswerToggle={() => setIsAnswerOpen(!isAnswerOpen)}
              onSubQuestionToggle={(id) => {
                setOpenSubQuestions(prev => 
                  prev.includes(id) 
                    ? prev.filter(qId => qId !== id)
                    : [...prev, id]
                );
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
