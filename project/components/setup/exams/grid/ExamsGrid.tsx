"use client";

import { useState } from "react";
import { useExams } from "@/hooks/use-exams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown, Eye, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { TableCheckbox } from "@/components/setup/questions/grid/TableCheckbox";
import { ROUTES } from "@/lib/routes";

export function ExamsGrid() {
  const router = useRouter();
  const { exams, deleteExam } = useExams();
  const { toast } = useToast();
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'title', direction: 'asc' });

  const filteredExams = exams.filter(exam =>
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedExams = [...filteredExams].sort((a, b) => {
    const aValue = String(a[sortConfig.key as keyof typeof a] || '');
    const bValue = String(b[sortConfig.key as keyof typeof b] || '');
    return sortConfig.direction === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedExams(checked ? sortedExams.map(exam => exam.id) : []);
  };

  const handleSelectExam = (examId: string, checked: boolean) => {
    setSelectedExams(prev => 
      checked ? [...prev, examId] : prev.filter(id => id !== examId)
    );
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
    <div className="space-y-4">
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
        {selectedExams.length > 0 && (
          <Button 
            variant="destructive" 
            onClick={() => handleDelete(selectedExams)}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected ({selectedExams.length})
          </Button>
        )}
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <TableCheckbox
                  checked={selectedExams.length === sortedExams.length}
                  indeterminate={selectedExams.length > 0 && selectedExams.length < sortedExams.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('title')}
                  className="flex items-center gap-2 hover:bg-transparent px-0"
                >
                  Title
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedExams.map((exam) => (
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
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(ROUTES.SETUP.EXAMS.PREVIEW(exam.id))}
                      className="h-8 w-8"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(ROUTES.SETUP.EXAMS.EDIT(exam.id))}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete([exam.id])}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
