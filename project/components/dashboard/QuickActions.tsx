"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  FileQuestion,
  Globe,
  School,
  Settings,
  BookOpen
} from "lucide-react";

export function QuickActions() {
  const router = useRouter();
  
  const actions = [
    {
      title: "Start Exam",
      description: "Begin a new certification exam",
      icon: GraduationCap,
      path: "/exam/introduction",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Questions",
      description: "Manage exam questions",
      icon: FileQuestion,
      path: "/setup/questions",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Regions",
      description: "Configure regional settings",
      icon: Globe,
      path: "/setup/regions",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Study Materials",
      description: "Access learning resources",
      icon: BookOpen,
      path: "/study",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => router.push(action.path)}>
              <div className="p-6 z-10 relative">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white 
                               mb-4 inline-block transition-transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 
                             group-hover:opacity-5 transition-opacity`} />
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
