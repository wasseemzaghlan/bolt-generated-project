"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface TableCheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function TableCheckbox({ checked, indeterminate, onCheckedChange }: TableCheckboxProps) {
  return (
    <Checkbox
      checked={checked}
      data-state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
      onCheckedChange={onCheckedChange}
      className="data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary"
    />
  );
}
