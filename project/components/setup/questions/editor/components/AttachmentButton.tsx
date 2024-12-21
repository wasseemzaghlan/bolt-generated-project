"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { attachmentTypes, AttachmentType } from "./attachment-types";

interface AttachmentButtonProps {
  type: AttachmentType;
  onClick: () => void;
  className?: string;
}

export function AttachmentButton({ type, onClick, className }: AttachmentButtonProps) {
  const config = attachmentTypes[type];
  const Icon = config.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onClick}
          className={cn(
            "h-8 w-8 bg-primary/5 hover:bg-primary/10 text-primary",
            className
          )}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{config.label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
