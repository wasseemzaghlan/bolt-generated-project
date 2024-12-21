"use client";

import { CustomCheckbox } from "@/components/ui/custom-checkbox";

interface TableCheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
}

export function TableCheckbox({ 
  checked, 
  indeterminate, 
  onCheckedChange, 
  label 
}: TableCheckboxProps) {
  return (
    <div className="flex items-center justify-center">
      <CustomCheckbox
        checked={checked}
        indeterminate={indeterminate}
        onCheckedChange={onCheckedChange}
        aria-label={label}
        className="data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary"
      />
    </div>
  );
}
