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
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  minimal?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Enter your content here...',
  height = '200px',
  minimal = false,
  onFocus,
  onBlur
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
        case 'h1':
          newText = `${before}# ${selected}${after}`;
          break;
        case 'h2':
          newText = `${before}## ${selected}${after}`;
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
        case 'code':
          newText = `${before}\`${selected}\`${after}`;
          break;
        case 'align-left':
          newText = `${before}<div style="text-align: left">${selected}</div>${after}`;
          break;
        case 'align-center':
          newText = `${before}<div style="text-align: center">${selected}</div>${after}`;
          break;
        case 'align-right':
          newText = `${before}<div style="text-align: right">${selected}</div>${after}`;
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
        {!minimal && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormat('h1')}
              className="h-8 w-8 p-0"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormat('h2')}
              className="h-8 w-8 p-0"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <div className="w-px h-8 bg-border mx-1" />
          </>
        )}
        
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
            <div className="w-px h-8 bg-border mx-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormat('align-left')}
              className="h-8 w-8 p-0"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormat('align-center')}
              className="h-8 w-8 p-0"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormat('align-right')}
              className="h-8 w-8 p-0"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <div className="w-px h-8 bg-border mx-1" />
          </>
        )}

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

        {!minimal && (
          <>
            <div className="w-px h-8 bg-border mx-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertFormat('code')}
              className="h-8 w-8 p-0"
            >
              <Code className="h-4 w-4" />
            </Button>
          </>
        )}

        <div className="w-px h-8 bg-border mx-1" />
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
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
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
