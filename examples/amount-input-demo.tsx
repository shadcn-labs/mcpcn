"use client";

import { AmountInput } from "@/registry/payment/amount-input";

export default function AmountInputDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <AmountInput />
      <AmountInput>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <AmountInput.Content />
        </div>
      </AmountInput>
    </div>
  );
}
