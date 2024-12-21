"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function RecentExams() {
  const router = useRouter();
  const recentExams = [
    {
      title: "Advanced Transfiguration",
      date: "2 days ago",
      score: 92,
      status: "Completed"
    },
    {
      title: "Magical Theory",
      date: "1 week ago",
      score: 88,
      status: "Completed"
    },
    {
      title: "Potions Mastery",
      date: "2 weeks ago",
      score: 95,
      status: "Completed"
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">Recent Exams</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => router.push("/exam/history")}
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {recentExams.map((exam, index) => (
              <motion.div
                key={exam.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{exam.title}</p>
                    <p className="text-sm text-muted-foreground">{exam.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="font-semibold">
                      {exam.score}%
                    </Badge>
                    <Badge>{exam.status}</Badge>
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
