"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useQuestions } from "@/hooks/use-questions";
import { QuestionCard } from "./QuestionCard";
import { QuestionDialog } from "./dialogs/QuestionDialog";

interface QuestionsListProps {
  selectedQuestion: string | null;
  onQuestionSelect: (questionId: string | null) => void;
}

export function QuestionsList({ selectedQuestion, onQuestionSelect }: QuestionsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { questions, addQuestion } = useQuestions();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuestions = questions.filter(question =>
    question.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (questionData: any) => {
    addQuestion(questionData);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            isSelected={selectedQuestion === question.id}
            onSelect={() => onQuestionSelect(question.id)}
          />
        ))}
      </div>

      <QuestionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
      />
    </div>
  );
}
