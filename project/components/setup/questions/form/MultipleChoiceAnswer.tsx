"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { RichTextEditor } from "../editor/RichTextEditor";
import { motion, AnimatePresence } from "framer-motion";

interface MultipleChoiceAnswerProps {
  options: string[];
  correctAnswer?: string;
  onOptionsChange: (options: string[]) => void;
  onCorrectAnswerChange: (answer: string) => void;
}

export function MultipleChoiceAnswer({
  options = [],
  correctAnswer,
  onOptionsChange,
  onCorrectAnswerChange,
}: MultipleChoiceAnswerProps) {
  const [focusedOption, setFocusedOption] = useState<number | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onOptionsChange(newOptions);
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
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Answer Options</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={addOption}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Option
          </Button>
        </div>

        <AnimatePresence>
          {options.map((option, index) => {
            const isCorrect = correctAnswer === option;
            const isFocused = focusedOption === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-4"
              >
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
                    {isCorrect ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex-1">
                  <Card className={cn(
                    "border transition-all duration-200",
                    isFocused && "ring-2 ring-primary",
                    isCorrect && "border-primary"
                  )}>
                    <RichTextEditor
                      value={option}
                      onChange={(value) => handleOptionChange(index, value)}
                      placeholder={`Option ${index + 1}`}
                      height="100px"
                      minimal={true}
                      onFocus={() => setFocusedOption(index)}
                      onBlur={() => setFocusedOption(null)}
                    />
                  </Card>
                </div>
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="self-start text-muted-foreground hover:text-destructive"
                    onClick={() => removeOption(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {options.length === 0 && (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
            Click "Add Option" to start adding answer choices
          </div>
        )}
      </div>
    </Card>
  );
}
