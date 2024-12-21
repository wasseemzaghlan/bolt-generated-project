"use client";

import { useSubjects } from "@/hooks/use-subjects";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { SubjectDialog } from "./dialogs/SubjectDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SubjectDetailsProps {
  subjectId: string | null;
  onUpdate: () => void;
}

export function SubjectDetails({ subjectId, onUpdate }: SubjectDetailsProps) {
  const { subjects, updateSubject, deleteSubject } = useSubjects();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const subject = subjects.find(s => s.id === subjectId);

  if (!subjectId || !subject) {
    return (
      <div className="text-center text-muted-foreground">
        Select a subject to view details
      </div>
    );
  }

  const handleSave = (data: any) => {
    updateSubject(subjectId, data);
    setIsDialogOpen(false);
    onUpdate();
  };

  const handleDelete = () => {
    deleteSubject(subjectId);
    setIsDeleteDialogOpen(false);
    onUpdate();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{subject.name}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDialogOpen(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <span className="font-medium">Code:</span>
          <p className="mt-1">{subject.code}</p>
        </div>
        <div>
          <span className="font-medium">Department:</span>
          <p className="mt-1">{subject.department}</p>
        </div>
        <div>
          <span className="font-medium">Credits:</span>
          <p className="mt-1">{subject.credits}</p>
        </div>
        {subject.description && (
          <div>
            <span className="font-medium">Description:</span>
            <p className="mt-1">{subject.description}</p>
          </div>
        )}
      </div>

      <SubjectDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        subject={subject}
        onSave={handleSave}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the subject.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
