import { ExamHistoryDetails } from "@/components/exam/ExamHistoryDetails";

// For static export, we'll generate a default path
export function generateStaticParams() {
  return [{ id: "default" }];
}

export default function ExamReviewPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ExamHistoryDetails examId={params.id} />
      </div>
    </div>
  );
}
