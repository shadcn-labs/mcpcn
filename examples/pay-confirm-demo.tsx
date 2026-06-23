"use client";

import { PayConfirm } from "@/registry/payment/pay-confirm";

export default function PayConfirmDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PayConfirm />
      <PayConfirm>
        <PayConfirm.Header>
          <div>
            <p className="font-semibold">Custom Pay Confirm</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </PayConfirm.Header>
        <PayConfirm.CardPreview>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </PayConfirm.CardPreview>
      </PayConfirm>
    </div>
  );
}
