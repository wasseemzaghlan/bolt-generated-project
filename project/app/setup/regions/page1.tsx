"use client";

import { RegionManagement } from "@/components/setup/regions/RegionManagement";

export default function RegionsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <RegionManagement />
      </div>
    </div>
  );
}
