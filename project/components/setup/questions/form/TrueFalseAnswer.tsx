"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TrueFalseAnswerProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

export function TrueFalseAnswer({ value, onChange }: TrueFalseAnswerProps) {
  const options = [
    { value: true, label: "True" },
    { value: false, label: "False" }
  ];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Correct Answer</Label>
        
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = value === option.value;
            
            return (
              <motion.div
                key={option.label}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start gap-3 py-6",
                    isSelected && "border-primary ring-2 ring-primary ring-offset-2"
                  )}
                  onClick={() => onChange(option.value)}
                >
                  <div className={cn(
                    "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    isSelected 
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground"
                  )}>
                    {isSelected ? <Check className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Select the correct answer for this True/False question
        </p>
      </div>
    </Card>
  );
}
