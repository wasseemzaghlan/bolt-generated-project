"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SlideMenu } from "@/components/layout/SlideMenu";
import { Toolbar } from "@/components/layout/Toolbar";
import { useMenu } from "@/hooks/use-menu";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const { isLocked } = useMenu();
  const router = useRouter();
  const pathname = usePathname();

  // Ensure we're on the home page when the app loads
  useEffect(() => {
    if (pathname === '/') {
      router.refresh();
    }
  }, [pathname, router]);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen">
        <SlideMenu />
        <div className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isLocked && "pl-80"
        )}>
          <Toolbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
