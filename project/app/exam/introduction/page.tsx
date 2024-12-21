"use client";

import { ExamHeader } from "@/components/exam/introduction/ExamHeader";
import { ExamIntroduction } from "@/components/exam/introduction/ExamIntroduction";
import { ExamInstructions } from "@/components/exam/introduction/ExamInstructions";
import { ExamRequirements } from "@/components/exam/introduction/ExamRequirements";
import { ExamNotes } from "@/components/exam/introduction/ExamNotes";
import { StartExamButton } from "@/components/exam/introduction/StartExamButton";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ExamIntroductionPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background">
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <ExamHeader />
          
          <Accordion type="single" collapsible defaultValue="overview" className="space-y-4">
            <AccordionItem value="overview" className="border-none">
              <ExamIntroduction />
            </AccordionItem>

            <AccordionItem value="instructions" className="border-none">
              <ExamInstructions />
            </AccordionItem>

            <AccordionItem value="requirements" className="border-none">
              <ExamRequirements />
            </AccordionItem>

            <AccordionItem value="notes" className="border-none">
              <ExamNotes />
            </AccordionItem>
          </Accordion>

          <StartExamButton />
        </motion.div>
      </div>
    </div>
  );
}
