"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AttachmentUploaderProps {
  onFileSelect: (file: File | null) => void;
  currentFile?: File | null;
}

export function AttachmentUploader({ onFileSelect, currentFile }: AttachmentUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        accept=".pdf,image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Attach file</p>
        </TooltipContent>
      </Tooltip>

      {currentFile && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => onFileSelect(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove {currentFile.name}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
