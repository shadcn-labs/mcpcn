"use client";

import { StatCard } from "@/registry/miscellaneous/stat-card";

export default function StatCardDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <StatCard />
      <StatCard>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <StatCard.Content />
        </div>
      </StatCard>
    </div>
  );
}
