"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MenuIcon, X, Lock, Unlock } from "lucide-react";
import { useMenu } from "@/hooks/use-menu";
import { SlideMenuContent } from "./menu/SlideMenuContent";
import { SlideMenuOverlay } from "./menu/SlideMenuOverlay";

export function SlideMenu() {
  const { isOpen, isLocked, setIsOpen, toggleLock } = useMenu();

  return (
    <>
      {!isLocked && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setIsOpen(true)}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      )}

      <AnimatePresence>
        {(isOpen || isLocked) && (
          <>
            {!isLocked && <SlideMenuOverlay onClose={() => setIsOpen(false)} />}
            
            <motion.div
              initial={isLocked ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={isLocked ? false : { x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className={cn(
                "fixed top-0 left-0 z-50 h-full w-80",
                "bg-background/80 backdrop-blur-xl",
                "border-r shadow-lg",
                isLocked && "relative"
              )}
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleLock}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isLocked ? (
                    <Unlock className="h-5 w-5" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </Button>
                {!isLocked && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>

              <SlideMenuContent onClose={() => !isLocked && setIsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
