"use client";

import { PaymentMethodSelect } from "@/registry/payment/payment-method-select";

export default function PaymentMethodSelectDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PaymentMethodSelect />
      <PaymentMethodSelect selectedMethod="wallet">
        <PaymentMethodSelect.Option
          value="wallet"
          label="Team wallet"
          description="Use the shared organization balance"
        >
          <span className="rounded-full bg-muted px-2 py-1 text-xs">
            Preferred
          </span>
        </PaymentMethodSelect.Option>
        <PaymentMethodSelect.TermsCheckbox>
          Save this choice for future purchases
        </PaymentMethodSelect.TermsCheckbox>
      </PaymentMethodSelect>
    </div>
  );
}
