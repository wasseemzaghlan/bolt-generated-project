"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function StartExamButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartExam = async () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/exam");
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex justify-center"
    >
      <Button
        size="lg"
        onClick={handleStartExam}
        disabled={isLoading}
        className="px-8 py-6 text-lg font-medium"
      >
        {isLoading ? (
          <LoadingSpinner size="sm" className="mr-2" />
        ) : (
          <PlayCircle className="mr-2 h-5 w-5" />
        )}
        Start Exam
      </Button>
    </motion.div>
  );
}
