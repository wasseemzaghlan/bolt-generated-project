"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  History,
  Calendar,
  Award,
  Globe,
  School
} from "lucide-react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentExams } from "@/components/dashboard/RecentExams";
import { UpcomingExams } from "@/components/dashboard/UpcomingExams";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold">Welcome to Wizardry Academy</h1>
            <p className="text-xl text-muted-foreground">
              Your magical journey to knowledge and certification begins here
            </p>
          </motion.div>

          {/* Stats Overview */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RecentExams />
            <UpcomingExams />
          </div>

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
