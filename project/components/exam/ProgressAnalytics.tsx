"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, CheckCircle2, Timer, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface ProgressAnalyticsProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number[];
  onTimeUp: () => void;
}

export function ProgressAnalytics({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  onTimeUp,
}: ProgressAnalyticsProps) {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const progress = (answeredQuestions.length / totalQuestions) * 100;
  const remainingQuestions = totalQuestions - answeredQuestions.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const stats = [
    {
      icon: Brain,
      label: "Current Progress",
      value: `${currentQuestion + 1} of ${totalQuestions}`,
      color: "from-violet-500 to-purple-600",
      bgColor: "from-violet-50 to-purple-50/30",
      borderColor: "border-violet-100",
      progressColor: "from-violet-500 via-purple-500 to-fuchsia-500",
      progress: (currentQuestion + 1) / totalQuestions * 100,
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: `${answeredQuestions.length} Questions`,
      color: "from-emerald-500 to-green-600",
      bgColor: "from-emerald-50 to-green-50/30",
      borderColor: "border-emerald-100",
      progressColor: "from-emerald-500 via-green-500 to-teal-500",
      progress: progress,
    },
    {
      icon: AlertTriangle,
      label: "Remaining",
      value: `${remainingQuestions} Questions`,
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-50 to-orange-50/30",
      borderColor: "border-amber-100",
      progressColor: "from-amber-500 via-orange-500 to-yellow-500",
      progress: (remainingQuestions / totalQuestions) * 100,
    },
    {
      icon: Timer,
      label: "Time Remaining",
      value: formatTime(timeLeft),
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50/30",
      borderColor: "border-blue-100",
      progressColor: "from-blue-500 via-cyan-500 to-sky-500",
      progress: (timeLeft / (60 * 60)) * 100,
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="h-full"
        >
          <Card className={cn(
            "relative overflow-hidden border h-full",
            stat.borderColor,
            "bg-gradient-to-br",
            stat.bgColor,
            "hover:shadow-lg transition-all duration-300 group"
          )}>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2.5 rounded-xl bg-gradient-to-br shadow-sm transition-transform duration-300 group-hover:scale-110",
                  stat.color
                )}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <div className="min-h-[40px] flex flex-col justify-center">
                  <p className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-sm font-semibold mt-0.5">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-secondary/30">
              <motion.div
                className={cn(
                  "h-full bg-gradient-to-r rounded-full",
                  stat.progressColor
                )}
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                 style={{
                   backgroundImage: `linear-gradient(to bottom right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`
                 }} 
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
