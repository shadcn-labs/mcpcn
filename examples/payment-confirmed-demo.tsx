"use client";

import { PaymentConfirmed } from "@/registry/payment/payment-confirmed";

export default function PaymentConfirmedDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PaymentConfirmed />
      <PaymentConfirmed>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <PaymentConfirmed.Content />
        </div>
      </PaymentConfirmed>
    </div>
  );
}
