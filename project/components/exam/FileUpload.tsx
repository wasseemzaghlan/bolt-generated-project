"use client";

import { Upload, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  className?: string;
  maxFiles?: number;
  currentFiles?: File[];
}

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function FileUpload({ onFileSelect, className, maxFiles = 3, currentFiles = [] }: FileUploadProps) {
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError("");

    if (files.length + currentFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} files`);
      return;
    }

    const invalidFiles = files.filter(file => !ALLOWED_FILE_TYPES.includes(file.type));
    if (invalidFiles.length > 0) {
      setError("Invalid file type. Please upload PDF, DOCX, XLSX, or image files.");
      return;
    }

    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      setError("One or more files exceed the 5MB size limit.");
      return;
    }

    onFileSelect([...currentFiles, ...files]);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = currentFiles.filter(file => file !== fileToRemove);
    onFileSelect(updatedFiles);
  };

  const getFileTypeLabel = () => {
    return "Supported formats: PDF, DOCX, XLSX, Images (JPG, PNG, GIF, WebP)";
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col gap-2">
        <Input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          accept={ALLOWED_FILE_TYPES.join(",")}
          multiple
        />
        {currentFiles.length < maxFiles && (
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 bg-primary/5 hover:bg-primary/10"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="h-4 w-4" />
            <span>Upload Files ({currentFiles.length}/{maxFiles})</span>
          </Button>
        )}
        <p className="text-xs text-muted-foreground">
          {getFileTypeLabel()}
        </p>
      </div>

      {currentFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {currentFiles.map((file, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-2 py-1.5"
            >
              <span className="truncate max-w-[200px]">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemoveFile(file)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
