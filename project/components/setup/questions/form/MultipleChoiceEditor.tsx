"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { RichTextEditor } from "../editor/RichTextEditor";

interface MultipleChoiceEditorProps {
  options: string[];
  correctAnswer?: string;
  onOptionsChange: (options: string[]) => void;
  onCorrectAnswerChange: (answer: string) => void;
}

export function MultipleChoiceEditor({
  options = [],
  correctAnswer,
  onOptionsChange,
  onCorrectAnswerChange,
}: MultipleChoiceEditorProps) {
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onOptionsChange(newOptions);
    
    if (correctAnswer === options[index]) {
      onCorrectAnswerChange("");
    }
  };

  const handleCorrectAnswerChange = (option: string) => {
    onCorrectAnswerChange(option === correctAnswer ? "" : option);
  };

  const addOption = () => {
    onOptionsChange([...options, ""]);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    onOptionsChange(newOptions);
    if (correctAnswer === options[index]) {
      onCorrectAnswerChange("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Add options and select the correct answer
        </div>
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

      {options.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          Click "Add Option" to start adding choices
        </div>
      ) : (
        <div className="space-y-4">
          {options.map((option, index) => {
            const isCorrect = correctAnswer === option;
            
            return (
              <div key={index} className="flex gap-4">
                <div className="flex items-start pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-6 w-6 p-0 rounded-full",
                      isCorrect 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-2 border-input hover:bg-muted"
                    )}
                    onClick={() => handleCorrectAnswerChange(option)}
                  >
                    {isCorrect && <Check className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex-1">
                  <RichTextEditor
                    value={option}
                    onChange={(value) => handleOptionChange(index, value)}
                    placeholder={`Option ${index + 1}`}
                    height="100px"
                    minimal={true}
                  />
                </div>
                {options.length > 2 && (
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
            );
          })}
        </div>
      )}
    </div>
  );
}
