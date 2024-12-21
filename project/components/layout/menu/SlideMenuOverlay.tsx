"use client";

import { motion } from "framer-motion";

interface SlideMenuOverlayProps {
  onClose: () => void;
}

export function SlideMenuOverlay({ onClose }: SlideMenuOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
    />
  );
}
