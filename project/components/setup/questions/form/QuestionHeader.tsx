"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "../editor/RichTextEditor";
import { QuestionTypeSelector } from "./QuestionTypeSelector";
import { QuestionType } from "@/types/exam";
import { AttachmentUploader } from "./AttachmentUploader";

interface QuestionHeaderProps {
  type: QuestionType;
  points: string;
  richText: string;
  attachment: File | null;
  onTypeChange: (type: QuestionType) => void;
  onPointsChange: (points: string) => void;
  onRichTextChange: (text: string) => void;
  onAttachmentChange: (file: File | null) => void;
}

export function QuestionHeader({
  type,
  points,
  richText,
  attachment,
  onTypeChange,
  onPointsChange,
  onRichTextChange,
  onAttachmentChange,
}: QuestionHeaderProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-[1fr,200px,200px] gap-4">
          <div className="space-y-2">
            <Label>Question Text</Label>
            <RichTextEditor
              value={richText}
              onChange={onRichTextChange}
              placeholder="Enter your question here..."
            />
          </div>

          <div className="space-y-4">
            <QuestionTypeSelector 
              value={type}
              onChange={onTypeChange}
            />

            <div className="space-y-2">
              <Label>Points</Label>
              <Input
                type="number"
                min="1"
                value={points}
                onChange={(e) => onPointsChange(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Attachment</Label>
            <AttachmentUploader
              onFileSelect={onAttachmentChange}
              currentFile={attachment}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
