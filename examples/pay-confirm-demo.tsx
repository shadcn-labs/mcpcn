"use client";

import { PayConfirm } from "@/registry/payment/pay-confirm";

export default function PayConfirmDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PayConfirm />
      <PayConfirm currency="EUR">
        <PayConfirm.Header>
          <h2 className="font-semibold">Approve subscription</h2>
          <p className="text-sm text-muted-foreground">Billed once per year</p>
        </PayConfirm.Header>
        <PayConfirm.Amount amount={149} />
        <PayConfirm.CardPreview brand="Mastercard" last4="2048" />
        <PayConfirm.Disclaimer>
          Cancel any time before renewal.
        </PayConfirm.Disclaimer>
        <PayConfirm.Actions />
      </PayConfirm>
    </div>
  );
}
