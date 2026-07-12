"use client";

import { RefundStatus } from "@/registry/payment/refund-status";

export default function RefundStatusDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <RefundStatus />
      <RefundStatus>
        <RefundStatus.Header>
          <div>
            <p className="font-semibold">Partial refund approved</p>
            <p className="text-sm text-muted-foreground">Order #MCP-2048</p>
          </div>
        </RefundStatus.Header>
        <RefundStatus.RefundAmount amount={42.5} />
        <RefundStatus.Timeline
          steps={[
            { label: "Approved", status: "completed" },
            { label: "Returning to card", status: "current" },
          ]}
        />
        <RefundStatus.ContactSupport>
          Ask about this refund
        </RefundStatus.ContactSupport>
      </RefundStatus>
    </div>
  );
}
