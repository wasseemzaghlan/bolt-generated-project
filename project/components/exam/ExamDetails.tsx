"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Building2, Calendar, BookOpen, Clock } from "lucide-react";
import { format } from "date-fns";

interface ExamDetailsProps {
  subject: string;
  year: number;
  examName: string;
  provider: string;
  program: string;
  date?: Date;
  duration?: number;
}

export function ExamDetails({
  subject,
  year,
  examName,
  provider,
  program,
  date = new Date(),
  duration = 60
}: ExamDetailsProps) {
  const details = [
    { icon: BookOpen, label: "Subject", value: subject },
    { icon: Calendar, label: "Date", value: format(date, 'PPP') },
    { icon: Clock, label: "Duration", value: `${duration} minutes` },
    { icon: Building2, label: "Provider", value: provider },
    { icon: GraduationCap, label: "Program", value: program },
  ];

  return (
    <Card className="p-4 border-none bg-gradient-to-br from-green-50/50 to-green-100/30">
      <div className="space-y-3">
        <h2 className="font-semibold text-lg text-primary">{examName}</h2>
        <div className="grid grid-cols-1 gap-3">
          {details.map(({ icon: Icon, label, value }, index) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
