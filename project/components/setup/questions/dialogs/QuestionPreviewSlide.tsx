"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Question } from "@/types/exam";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { 
  FileText, 
  MessageSquare,
  ListChecks,
  ChevronRight,
  ChevronDown,
  Paperclip,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface QuestionPreviewSlideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
}

export function QuestionPreviewSlide({
  open,
  onOpenChange,
  question
}: QuestionPreviewSlideProps) {
  const [openSections, setOpenSections] = useState<string[]>(["question", "answer"]);

  if (!question) return null;

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections = [
    {
      id: "question",
      title: "Question Details",
      icon: FileText,
      isOpen: openSections.includes("question"),
      onClick: () => toggleSection("question"),
    },
    {
      id: "answer",
      title: "Answer Details",
      icon: MessageSquare,
      isOpen: openSections.includes("answer"),
      onClick: () => toggleSection("answer"),
    },
  ];

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'true-false':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'descriptive':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'complex':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[800px] p-0 flex flex-row">
        {/* Navigation Sidebar */}
        <div className="w-64 border-r bg-card/50 backdrop-blur-sm h-full">
          <div className="p-4 border-b">
            <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
              Question Sections
            </h3>
          </div>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            <div className="p-4 space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  onClick={section.onClick}
                  className={cn(
                    "w-full justify-start gap-2 font-normal",
                    section.isOpen && "bg-accent text-accent-foreground"
                  )}
                >
                  <section.icon className="h-4 w-4" />
                  <span>{section.title}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 ml-auto transition-transform",
                      section.isOpen && "rotate-90"
                    )}
                  />
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-medium">Question Preview</SheetTitle>
              <Badge variant="outline" className={getQuestionTypeColor(question.type)}>
                {question.type}
              </Badge>
            </div>
          </SheetHeader>
          
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Question Details Section */}
              {openSections.includes("question") && (
                <Card className="shadow-lg">
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-[1fr,200px] gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-normal text-muted-foreground">
                          Question Text
                        </Label>
                        <div className="min-h-[100px] p-4 rounded-lg border bg-muted/30">
                          <div className="prose dark:prose-invert text-sm">
                            {question.richText || question.text}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-normal text-muted-foreground">
                            Points
                          </Label>
                          <Input 
                            value={question.points} 
                            readOnly 
                            className="bg-muted font-light text-sm"
                          />
                        </div>

                        {question.image && (
                          <div className="space-y-2">
                            <Label className="text-sm font-normal text-muted-foreground">
                              Attachment
                            </Label>
                            <div className="flex items-center gap-2 p-2 rounded-lg border bg-muted/30">
                              <Paperclip className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Image attached</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Answer Details Section */}
              {openSections.includes("answer") && (
                <Card className="shadow-lg">
                  <div className="p-6 space-y-6">
                    {question.type === 'multiple-choice' && question.options && (
                      <div className="space-y-4">
                        <Label className="text-sm font-normal text-muted-foreground">
                          Answer Options
                        </Label>
                        <div className="space-y-3">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={cn(
                                "p-4 rounded-lg border bg-muted/30",
                                option === question.correctAnswer && "border-primary bg-primary/5"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm">
                                  {option === question.correctAnswer && (
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                  )}
                                  <span>{option}</span>
                                </span>
                                {option === question.correctAnswer && (
                                  <Badge variant="default" className="text-xs">
                                    Correct Answer
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {question.type === 'true-false' && (
                      <div className="space-y-4">
                        <Label className="text-sm font-normal text-muted-foreground">
                          Correct Answer
                        </Label>
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "p-4 rounded-lg border flex-1 text-center bg-muted/30",
                              question.correctAnswer === true && "border-primary bg-primary/5"
                            )}
                          >
                            <div className="flex items-center justify-center gap-2 text-sm">
                              {question.correctAnswer === true && (
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              )}
                              <span>True</span>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "p-4 rounded-lg border flex-1 text-center bg-muted/30",
                              question.correctAnswer === false && "border-primary bg-primary/5"
                            )}
                          >
                            <div className="flex items-center justify-center gap-2 text-sm">
                              {question.correctAnswer === false && (
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              )}
                              <span>False</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {question.type === 'descriptive' && question.defaultAnswer && (
                      <div className="space-y-4">
                        <Label className="text-sm font-normal text-muted-foreground">
                          Model Answer
                        </Label>
                        <Textarea
                          value={question.defaultAnswer}
                          readOnly
                          className="min-h-[200px] bg-muted font-light text-sm resize-none"
                        />
                      </div>
                    )}

                    {question.hint && (
                      <div className="space-y-4 pt-6 border-t">
                        <Label className="text-sm font-normal text-muted-foreground">
                          Hint
                        </Label>
                        <Textarea
                          value={question.hint}
                          readOnly
                          className="min-h-[100px] bg-muted font-light text-sm resize-none"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
