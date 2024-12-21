"use client";

import { RichTextEditor } from "../editor/RichTextEditor";

interface DescriptiveEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function DescriptiveEditor({ value, onChange }: DescriptiveEditorProps) {
  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      placeholder="Enter a model answer..."
      height="300px"
    />
  );
}
