"use client";

import { useQuestions } from "@/hooks/use-questions";
import { QuestionDialog } from "./dialogs/QuestionDialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
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

interface QuestionDetailsProps {
  questionId: string | null;
  onUpdate: () => void;
}

export function QuestionDetails({ questionId, onUpdate }: QuestionDetailsProps) {
  const { questions, updateQuestion, deleteQuestion } = useQuestions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const question = questions.find(q => q.id === questionId);

  if (!questionId || !question) {
    return (
      <div className="text-center text-muted-foreground">
        Select a question to view details
      </div>
    );
  }

  const handleSave = (data: any) => {
    if (questionId) {
      updateQuestion(questionId, data);
      onUpdate();
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (questionId) {
      deleteQuestion(questionId);
      onUpdate();
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Question Details</h3>
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
          <span className="font-medium">Question Text:</span>
          <p className="mt-1">{question.text}</p>
        </div>
        <div>
          <span className="font-medium">Type:</span>
          <p className="mt-1 capitalize">{question.type}</p>
        </div>
        <div>
          <span className="font-medium">Points:</span>
          <p className="mt-1">{question.points}</p>
        </div>
        {question.correctAnswer && (
          <div>
            <span className="font-medium">Correct Answer:</span>
            <p className="mt-1">{question.correctAnswer.toString()}</p>
          </div>
        )}
        {question.options && (
          <div>
            <span className="font-medium">Options:</span>
            <ul className="mt-1 list-disc list-inside">
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <QuestionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        question={question}
        onSave={handleSave}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the question.
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
