"use client";

import { StatusBadge } from "@/registry/status/status-badge";

export default function StatusBadgeDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <StatusBadge />
      <StatusBadge>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <StatusBadge.Content />
        </div>
      </StatusBadge>
    </div>
  );
}
