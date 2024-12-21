"use client";

import { Button } from "@/components/ui/button";
import { FileImage, FilePdf, FileSpreadsheet, File, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

const FileTypes = {
  'application/pdf': {
    icon: FilePdf,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    label: "PDF Document"
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    icon: FileSpreadsheet,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    label: "Excel Spreadsheet"
  },
  'image/jpeg': {
    icon: FileImage,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    label: "Image"
  },
  'image/png': {
    icon: FileImage,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    label: "Image"
  },
  'image/gif': {
    icon: FileImage,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    label: "Animated Image"
  },
  'image/webp': {
    icon: FileImage,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    label: "Image"
  }
} as const;

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const fileType = FileTypes[file.type as keyof typeof FileTypes] || {
    icon: File,
    color: "text-gray-500",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    label: "File"
  };

  const FileIcon = fileType.icon;
  const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg border",
      "transition-colors duration-200",
      fileType.bgColor,
      "hover:bg-accent/5"
    )}>
      <div className={cn(
        "p-2 rounded-lg",
        fileType.bgColor
      )}>
        <FileIcon className={cn("h-4 w-4", fileType.color)} />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="secondary" className="text-[10px]">
            {fileType.label}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {fileSizeInMB} MB
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
