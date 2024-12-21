"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface QuestionHintSectionProps {
  hint: string;
}

export function QuestionHintSection({ hint }: QuestionHintSectionProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <Label className="text-lg font-semibold">Hint</Label>
      </CardHeader>
      <CardContent>
        <Textarea
          value={hint}
          readOnly
          className="min-h-[100px] bg-muted font-light resize-none"
        />
      </CardContent>
    </Card>
  );
}
