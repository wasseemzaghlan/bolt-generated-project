"use client";

import { createContext, useContext, useState } from "react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean, message?: string) => void;
  message: string;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const setLoading = (loading: boolean, msg: string = "Loading...") => {
    setIsLoading(loading);
    setMessage(msg);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, message }}>
      {isLoading && <LoadingOverlay message={message} />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
