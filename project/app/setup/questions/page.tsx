"use client";

import { QuestionsManagement } from "@/components/setup/questions/QuestionsManagement";

export default function QuestionsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background">
      <QuestionsManagement />
    </div>
  );
}
