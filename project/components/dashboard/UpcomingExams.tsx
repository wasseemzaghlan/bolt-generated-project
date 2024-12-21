"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function UpcomingExams() {
  const router = useRouter();
  const upcomingExams = [
    {
      title: "Advanced Wizardry",
      date: "Tomorrow, 10:00 AM",
      duration: "60 min",
      status: "Ready"
    },
    {
      title: "Magical Ethics",
      date: "Next Week",
      duration: "90 min",
      status: "Scheduled"
    },
    {
      title: "Spell Creation",
      date: "In 2 Weeks",
      duration: "120 min",
      status: "Scheduled"
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">Upcoming Exams</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push("/exam/introduction")}
        >
          Start New
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {upcomingExams.map((exam, index) => (
              <motion.div
                key={exam.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{exam.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{exam.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{exam.duration}</Badge>
                    <Badge variant="secondary">{exam.status}</Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
