"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Question } from "@/types/exam";

interface QuestionCardProps {
  question: Question;
  isSelected: boolean;
  onSelect: () => void;
}

export function QuestionCard({ question, isSelected, onSelect }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={cn(
          "p-4 cursor-pointer transition-colors hover:bg-muted/50",
          isSelected && "bg-muted"
        )}
        onClick={onSelect}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{question.type}</Badge>
            <Badge>{question.points} points</Badge>
          </div>
          <p className="line-clamp-2">{question.text}</p>
        </div>
      </Card>
    </motion.div>
  );
}
