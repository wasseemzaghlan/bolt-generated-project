"use client";

import { useState } from "react";
import { useSubjects } from "@/hooks/use-subjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubjectDialog } from "../dialogs/SubjectDialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SubjectsGridProps {
  selectedSubject: string | null;
  onSelectSubject: (subjectId: string | null) => void;
}

export function SubjectsGrid({ selectedSubject, onSelectSubject }: SubjectsGridProps) {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingSubject(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (subject: any) => {
    setEditingSubject(subject);
    setIsDialogOpen(true);
  };

  const handleSave = (subjectData: any) => {
    if (editingSubject) {
      updateSubject(editingSubject.id, subjectData);
    } else {
      addSubject(subjectData);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Subjects</h2>
          <p className="text-sm text-muted-foreground">
            Manage academic subjects and courses
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[200px]"
          />
          <Button onClick={handleAdd} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Subject
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubjects.map((subject) => (
              <TableRow
                key={subject.id}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedSubject === subject.id && "bg-muted"
                )}
                onClick={() => onSelectSubject(subject.id)}
              >
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{subject.code}</Badge>
                </TableCell>
                <TableCell>{subject.department}</TableCell>
                <TableCell>
                  <Badge variant="outline">{subject.credits} Credits</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(subject);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSubject(subject.id);
                      }}
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

      <SubjectDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        subject={editingSubject}
        onSave={handleSave}
      />
    </div>
  );
}
