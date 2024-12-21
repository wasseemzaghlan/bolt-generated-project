"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SyncfusionEditor } from "../editor/SyncfusionEditor";
import { QuestionTypeSelect } from "./QuestionTypeSelect";
import { QuestionAnswerField } from "./QuestionAnswerField";

interface QuestionFormProps {
  form: ReturnType<typeof import("./useQuestionForm").useQuestionForm>;
}

export function QuestionForm({ form }: QuestionFormProps) {
  const { formData, updateFormData, handleTypeChange } = form;

  return (
    <>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Question Text</Label>
            <SyncfusionEditor
              value={formData.richText}
              onChange={(value) => updateFormData({ richText: value })}
              placeholder="Enter your question here..."
              height="200px"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <QuestionTypeSelect
              value={formData.type}
              onChange={handleTypeChange}
            />

            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={formData.points}
                onChange={(e) => updateFormData({ points: e.target.value })}
                required
              />
            </div>
          </div>
        </div>
      </Card>

      <QuestionAnswerField form={form} />

      <Card className="p-6">
        <div className="space-y-2">
          <Label>Hint (Optional)</Label>
          <SyncfusionEditor
            value={formData.hintRichText}
            onChange={(value) => 
              updateFormData({ hintRichText: value })
            }
            placeholder="Enter a hint for this question..."
            height="100px"
            minimal={true}
          />
        </div>
      </Card>
    </>
  );
}
