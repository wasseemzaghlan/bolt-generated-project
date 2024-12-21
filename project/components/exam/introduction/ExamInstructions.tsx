"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, FileText, AlertCircle, CheckCircle2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function ExamInstructions() {
  const instructions = [
    {
      icon: Clock,
      title: "Time Limit",
      description: "You have 60 minutes to complete the exam. A timer will be displayed to help you manage your time."
    },
    {
      icon: FileText,
      title: "Question Format",
      description: "The exam consists of multiple-choice, true/false, and descriptive questions. Each question is clearly marked with its point value."
    },
    {
      icon: AlertCircle,
      title: "File Attachments",
      description: "Some questions allow file attachments. Supported formats include PDF, DOCX, and images."
    },
    {
      icon: CheckCircle2,
      title: "Submission",
      description: "You can review your answers before final submission. Ensure all questions are answered to complete the exam."
    }
  ];

  return (
    <>
      <AccordionTrigger className="hover:no-underline">
        <Card className="w-full border-none bg-gradient-to-br from-card via-card/50 to-background">
          <div className="flex items-center gap-4 p-4">
            <div className="p-3 rounded-full bg-primary/10">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-semibold">Instructions</h2>
              <p className="text-sm text-muted-foreground">
                Important Guidelines for the Exam
              </p>
            </div>
          </div>
        </Card>
      </AccordionTrigger>
      <AccordionContent>
        <Card className="border-none bg-gradient-to-br from-card/50 via-card/30 to-background mt-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {instructions.map((instruction, index) => (
                <motion.div
                  key={instruction.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <instruction.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{instruction.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {instruction.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AccordionContent>
    </>
  );
}
