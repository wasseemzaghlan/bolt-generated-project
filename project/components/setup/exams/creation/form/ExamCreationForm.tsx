"use client";

import { Card } from "@/components/ui/card";
import { ExamDetailsSection } from "./sections/ExamDetailsSection";
import { QuestionSelectionSection } from "./sections/QuestionSelectionSection";
import { ExamInstructionsSection } from "./sections/ExamInstructionsSection";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useExams } from "@/hooks/use-exams";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/routes";

interface ExamCreationFormProps {
  formData: any;
  isDetailsOpen: boolean;
  isQuestionsOpen: boolean;
  isInstructionsOpen: boolean;
  onFormDataChange: (data: any) => void;
  onDetailsToggle: () => void;
  onQuestionsToggle: () => void;
  onInstructionsToggle: () => void;
}

export function ExamCreationForm({
  formData,
  isDetailsOpen,
  isQuestionsOpen,
  isInstructionsOpen,
  onFormDataChange,
  onDetailsToggle,
  onQuestionsToggle,
  onInstructionsToggle,
}: ExamCreationFormProps) {
  const router = useRouter();
  const { addExam } = useExams();
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await addExam({
        ...formData,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Exam created successfully",
      });

      router.push(ROUTES.SETUP.EXAMS.ROOT);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create exam",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <ExamDetailsSection
        isOpen={isDetailsOpen}
        onToggle={onDetailsToggle}
        formData={formData}
        onFormDataChange={onFormDataChange}
      />

      <QuestionSelectionSection
        isOpen={isQuestionsOpen}
        onToggle={onQuestionsToggle}
        formData={formData}
        onFormDataChange={onFormDataChange}
      />

      <ExamInstructionsSection
        isOpen={isInstructionsOpen}
        onToggle={onInstructionsToggle}
        formData={formData}
        onFormDataChange={onFormDataChange}
      />

      <div className="flex justify-end pt-6 border-t">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Create Exam
        </Button>
      </div>
    </div>
  );
}
