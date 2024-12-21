"use client";

import { Label } from "@/components/ui/label";
import { AttachmentButton } from "./AttachmentButton";
import { FilePreview } from "./FilePreview";
import { attachmentTypes, AttachmentType } from "./attachment-types";
import { useToast } from "@/hooks/use-toast";

interface AttachmentSectionProps {
  onFileSelect: (file: File | null) => void;
  currentFile: File | null;
}

export function AttachmentSection({ onFileSelect, currentFile }: AttachmentSectionProps) {
  const { toast } = useToast();

  const handleAttachmentClick = (type: AttachmentType) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = attachmentTypes[type].accept;
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files?.length) {
        const file = files[0];
        if (attachmentTypes[type].mimeTypes.includes(file.type)) {
          if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast({
              title: "File too large",
              description: "Please select a file smaller than 5MB",
              variant: "destructive",
            });
            return;
          }
          onFileSelect(file);
        } else {
          toast({
            title: "Invalid file type",
            description: `Please select a valid ${attachmentTypes[type].label.toLowerCase()}`,
            variant: "destructive",
          });
        }
      }
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-muted-foreground">Attachments</Label>
        <div className="flex items-center gap-2">
          {(Object.keys(attachmentTypes) as AttachmentType[]).map((type) => (
            <AttachmentButton
              key={type}
              type={type}
              onClick={() => handleAttachmentClick(type)}
            />
          ))}
        </div>
      </div>

      {currentFile && (
        <FilePreview file={currentFile} onRemove={() => onFileSelect(null)} />
      )}
    </div>
  );
}
