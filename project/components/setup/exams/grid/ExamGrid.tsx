"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useExams } from "@/hooks/use-exams";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Trash2 } from "lucide-react";
import { ExamTable } from "./ExamTable";
import { DeleteExamDialog } from "./DeleteExamDialog";
import { useLoading } from "@/hooks/use-loading";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/routes";

export function ExamGrid() {
  const router = useRouter();
  const { exams, deleteExam } = useExams();
  const { setLoading } = useLoading();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);

  const filteredExams = exams.filter(exam =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateExam = () => {
    setLoading(true, 'Loading exam editor...');
    router.push(ROUTES.SETUP.EXAMS.NEW);
  };

  const handleViewExam = (examId: string) => {
    setLoading(true, 'Loading exam preview...');
    router.push(ROUTES.SETUP.EXAMS.PREVIEW(examId));
  };

  const handleEditExam = (examId: string) => {
    setLoading(true, 'Loading exam editor...');
    router.push(ROUTES.SETUP.EXAMS.EDIT(examId));
  };

  const handleDelete = async (examIds: string[]) => {
    try {
      for (const id of examIds) {
        await deleteExam(id);
      }
      setSelectedExams([]);
      toast({
        title: "Success",
        description: `Successfully deleted ${examIds.length} exam(s)`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete exams",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-[300px]"
          />
        </div>
        <div className="flex items-center gap-2">
          {selectedExams.length > 0 && (
            <Button 
              variant="destructive" 
              onClick={() => setIsDeleteDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected ({selectedExams.length})
            </Button>
          )}
          <Button onClick={handleCreateExam} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Exam
          </Button>
        </div>
      </div>

      <ExamTable
        exams={filteredExams}
        selectedExams={selectedExams}
        onSelectExams={setSelectedExams}
        onView={handleViewExam}
        onEdit={handleEditExam}
        onDelete={(examId) => handleDelete([examId])}
      />

      <DeleteExamDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => {
          handleDelete(selectedExams);
          setIsDeleteDialogOpen(false);
        }}
        count={selectedExams.length}
      />
    </div>
  );
}
