"use client";

import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useLoading } from "@/hooks/use-loading";

export function ViewHistoryButton() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setLoading } = useLoading();

  const handleViewHistory = async () => {
    setIsTransitioning(true);
    setLoading(true, 'Loading exam history...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push("/exam/history");
    } catch (error) {
      setIsTransitioning(false);
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleViewHistory}
      disabled={isTransitioning}
      className="w-full h-16 text-lg relative"
      size="lg"
    >
      {isTransitioning ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          <span>Loading History</span>
        </>
      ) : (
        <>
          <History className="mr-2 h-6 w-6" />
          <span>View Exam History</span>
        </>
      )}

      {isTransitioning && (
        <motion.div
          className="absolute inset-0 bg-primary/5 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Button>
  );
}
