"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, FileImage, FilePdf, FileSpreadsheet, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilePreviewProps {
  file: File;
}

const FileTypes = {
  'application/pdf': {
    icon: FilePdf,
    color: "text-red-500",
    label: "PDF Document"
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    icon: File,
    color: "text-blue-500",
    label: "Word Document"
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    icon: FileSpreadsheet,
    color: "text-green-600",
    label: "Excel Spreadsheet"
  },
  'image/jpeg': {
    icon: FileImage,
    color: "text-purple-500",
    label: "Image"
  },
  'image/png': {
    icon: FileImage,
    color: "text-purple-500",
    label: "Image"
  },
  'image/gif': {
    icon: FileImage,
    color: "text-purple-500",
    label: "Animated Image"
  },
  'image/webp': {
    icon: FileImage,
    color: "text-purple-500",
    label: "Image"
  }
} as const;

export function FilePreview({ file }: FilePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string>("");

  const fileType = FileTypes[file.type as keyof typeof FileTypes] || {
    icon: File,
    color: "text-gray-500",
    label: "File"
  };

  const handlePreview = () => {
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    setIsOpen(true);
  };

  const handleClose = () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl("");
    }
    setIsOpen(false);
  };

  const FileIcon = fileType.icon;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePreview}
        className="w-full flex items-center gap-2 bg-primary/5 hover:bg-primary/10"
      >
        <Eye className="h-4 w-4 text-primary" />
        <FileIcon className={cn("h-4 w-4", fileType.color)} />
        <span className="flex-1 text-left truncate">{file.name}</span>
        <span className="text-xs text-muted-foreground">{fileType.label}</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <FileIcon className={cn("h-4 w-4", fileType.color)} />
              <DialogTitle className="truncate">
                {file.name}
                <span className="ml-2 text-xs text-muted-foreground">
                  ({fileType.label})
                </span>
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="flex-1 w-full h-full min-h-0 bg-muted/30 rounded-lg overflow-hidden">
            {file.type.startsWith("image/") ? (
              <img
                src={objectUrl}
                alt={file.name}
                className="w-full h-full object-contain"
              />
            ) : file.type === "application/pdf" ? (
              <iframe
                src={objectUrl}
                className="w-full h-full"
                title={file.name}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
                <FileIcon className={cn("h-16 w-16 opacity-50", fileType.color)} />
                <p>Preview not available for this file type.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
