"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QuestionType } from "@/types/exam";
import { RichTextEditor } from "../editor/RichTextEditor";
import { MultipleChoiceEditor } from "../form/MultipleChoiceEditor";
import { TrueFalseEditor } from "../form/TrueFalseEditor";
import { DescriptiveEditor } from "../form/DescriptiveEditor";
import { AttachmentSection } from "../editor/components/AttachmentSection";

interface DirectQuestionFormProps {
  type: QuestionType;
  onSave: (data: any) => void;
}

export function DirectQuestionForm({ type, onSave }: DirectQuestionFormProps) {
  const [formData, setFormData] = useState({
    text: "",
    richText: "",
    points: "10",
    correctAnswer: "",
    options: [] as string[],
    attachment: null as File | null,
    defaultAnswer: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      points: parseInt(formData.points),
      correctAnswer: type === "true-false" 
        ? formData.correctAnswer === "true"
        : formData.correctAnswer,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 border-2 border-primary/10">
        <div className="grid grid-cols-[1fr,200px] gap-6">
          <div className="space-y-4">
            <Label>Question Text</Label>
            <RichTextEditor
              value={formData.richText}
              onChange={(value) => setFormData(prev => ({ ...prev, richText: value, text: value }))}
              placeholder="Enter your question here..."
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Points</Label>
              <Input
                type="number"
                min="1"
                value={formData.points}
                onChange={(e) => setFormData(prev => ({ ...prev, points: e.target.value }))}
                required
              />
            </div>

            <AttachmentSection
              onFileSelect={(file) => setFormData(prev => ({ ...prev, attachment: file }))}
              currentFile={formData.attachment}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-2 border-primary/10">
        <div className="space-y-4">
          <Label>Answer</Label>
          {type === "multiple-choice" && (
            <MultipleChoiceEditor
              options={formData.options}
              correctAnswer={formData.correctAnswer}
              onOptionsChange={(options) => setFormData(prev => ({ ...prev, options }))}
              onCorrectAnswerChange={(answer) => setFormData(prev => ({ 
                ...prev, 
                correctAnswer: answer
              }))}
            />
          )}
          {type === "true-false" && (
            <TrueFalseEditor
              correctAnswer={formData.correctAnswer === "true"}
              onCorrectAnswerChange={(value) => 
                setFormData(prev => ({ ...prev, correctAnswer: value.toString() }))
              }
            />
          )}
          {type === "descriptive" && (
            <DescriptiveEditor
              value={formData.defaultAnswer}
              onChange={(value) => setFormData(prev => ({ ...prev, defaultAnswer: value }))}
            />
          )}
        </div>
      </Card>
    </form>
  );
}
