"use client";

import { useState } from "react";
import { SubQuestion } from "@/types/exam";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "./editor/RichTextEditor";
import { SubQuestionEditor } from "./SubQuestionEditor";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ComplexQuestionEditorProps {
  description: string;
  subQuestions: SubQuestion[];
  onUpdate: (description: string, subQuestions: SubQuestion[]) => void;
}

export function ComplexQuestionEditor({
  description,
  subQuestions,
  onUpdate,
}: ComplexQuestionEditorProps) {
  const [localDescription, setLocalDescription] = useState(description);
  const [localSubQuestions, setLocalSubQuestions] = useState(subQuestions);

  const handleDescriptionChange = (value: string) => {
    setLocalDescription(value);
    onUpdate(value, localSubQuestions);
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
    const updatedSubQuestions = [...localSubQuestions, newSubQuestion];
    setLocalSubQuestions(updatedSubQuestions);
    onUpdate(localDescription, updatedSubQuestions);
  };

  const handleUpdateSubQuestion = (index: number, updated: SubQuestion) => {
    const updatedSubQuestions = [...localSubQuestions];
    updatedSubQuestions[index] = updated;
    setLocalSubQuestions(updatedSubQuestions);
    onUpdate(localDescription, updatedSubQuestions);
  };

  const handleRemoveSubQuestion = (index: number) => {
    const updatedSubQuestions = localSubQuestions.filter((_, i) => i !== index);
    setLocalSubQuestions(updatedSubQuestions);
    onUpdate(localDescription, updatedSubQuestions);
  };

  const moveSubQuestion = (fromIndex: number, toIndex: number) => {
    const updatedSubQuestions = [...localSubQuestions];
    const [removed] = updatedSubQuestions.splice(fromIndex, 1);
    updatedSubQuestions.splice(toIndex, 0, removed);
    setLocalSubQuestions(updatedSubQuestions);
    onUpdate(localDescription, updatedSubQuestions);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <Label>Complex Question Description</Label>
          <RichTextEditor
            value={localDescription}
            onChange={handleDescriptionChange}
            placeholder="Enter the main question or scenario description here..."
          />
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">Sub-Questions</Label>
        <Button onClick={handleAddSubQuestion}>
          <Plus className="h-4 w-4 mr-2" />
          Add Sub-Question
        </Button>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {localSubQuestions.map((subQuestion, index) => (
            <SubQuestionEditor
              key={subQuestion.id}
              subQuestion={subQuestion}
              onUpdate={(updated) => handleUpdateSubQuestion(index, updated)}
              onRemove={() => handleRemoveSubQuestion(index)}
              isFirst={index === 0}
              isLast={index === localSubQuestions.length - 1}
              onMoveUp={() => index > 0 && moveSubQuestion(index, index - 1)}
              onMoveDown={() => 
                index < localSubQuestions.length - 1 && 
                moveSubQuestion(index, index + 1)
              }
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
