"use client";

import { RegionManagement } from "@/components/setup/regions/RegionManagement";

export default function RegionsPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-muted/50 to-background">
      <div className="max-w-[1920px] mx-auto p-6">
        <RegionManagement />
      </div>
    </div>
  );
}
