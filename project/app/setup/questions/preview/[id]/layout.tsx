import { allQuestions } from "@/data/sample-exam";

// For static export, generate paths for all questions and a default path
export function generateStaticParams() {
  const paths = allQuestions.map(question => ({
    id: question.id
  }));

  // Add default path for dynamically created questions
  paths.push({ id: 'default' });

  return paths;
}

export default function QuestionPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
