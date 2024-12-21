"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuestions } from "@/hooks/use-questions";
import { Question } from "@/types/exam";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2 } from "lucide-react";
import { QuestionsTable } from "./grid/QuestionsTable";
import { DeleteQuestionDialog } from "./grid/DeleteQuestionDialog";
import { useLoading } from "@/hooks/use-loading";
import { QuestionsPagination } from "./grid/QuestionsPagination";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROUTES } from "@/lib/routes";

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export function QuestionsGrid() {
  const router = useRouter();
  const { questions, deleteQuestion } = useQuestions();
  const { setLoading } = useLoading();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingQuestionIds, setDeletingQuestionIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAllRecords, setShowAllRecords] = useState(false);

  const filteredQuestions = questions.filter(question =>
    question.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = showAllRecords ? 0 : (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = showAllRecords 
    ? filteredQuestions 
    : filteredQuestions.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (question: Question) => {
    setLoading(true, 'Loading question editor...');
    router.push(ROUTES.SETUP.QUESTIONS.EDIT(question.id));
  };

  const handlePreview = (question: Question) => {
    setLoading(true, 'Loading question preview...');
    router.push(ROUTES.SETUP.QUESTIONS.PREVIEW(question.id));
  };

  const handleDelete = (questionIds: string[]) => {
    setDeletingQuestionIds(questionIds);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deletingQuestionIds.forEach(id => deleteQuestion(id));
    setIsDeleteDialogOpen(false);
    setDeletingQuestionIds([]);
    setSelectedQuestions([]);
    toast({
      title: "Questions Deleted",
      description: `Successfully deleted ${deletingQuestionIds.length} question(s)`,
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedQuestions(paginatedQuestions.map(q => q.id));
    } else {
      setSelectedQuestions([]);
    }
  };

  const handleSelectQuestion = (questionId: string, checked: boolean) => {
    if (checked) {
      setSelectedQuestions(prev => [...prev, questionId]);
    } else {
      setSelectedQuestions(prev => prev.filter(id => id !== questionId));
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setShowAllRecords(false);
  };

  const handleShowAllRecords = () => {
    setShowAllRecords(true);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 w-[300px]"
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Select
              value={showAllRecords ? "all" : itemsPerPage.toString()}
              onValueChange={(value) => 
                value === "all" 
                  ? handleShowAllRecords()
                  : handleItemsPerPageChange(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Records per page" />
              </SelectTrigger>
              <SelectContent>
                {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option} records per page
                  </SelectItem>
                ))}
                <SelectItem value="all">Show all records</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Showing {paginatedQuestions.length} of {filteredQuestions.length} records
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedQuestions.length > 0 && (
            <Button 
              variant="destructive" 
              onClick={() => handleDelete(selectedQuestions)}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected ({selectedQuestions.length})
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <QuestionsTable
          questions={paginatedQuestions}
          selectedQuestions={selectedQuestions}
          onSelectAll={handleSelectAll}
          onSelectQuestion={handleSelectQuestion}
          onEdit={handleEdit}
          onPreview={handlePreview}
          onDelete={(questionId) => handleDelete([questionId])}
        />

        {!showAllRecords && totalPages > 1 && (
          <div className="flex items-center justify-between py-4 border-t bg-background/80 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <QuestionsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      <DeleteQuestionDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        count={deletingQuestionIds.length}
      />
    </div>
  );
}
