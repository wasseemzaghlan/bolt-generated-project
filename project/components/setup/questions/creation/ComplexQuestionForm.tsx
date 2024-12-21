"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "../editor/RichTextEditor";
import { SubQuestionEditor } from "../form/SubQuestionEditor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SubQuestion } from "@/types/exam";
import { AttachmentSection } from "../editor/components/AttachmentSection";

interface ComplexQuestionFormProps {
  onSave: (data: any) => void;
}

export function ComplexQuestionForm({ onSave }: ComplexQuestionFormProps) {
  const [formData, setFormData] = useState({
    text: "",
    richText: "",
    points: "10",
    subQuestions: [] as SubQuestion[],
    attachment: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      points: parseInt(formData.points),
    });
  };

  const handleAddSubQuestion = () => {
    const newSubQuestion: SubQuestion = {
      id: `sub_${Date.now()}`,
      text: "",
      richText: "",
      type: "multiple-choice",
      points: 10,
      options: ["", "", "", ""],
    };
    setFormData(prev => ({
      ...prev,
      subQuestions: [...prev.subQuestions, newSubQuestion]
    }));
  };

  const handleUpdateSubQuestion = (index: number, updated: SubQuestion) => {
    const updatedSubQuestions = [...formData.subQuestions];
    updatedSubQuestions[index] = updated;
    setFormData(prev => ({
      ...prev,
      subQuestions: updatedSubQuestions
    }));
  };

  const handleRemoveSubQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subQuestions: prev.subQuestions.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 border-2 border-primary/10">
        <div className="grid grid-cols-[1fr,200px] gap-6">
          <div className="space-y-4">
            <Label>Complex Question Description</Label>
            <RichTextEditor
              value={formData.richText}
              onChange={(value) => setFormData(prev => ({ ...prev, richText: value, text: value }))}
              placeholder="Enter the main question or scenario description here..."
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Total Points</Label>
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

      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">Sub-Questions</Label>
        <Button 
          type="button"
          onClick={handleAddSubQuestion}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Sub-Question
        </Button>
      </div>

      <div className="space-y-6">
        {formData.subQuestions.map((subQuestion, index) => (
          <SubQuestionEditor
            key={subQuestion.id}
            index={index}
            subQuestion={subQuestion}
            onUpdate={(updated) => handleUpdateSubQuestion(index, updated)}
            onRemove={() => handleRemoveSubQuestion(index)}
            isFirst={index === 0}
            isLast={index === formData.subQuestions.length - 1}
          />
        ))}

        {formData.subQuestions.length === 0 && (
          <Card className="p-6 border-2 border-dashed border-primary/20 bg-muted/50">
            <div className="text-center text-muted-foreground">
              <p>No sub-questions added yet.</p>
              <p className="text-sm">Click the "Add Sub-Question" button to get started.</p>
            </div>
          </Card>
        )}
      </div>
    </form>
  );
}
