"use client";

import {
  StatusBadge,
  StatusBadgeIcon,
  StatusBadgeLabel,
} from "@/registry/status/status-badge";

export default function StatusBadgeDemo() {
  return (
    <StatusBadge>
      <StatusBadgeIcon />
      <StatusBadgeLabel />
    </StatusBadge>
  );
}
