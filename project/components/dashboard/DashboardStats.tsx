"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  Award, 
  Clock, 
  BookOpen,
  TrendingUp
} from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      title: "Total Exams",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Completed",
      value: "18",
      change: "+8%",
      trend: "up",
      icon: Award,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Average Score",
      value: "85%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Study Time",
      value: "48h",
      change: "+15%",
      trend: "up",
      icon: Clock,
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="p-6 z-10 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}
              />
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
