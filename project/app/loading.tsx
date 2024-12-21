export default function Loading() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded mx-auto"></div>
          <div className="h-4 w-64 bg-muted rounded mx-auto"></div>
          <div className="h-32 w-full bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}
