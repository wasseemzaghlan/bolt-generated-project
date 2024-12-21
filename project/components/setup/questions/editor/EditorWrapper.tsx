"use client";

import { EditorProvider } from './EditorProvider';
import { RichTextEditor } from './RichTextEditor';

interface EditorWrapperProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  minimal?: boolean;
}

export function EditorWrapper(props: EditorWrapperProps) {
  return (
    <EditorProvider>
      <RichTextEditor {...props} />
    </EditorProvider>
  );
}
