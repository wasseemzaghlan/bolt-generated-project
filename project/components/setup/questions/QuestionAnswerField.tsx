"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "./editor/RichTextEditor";
import { Plus, Minus } from "lucide-react";
import { QuestionType } from "@/types/exam";

interface QuestionAnswerFieldProps {
  type: QuestionType;
  formData: {
    correctAnswer: string;
    optionsRichText: string[];
    defaultAnswerRichText: string;
  };
  updateFormData: (updates: Partial<typeof formData>) => void;
}

export function QuestionAnswerField({ 
  type,
  formData,
  updateFormData
}: QuestionAnswerFieldProps) {
  const handleOptionChange = (index: number, value: string) => {
    const newOptionsRichText = [...formData.optionsRichText];
    newOptionsRichText[index] = value;
    updateFormData({ optionsRichText: newOptionsRichText });
  };

  const addOption = () => {
    const newOption = `Option ${formData.optionsRichText.length + 1}`;
    updateFormData({
      optionsRichText: [...formData.optionsRichText, newOption]
    });
  };

  const removeOption = (index: number) => {
    const newOptionsRichText = formData.optionsRichText.filter((_, i) => i !== index);
    const newCorrectAnswer = formData.correctAnswer === formData.optionsRichText[index] 
      ? "" 
      : formData.correctAnswer;

    updateFormData({
      optionsRichText: newOptionsRichText,
      correctAnswer: newCorrectAnswer
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {type === "true-false" && (
          <div className="space-y-2">
            <Label>Correct Answer</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="true"
                  checked={formData.correctAnswer === "true"}
                  onCheckedChange={() => 
                    updateFormData({ correctAnswer: "true" })
                  }
                />
                <Label htmlFor="true">True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="false"
                  checked={formData.correctAnswer === "false"}
                  onCheckedChange={() => 
                    updateFormData({ correctAnswer: "false" })
                  }
                />
                <Label htmlFor="false">False</Label>
              </div>
            </div>
          </div>
        )}

        {type === "multiple-choice" && (
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
                        updateFormData({ correctAnswer: option })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <RichTextEditor
                      value={option}
                      onChange={(value) => handleOptionChange(index, value)}
                      placeholder={`Option ${index + 1}`}
                      minimal
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

        {type === "descriptive" && (
          <div className="space-y-2">
            <Label>Default Answer</Label>
            <RichTextEditor
              value={formData.defaultAnswerRichText}
              onChange={(value) => 
                updateFormData({ defaultAnswerRichText: value })
              }
              placeholder="Enter a default answer..."
            />
          </div>
        )}
      </div>
    </Card>
  );
}
