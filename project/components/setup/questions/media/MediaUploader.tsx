"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuestionMedia } from "@/types/exam";
import { FilePdf, Image, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaUploaderProps {
  media: QuestionMedia[];
  onUpdate: (media: QuestionMedia[]) => void;
}

const ACCEPTED_TYPES = {
  pdf: '.pdf',
  image: '.jpg,.jpeg,.png,.gif,.webp'
} as const;

export function MediaUploader({ media, onUpdate }: MediaUploaderProps) {
  const [activeType, setActiveType] = useState<keyof typeof ACCEPTED_TYPES>('image');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64 for demo
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const newMedia: QuestionMedia = {
        type: activeType,
        url: result,
        title: file.name,
      };
      onUpdate([...media, newMedia]);
    };
    reader.readAsDataURL(file);
  };

  const removeMedia = (index: number) => {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    onUpdate(newMedia);
  };

  const MediaTypeIcon = {
    pdf: FilePdf,
    image: Image
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(ACCEPTED_TYPES) as Array<keyof typeof ACCEPTED_TYPES>).map((type) => (
          <Button
            key={type}
            variant={activeType === type ? "default" : "outline"}
            onClick={() => setActiveType(type)}
            className="flex items-center gap-2"
          >
            {MediaTypeIcon[type] && <MediaTypeIcon[type] className="h-4 w-4" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <Input
          type="file"
          accept={ACCEPTED_TYPES[activeType]}
          onChange={handleFileChange}
          className="cursor-pointer"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {media.map((item, index) => (
            <div
              key={index}
              className="relative group border rounded-lg p-4 hover:bg-accent/50"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeMedia(index)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  item.type === 'pdf' && "bg-red-100 dark:bg-red-900",
                  item.type === 'image' && "bg-purple-100 dark:bg-purple-900"
                )}>
                  {MediaTypeIcon[item.type] && (
                    <MediaTypeIcon[item.type] className={cn(
                      "h-5 w-5",
                      item.type === 'pdf' && "text-red-600 dark:text-red-400",
                      item.type === 'image' && "text-purple-600 dark:text-purple-400"
                    )} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Type: {item.type}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
