"use client";

import { RichTextEditor } from "../editor/RichTextEditor";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface DescriptiveAnswerProps {
  value: string;
  onChange: (value: string) => void;
}

export function DescriptiveAnswer({ value, onChange }: DescriptiveAnswerProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Model Answer</Label>
        <RichTextEditor
          value={value}
          onChange={onChange}
          placeholder="Enter a model answer for this question..."
          height="300px"
        />
        <p className="text-sm text-muted-foreground">
          This will serve as a reference for grading descriptive answers.
        </p>
      </div>
    </Card>
  );
}
