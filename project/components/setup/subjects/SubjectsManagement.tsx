"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SubjectsGrid } from "./SubjectsGrid";
import { SubjectDetails } from "./SubjectDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSubjects } from "@/hooks/use-subjects";

export function SubjectsManagement() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const { isLoading } = useSubjects();

  return (
    <Card className="h-[calc(100vh-2rem)] border-none bg-gradient-to-br from-card/90 via-card/50 to-background/90 backdrop-blur-sm">
      <CardHeader className="border-b bg-card/50 backdrop-blur-sm">
        <CardTitle>Subject Management</CardTitle>
      </CardHeader>
      
      <div className="grid grid-cols-[1fr,300px] h-[calc(100vh-8rem)]">
        <ScrollArea className="border-r">
          <div className="p-6">
            <SubjectsGrid 
              selectedSubject={selectedSubject}
              onSelectSubject={setSelectedSubject}
            />
          </div>
        </ScrollArea>

        <ScrollArea>
          <div className="p-6">
            <SubjectDetails
              subjectId={selectedSubject}
              onUpdate={() => setSelectedSubject(selectedSubject)}
            />
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
