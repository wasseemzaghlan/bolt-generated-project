"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from "@/types/exam";
import { RichTextEditor } from "@/components/setup/questions/editor/RichTextEditor";
import { Plus, Minus } from "lucide-react";

interface QuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question?: Question;
  onSave: (data: any) => void;
}

const QUESTION_TYPES = {
  'multiple-choice': 'Multiple Choice',
  'true-false': 'True/False',
  'descriptive': 'Descriptive'
} as const;

export function QuestionDialog({
  open,
  onOpenChange,
  question,
  onSave,
}: QuestionDialogProps) {
  const [formData, setFormData] = useState({
    text: "",
    richText: "",
    type: "multiple-choice" as keyof typeof QUESTION_TYPES,
    points: "10",
    correctAnswer: "",
    defaultAnswer: "",
    hint: "",
    options: ["", "", "", ""],
    optionsRichText: ["", "", "", ""],
    defaultAnswerRichText: "",
    hintRichText: "",
  });

  useEffect(() => {
    if (question) {
      setFormData({
        text: question.text,
        richText: question.richText || "",
        type: question.type,
        points: question.points.toString(),
        correctAnswer: question.correctAnswer?.toString() || "",
        defaultAnswer: question.defaultAnswer || "",
        hint: question.hint || "",
        options: question.options || ["", "", "", ""],
        optionsRichText: question.options || ["", "", "", ""],
        defaultAnswerRichText: question.defaultAnswer || "",
        hintRichText: question.hint || "",
      });
    } else {
      setFormData({
        text: "",
        richText: "",
        type: "multiple-choice",
        points: "10",
        correctAnswer: "",
        defaultAnswer: "",
        hint: "",
        options: ["", "", "", ""],
        optionsRichText: ["", "", "", ""],
        defaultAnswerRichText: "",
        hintRichText: "",
      });
    }
  }, [question]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      text: formData.richText,
      points: parseInt(formData.points),
      correctAnswer: formData.type === "true-false" 
        ? formData.correctAnswer === "true"
        : formData.correctAnswer,
      options: formData.type === "multiple-choice" ? formData.optionsRichText : undefined,
      defaultAnswer: formData.defaultAnswerRichText,
      hint: formData.hintRichText,
    });
  };

  const handleOptionRichTextChange = (index: number, value: string) => {
    const newOptionsRichText = [...formData.optionsRichText];
    newOptionsRichText[index] = value;
    setFormData({ ...formData, optionsRichText: newOptionsRichText });
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, ""],
      optionsRichText: [...prev.optionsRichText, ""]
    }));
  };

  const removeOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
      optionsRichText: prev.optionsRichText.filter((_, i) => i !== index),
      correctAnswer: prev.correctAnswer === prev.options[index] ? "" : prev.correctAnswer
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{question ? "Edit Question" : "Add Question"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Question Text</Label>
            <RichTextEditor
              value={formData.richText}
              onChange={(value) => setFormData({ ...formData, richText: value })}
              placeholder="Enter your question here..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: keyof typeof QUESTION_TYPES) => 
                  setFormData({ 
                    ...formData, 
                    type: value,
                    correctAnswer: "" // Reset answer when type changes
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(QUESTION_TYPES).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                required
              />
            </div>
          </div>

          {formData.type === "true-false" && (
            <div className="space-y-2">
              <Label>Correct Answer</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="true"
                    checked={formData.correctAnswer === "true"}
                    onCheckedChange={() => 
                      setFormData({ ...formData, correctAnswer: "true" })
                    }
                  />
                  <Label htmlFor="true">True</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="false"
                    checked={formData.correctAnswer === "false"}
                    onCheckedChange={() => 
                      setFormData({ ...formData, correctAnswer: "false" })
                    }
                  />
                  <Label htmlFor="false">False</Label>
                </div>
              </div>
            </div>
          )}

          {formData.type === "multiple-choice" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Options</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-4">
                {formData.optionsRichText.map((option, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex items-start pt-4">
                      <Checkbox
                        checked={formData.correctAnswer === option}
                        onCheckedChange={() => 
                          setFormData({ ...formData, correctAnswer: option })
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <RichTextEditor
                        value={option}
                        onChange={(value) => handleOptionRichTextChange(index, value)}
                        placeholder={`Option ${index + 1}`}
                      />
                    </div>
                    {formData.optionsRichText.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="self-start"
                        onClick={() => removeOption(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.type === "descriptive" && (
            <div className="space-y-2">
              <Label>Default Answer</Label>
              <RichTextEditor
                value={formData.defaultAnswerRichText}
                onChange={(value) => 
                  setFormData({ ...formData, defaultAnswerRichText: value })
                }
                placeholder="Enter a default answer..."
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Hint</Label>
            <RichTextEditor
              value={formData.hintRichText}
              onChange={(value) => 
                setFormData({ ...formData, hintRichText: value })
              }
              placeholder="Enter a hint for this question..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
