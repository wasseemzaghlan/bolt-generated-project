"use client";

import { Question } from "@/types/exam";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

interface QuestionTextSectionProps {
  question: Question;
}

export function QuestionTextSection({ question }: QuestionTextSectionProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <Label className="text-lg font-semibold">Question Text</Label>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          {question.richText || question.text}
        </div>
      </CardContent>
    </Card>
  );
}
