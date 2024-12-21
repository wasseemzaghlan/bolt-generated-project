"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Wifi, Brain, Coffee, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function ExamRequirements() {
  const requirements = [
    {
      icon: Laptop,
      title: "Device Requirements",
      items: [
        "Modern web browser (Chrome, Firefox, Safari, or Edge)",
        "Minimum screen resolution of 1280x720",
        "JavaScript enabled"
      ]
    },
    {
      icon: Wifi,
      title: "Internet Connection",
      items: [
        "Stable internet connection required",
        "Minimum 1 Mbps upload/download speed",
        "Backup connection recommended"
      ]
    },
    {
      icon: Brain,
      title: "Knowledge Prerequisites",
      items: [
        "Basic magical theory understanding",
        "Familiarity with standard spells",
        "Comprehension of magical ethics"
      ]
    },
    {
      icon: Coffee,
      title: "Environment",
      items: [
        "Quiet, distraction-free space",
        "Well-lit room",
        "Comfortable seating arrangement"
      ]
    }
  ];

  return (
    <>
      <AccordionTrigger className="hover:no-underline">
        <Card className="w-full border-none bg-gradient-to-br from-card via-card/50 to-background">
          <div className="flex items-center gap-4 p-4">
            <div className="p-3 rounded-full bg-primary/10">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-semibold">Requirements</h2>
              <p className="text-sm text-muted-foreground">
                Technical and Environmental Prerequisites
              </p>
            </div>
          </div>
        </Card>
      </AccordionTrigger>
      <AccordionContent>
        <Card className="border-none bg-gradient-to-br from-card/50 via-card/30 to-background mt-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {requirements.map((requirement, index) => (
                <motion.div
                  key={requirement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <requirement.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-medium">{requirement.title}</h3>
                  </div>
                  <ul className="space-y-2 ml-10">
                    {requirement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AccordionContent>
    </>
  );
}
