"use client";

import { useQuestions } from "@/hooks/use-questions";
import { TableCheckbox } from "@/components/setup/questions/grid/TableCheckbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface QuestionSelectionGridProps {
  selectedQuestions: string[];
  onQuestionsChange: (selectedQuestions: string[]) => void;
}

export function QuestionSelectionGrid({
  selectedQuestions,
  onQuestionsChange,
}: QuestionSelectionGridProps) {
  const { questions } = useQuestions();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuestions = questions.filter(question =>
    question.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    onQuestionsChange(checked ? filteredQuestions.map(q => q.id) : []);
  };

  const handleSelectQuestion = (questionId: string, checked: boolean) => {
    onQuestionsChange(
      checked 
        ? [...selectedQuestions, questionId]
        : selectedQuestions.filter(id => id !== questionId)
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <TableCheckbox
                  checked={selectedQuestions.length === filteredQuestions.length}
                  indeterminate={selectedQuestions.length > 0 && selectedQuestions.length < filteredQuestions.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>
                  <TableCheckbox
                    checked={selectedQuestions.includes(question.id)}
                    onCheckedChange={(checked) => handleSelectQuestion(question.id, checked)}
                  />
                </TableCell>
                <TableCell className="font-medium">{question.text}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{question.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{question.category}</Badge>
                </TableCell>
                <TableCell>{question.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
