"use client";

import { Exam } from "@/types/exam";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExamActions } from "./ExamActions";
import { TableCheckbox } from "@/components/setup/questions/grid/TableCheckbox";

interface ExamTableProps {
  exams: Exam[];
  selectedExams: string[];
  onSelectExams: (examIds: string[]) => void;
  onView: (examId: string) => void;
  onEdit: (examId: string) => void;
  onDelete: (examId: string) => void;
}

export function ExamTable({
  exams,
  selectedExams,
  onSelectExams,
  onView,
  onEdit,
  onDelete,
}: ExamTableProps) {
  const handleSelectAll = (checked: boolean) => {
    onSelectExams(checked ? exams.map(exam => exam.id) : []);
  };

  const handleSelectExam = (examId: string, checked: boolean) => {
    onSelectExams(
      checked 
        ? [...selectedExams, examId] 
        : selectedExams.filter(id => id !== examId)
    );
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <TableCheckbox
                checked={selectedExams.length === exams.length}
                indeterminate={selectedExams.length > 0 && selectedExams.length < exams.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell>
                <TableCheckbox
                  checked={selectedExams.includes(exam.id)}
                  onCheckedChange={(checked) => handleSelectExam(exam.id, checked)}
                />
              </TableCell>
              <TableCell className="font-medium">{exam.title}</TableCell>
              <TableCell>
                <Badge variant="secondary">{exam.subject}</Badge>
              </TableCell>
              <TableCell>{exam.program}</TableCell>
              <TableCell>{exam.duration} mins</TableCell>
              <TableCell>{exam.questions.length}</TableCell>
              <TableCell>
                <Badge variant={exam.status === 'active' ? 'default' : 'secondary'}>
                  {exam.status}
                </Badge>
              </TableCell>
              <TableCell>
                <ExamActions
                  exam={exam}
                  onView={() => onView(exam.id)}
                  onEdit={() => onEdit(exam.id)}
                  onDelete={() => onDelete(exam.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
