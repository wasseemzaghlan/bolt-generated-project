export default function EditQuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

// Disable static generation for this route
export const dynamic = "force-dynamic";
