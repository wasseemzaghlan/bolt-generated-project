"use client";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LoadingProvider>
        {children}
        <Toaster />
      </LoadingProvider>
    </ThemeProvider>
  );
}
