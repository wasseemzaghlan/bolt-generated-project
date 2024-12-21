"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2, Calendar, BookOpen, ChevronDown, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function ExamHeader() {
  const examInfo = {
    subject: "Advanced Wizardry",
    program: "Arcane Studies",
    provider: "Magical Academy",
    examName: "Mastery Certification",
    year: 2024,
    date: new Date(), // Current date for demo
    duration: 60, // Duration in minutes
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-x-0 -top-12 h-48 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent -z-10 rounded-3xl blur-2xl"
      />
      
      <Card className="border-none bg-gradient-to-br from-card/90 via-card/50 to-background/90 backdrop-blur-sm">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left side - Main exam info */}
            <motion.div {...fadeInUp} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary" className="font-medium">
                  {examInfo.year}
                </Badge>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  {examInfo.examName}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {examInfo.subject}
                </p>
              </div>
            </motion.div>

            {/* Right side - Additional info */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Provider</span>
                </div>
                <p className="font-medium">{examInfo.provider}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium">Program</span>
                </div>
                <p className="font-medium">{examInfo.program}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Date</span>
                </div>
                <p className="font-medium">{format(examInfo.date, 'PPP')}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <p className="font-medium">{examInfo.duration} minutes</p>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
          </motion.div>
        </div>
      </Card>
    </div>
  );
}
