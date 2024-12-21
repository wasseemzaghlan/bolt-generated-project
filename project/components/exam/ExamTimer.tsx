"use client";

import { useEffect, useState } from "react";
import { Timer, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface ExamTimerProps {
  durationInMinutes: number;
  onTimeUp: () => void;
}

export function ExamTimer({ durationInMinutes, onTimeUp }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60);
  const [isWarning, setIsWarning] = useState(false);

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

  useEffect(() => {
    if (timeLeft <= 300 && !isWarning) { // 5 minutes warning
      setIsWarning(true);
    }
  }, [timeLeft, isWarning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-2">
      <div className={cn(
        "flex items-center gap-2 text-lg font-semibold",
        isWarning && "text-destructive animate-pulse"
      )}>
        <Timer className="h-5 w-5" />
        <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
      </div>
      {isWarning && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Less than 5 minutes remaining!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
