"use client";

import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Link as LinkIcon,
  Image
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  minimal?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Enter your content here...',
  height = '200px',
  minimal = false
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (format: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const text = value;
      const before = text.substring(0, start);
      const selected = text.substring(start, end);
      const after = text.substring(end);

      let newText = '';
      switch (format) {
        case 'bold':
          newText = `${before}**${selected}**${after}`;
          break;
        case 'italic':
          newText = `${before}_${selected}_${after}`;
          break;
        case 'list':
          newText = `${before}\n- ${selected}${after}`;
          break;
        case 'ordered-list':
          newText = `${before}\n1. ${selected}${after}`;
          break;
        case 'link':
          newText = `${before}[${selected}](url)${after}`;
          break;
        case 'image':
          newText = `${before}![${selected}](image-url)${after}`;
          break;
        default:
          newText = text;
      }

      onChange(newText);
      textareaRef.current.focus();
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b bg-muted/50 p-1 flex flex-wrap gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormat('bold')}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertFormat('italic')}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        {!minimal && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormat('list')}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormat('ordered-list')}
              className="h-8 w-8 p-0"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormat('link')}
              className="h-8 w-8 p-0"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormat('image')}
              className="h-8 w-8 p-0"
            >
              <Image className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "border-0 rounded-none focus-visible:ring-0 resize-none",
          "min-h-[200px]"
        )}
        style={{ height }}
      />
    </div>
  );
}
