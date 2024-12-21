"use client";

import { Question } from "@/types/exam";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useEffect } from "react";

interface QuestionCardProps {
  question: Question;
  currentQuestion: number;
}

export function QuestionCard({ question, currentQuestion }: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Reset isOpen to true whenever the question changes
  useEffect(() => {
    setIsOpen(true);
  }, [question.id]);

  return (
    <Card className="border shadow-sm overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full hover:no-underline">
          <motion.div 
            className="flex flex-col items-start gap-2 w-full p-6 hover:bg-muted/5 transition-colors"
            initial={{ backgroundColor: "rgba(var(--primary), 0.1)" }}
            animate={{ backgroundColor: "transparent" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/5">
                Question {currentQuestion + 1}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                {question.points} points
              </Badge>
            </div>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-xl font-semibold leading-tight text-left">
                {question.text}
              </h3>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isOpen ? 0 : -90 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
              </motion.div>
            </div>
          </motion.div>
        </CollapsibleTrigger>
        <AnimatePresence>
          {isOpen && (
            <CollapsibleContent forceMount>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                {question.image && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative w-full h-48 md:h-64 overflow-hidden rounded-lg mb-4"
                  >
                    <Image
                      src={question.image.url}
                      alt={question.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-sm text-muted-foreground"
                >
                  Type: {question.type === "true-false" ? "True/False" : question.type === "multiple-choice" ? "Multiple Choice" : "Descriptive"}
                </motion.div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>
    </Card>
  );
}
