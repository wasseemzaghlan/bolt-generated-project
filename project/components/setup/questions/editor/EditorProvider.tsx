"use client";

import { createContext, useContext, useRef } from 'react';
import { RichTextEditorComponent } from '@syncfusion/ej2-react-richtexteditor';

interface EditorContextType {
  editorRef: React.RefObject<RichTextEditorComponent>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const editorRef = useRef<RichTextEditorComponent>(null);

  return (
    <EditorContext.Provider value={{ editorRef }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
