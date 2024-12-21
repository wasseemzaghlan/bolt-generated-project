"use client";

import React from "react";
import { Question, ComplexQuestion } from "@/types/exam";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Eye, ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";
import { QuestionTypeCell } from "./QuestionTypeCell";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TableCheckbox } from "./TableCheckbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface QuestionsTableProps {
  questions: Question[];
  selectedQuestions: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectQuestion: (questionId: string, checked: boolean) => void;
  onEdit: (question: Question) => void;
  onPreview: (question: Question) => void;
  onDelete: (questionId: string) => void;
}

type SortConfig = {
  field: keyof Question | null;
  direction: 'asc' | 'desc';
};

export function QuestionsTable({
  questions,
  selectedQuestions,
  onSelectAll,
  onSelectQuestion,
  onEdit,
  onPreview,
  onDelete,
}: QuestionsTableProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: null, direction: 'asc' });
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  const toggleRow = (questionId: string) => {
    setExpandedRows(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSort = (field: keyof Question) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleColumnFilter = (field: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [field]: value.toLowerCase()
    }));
  };

  const filteredQuestions = questions.filter(question => {
    return Object.entries(columnFilters).every(([field, value]) => {
      if (!value) return true;
      const fieldValue = String(question[field as keyof Question] || '').toLowerCase();
      return fieldValue.includes(value);
    });
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (!sortConfig.field) return 0;
    
    const aValue = String(a[sortConfig.field] || '');
    const bValue = String(b[sortConfig.field] || '');
    
    return sortConfig.direction === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const allSelected = questions.length > 0 && selectedQuestions.length === questions.length;
  const someSelected = selectedQuestions.length > 0 && selectedQuestions.length < questions.length;

  return (
    <ScrollArea className="flex-1 border rounded-lg bg-card">
      <Table>
        <TableHeader className="bg-muted/50 sticky top-0 z-10">
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="w-[50px]">
              <TableCheckbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={onSelectAll}
                label="Select all questions"
              />
            </TableHead>
            <TableHead>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('text')}
                  className="flex items-center gap-2 hover:bg-transparent px-0 text-xs font-medium"
                >
                  Question
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
                <Input
                  placeholder="Filter questions..."
                  value={columnFilters.text || ''}
                  onChange={(e) => handleColumnFilter('text', e.target.value)}
                  className="h-7 text-xs"
                />
              </div>
            </TableHead>
            <TableHead>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('type')}
                  className="flex items-center gap-2 hover:bg-transparent px-0 text-xs font-medium"
                >
                  Type
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
                <Input
                  placeholder="Filter type..."
                  value={columnFilters.type || ''}
                  onChange={(e) => handleColumnFilter('type', e.target.value)}
                  className="h-7 text-xs"
                />
              </div>
            </TableHead>
            <TableHead>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-2 hover:bg-transparent px-0 text-xs font-medium"
                >
                  Category
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
                <Input
                  placeholder="Filter category..."
                  value={columnFilters.category || ''}
                  onChange={(e) => handleColumnFilter('category', e.target.value)}
                  className="h-7 text-xs"
                />
              </div>
            </TableHead>
            <TableHead>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('points')}
                  className="flex items-center gap-2 hover:bg-transparent px-0 text-xs font-medium"
                >
                  Points
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
                <Input
                  placeholder="Filter points..."
                  value={columnFilters.points || ''}
                  onChange={(e) => handleColumnFilter('points', e.target.value)}
                  className="h-7 text-xs"
                />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedQuestions.map((question) => (
            <React.Fragment key={question.id}>
              <TableRow className={cn(
                "group hover:bg-muted/50 border-b",
                question.category === 'complex' && "bg-amber-50/10"
              )}>
                <TableCell className="py-2">
                  <TableCheckbox
                    checked={selectedQuestions.includes(question.id)}
                    onCheckedChange={(checked) => onSelectQuestion(question.id, checked)}
                    label={`Select question ${question.text}`}
                  />
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-2">
                    {question.category === 'complex' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleRow(question.id)}
                      >
                        {expandedRows.includes(question.id) ? (
                          <ChevronDown className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    )}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium">{question.text}</span>
                      {question.category === 'complex' && (
                        <p className="text-[11px] text-muted-foreground line-clamp-2">
                          {question.richText}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <QuestionTypeCell type={question.type} />
                </TableCell>
                <TableCell className="py-2">
                  <Badge variant="outline" className={cn(
                    "text-[10px] font-normal",
                    question.category === 'complex' 
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" 
                      : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  )}>
                    {question.category}
                  </Badge>
                </TableCell>
                <TableCell className="py-2">
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {question.points}
                  </Badge>
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center justify-end gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-blue-600 opacity-100"
                          onClick={() => onPreview(question)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Preview</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-amber-600 opacity-100"
                          onClick={() => onEdit(question)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-600 opacity-100"
                          onClick={() => onDelete(question.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
              {question.category === 'complex' && expandedRows.includes(question.id) && (
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={6} className="p-0">
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-12 py-3"
                      >
                        <div className="space-y-3">
                          {(question as ComplexQuestion).subQuestions.map((subQuestion, index) => (
                            <div key={subQuestion.id} className="flex items-start gap-3 py-1.5 border-l-2 border-primary/10 pl-3">
                              <Badge variant="outline" className="mt-0.5 text-[10px] shrink-0">
                                Q{index + 1}
                              </Badge>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs">{subQuestion.text}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <QuestionTypeCell type={subQuestion.type} />
                                  <Badge variant="secondary" className="font-mono text-[10px]">
                                    {subQuestion.points} points
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
