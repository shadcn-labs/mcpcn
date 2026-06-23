"use client";

import { PaymentMethodSelect } from "@/registry/payment/payment-method-select";

export default function PaymentMethodSelectDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PaymentMethodSelect />
      <PaymentMethodSelect>
        <PaymentMethodSelect.Header>
          <div>
            <p className="font-semibold">Custom Payment Method Select</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </PaymentMethodSelect.Header>
        <PaymentMethodSelect.TermsCheckbox>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </PaymentMethodSelect.TermsCheckbox>
      </PaymentMethodSelect>
    </div>
  );
}
