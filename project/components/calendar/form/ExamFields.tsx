"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExamInfo } from "@/types/calendar";
import {
  programs,
  providers,
  getExamsByProgram,
  getSubjectsByProgram,
  getChaptersBySubject,
  getTopicsByChapter
} from "@/lib/exam-data";

interface ExamFieldsProps {
  examInfo?: ExamInfo;
  onExamSelect: (exam: ExamInfo | undefined) => void;
}

export function ExamFields({ examInfo, onExamSelect }: ExamFieldsProps) {
  const [selectedProgram, setSelectedProgram] = useState(examInfo?.program || "");
  const [selectedProvider, setSelectedProvider] = useState(examInfo?.provider || "");
  const [selectedSubject, setSelectedSubject] = useState(examInfo?.subject || "");
  const [selectedChapter, setSelectedChapter] = useState(examInfo?.chapter || "");
  const [selectedTopic, setSelectedTopic] = useState(examInfo?.topic || "");
  const [selectedYear, setSelectedYear] = useState<number>(examInfo?.year || new Date().getFullYear());

  const [availableExams, setAvailableExams] = useState<ExamInfo[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [chapters, setChapters] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    if (selectedProgram) {
      setAvailableExams(getExamsByProgram(selectedProgram));
      setSubjects(getSubjectsByProgram(selectedProgram));
    }
  }, [selectedProgram]);

  useEffect(() => {
    if (selectedSubject) {
      setChapters(getChaptersBySubject(selectedSubject));
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedChapter) {
      setTopics(getTopicsByChapter(selectedChapter));
    }
  }, [selectedChapter]);

  const handleExamSelect = (examId: string) => {
    const exam = availableExams.find(e => e.id === examId);
    if (exam) {
      setSelectedProgram(exam.program);
      setSelectedProvider(exam.provider);
      setSelectedSubject(exam.subject);
      setSelectedChapter(exam.chapter || "");
      setSelectedTopic(exam.topic || "");
      setSelectedYear(exam.year);
      onExamSelect(exam);
    }
  };

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() + i
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Program</Label>
          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger>
              <SelectValue placeholder="Select program" />
            </SelectTrigger>
            <SelectContent>
              {programs.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Provider</Label>
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger>
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((provider) => (
                <SelectItem key={provider} value={provider}>
                  {provider}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedProgram && (
        <div className="space-y-2">
          <Label>Available Exams</Label>
          <Select 
            value={examInfo?.id} 
            onValueChange={handleExamSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select exam" />
            </SelectTrigger>
            <SelectContent>
              {availableExams.map((exam) => (
                <SelectItem key={exam.id} value={exam.id}>
                  {exam.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Subject</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Year</Label>
          <Select 
            value={selectedYear.toString()} 
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedSubject && chapters.length > 0 && (
        <div className="space-y-2">
          <Label>Chapter</Label>
          <Select value={selectedChapter} onValueChange={setSelectedChapter}>
            <SelectTrigger>
              <SelectValue placeholder="Select chapter" />
            </SelectTrigger>
            <SelectContent>
              {chapters.map((chapter) => (
                <SelectItem key={chapter} value={chapter}>
                  {chapter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedChapter && topics.length > 0 && (
        <div className="space-y-2">
          <Label>Topic</Label>
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger>
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
