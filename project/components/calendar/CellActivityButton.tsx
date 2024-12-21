"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CellActivityButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export function CellActivityButton({ onClick, className }: CellActivityButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(e);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 rounded-full",
              "bg-primary/10 hover:bg-primary/20",
              "text-primary hover:text-primary",
              className
            )}
            onClick={handleClick}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add new activity</p>
      </TooltipContent>
    </Tooltip>
  );
}
