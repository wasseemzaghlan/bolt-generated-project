"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExamCategoryFieldsProps {
  program: string;
  subject: string;
  provider: string;
  onChange: (field: string, value: string) => void;
}

export function ExamCategoryFields({
  program,
  subject,
  provider,
  onChange,
}: ExamCategoryFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Program</Label>
        <Select
          value={program}
          onValueChange={(value) => onChange("program", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arcane">Arcane Studies</SelectItem>
            <SelectItem value="potions">Potions Mastery</SelectItem>
            <SelectItem value="defense">Defense Arts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Subject</Label>
        <Select
          value={subject}
          onValueChange={(value) => onChange("subject", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spells">Advanced Spellcasting</SelectItem>
            <SelectItem value="theory">Magical Theory</SelectItem>
            <SelectItem value="potions">Advanced Brewing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Provider</Label>
        <Select
          value={provider}
          onValueChange={(value) => onChange("provider", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="academy">Magical Academy</SelectItem>
            <SelectItem value="institute">Wizarding Institute</SelectItem>
            <SelectItem value="school">Sorcery School</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
