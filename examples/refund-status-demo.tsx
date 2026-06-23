"use client";

import { RefundStatus } from "@/registry/payment/refund-status";

export default function RefundStatusDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <RefundStatus />
      <RefundStatus>
        <RefundStatus.Header>
          <div>
            <p className="font-semibold">Custom Refund Status</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </RefundStatus.Header>
        <RefundStatus.RefundAmount>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </RefundStatus.RefundAmount>
      </RefundStatus>
    </div>
  );
}
