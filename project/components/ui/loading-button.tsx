"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@radix-ui/react-button";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LoadingButton({
  loading,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      className={cn("relative", className)}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-md">
          <LoadingSpinner size="sm" />
        </div>
      )}
      <span className={cn(loading && "invisible")}>{children}</span>
    </Button>
  );
}
