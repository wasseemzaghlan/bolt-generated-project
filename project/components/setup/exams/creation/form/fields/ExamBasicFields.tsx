"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ExamBasicFieldsProps {
  title: string;
  reference: string;
  year: number;
  duration: number;
  onChange: (field: string, value: any) => void;
}

export function ExamBasicFields({
  title,
  reference,
  year,
  duration,
  onChange,
}: ExamBasicFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Enter exam title"
        />
      </div>

      <div className="space-y-2">
        <Label>Reference</Label>
        <Input
          value={reference}
          onChange={(e) => onChange("reference", e.target.value)}
          placeholder="Enter exam reference"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Year</Label>
          <Input
            type="number"
            value={year}
            onChange={(e) => onChange("year", parseInt(e.target.value))}
            min={2000}
          />
        </div>

        <div className="space-y-2">
          <Label>Duration (minutes)</Label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => onChange("duration", parseInt(e.target.value))}
            min="1"
          />
        </div>
      </div>
    </div>
  );
}
