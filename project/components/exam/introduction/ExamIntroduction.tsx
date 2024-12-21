"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function ExamIntroduction() {
  return (
    <>
      <AccordionTrigger className="hover:no-underline">
        <Card className="w-full border-none bg-gradient-to-br from-card via-card/50 to-background">
          <div className="flex items-center gap-4 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <div className="p-3 rounded-full bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
            </motion.div>
            <div className="text-left">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="text-sm text-muted-foreground">
                Advanced Wizardry Certification Details
              </p>
            </div>
          </div>
        </Card>
      </AccordionTrigger>
      <AccordionContent>
        <Card className="border-none bg-gradient-to-br from-card/50 via-card/30 to-background mt-2">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Advanced Wizardry Certification</h3>
              <p className="text-muted-foreground text-lg">
                Master the Art of Advanced Magical Theory and Practice
              </p>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                Welcome to the Advanced Wizardry Certification exam. This comprehensive assessment will
                evaluate your understanding of advanced magical concepts, practical applications, and
                theoretical knowledge.
              </p>
            </div>
          </CardContent>
        </Card>
      </AccordionContent>
    </>
  );
}
