"use client";

import {
  PaymentConfirmed,
  PaymentConfirmedContent,
} from "@/registry/payment/payment-confirmed";

export default function PaymentConfirmedCompressedDemo() {
  return (
    <PaymentConfirmed appearance={{ variant: "compressed" }}>
      <PaymentConfirmedContent />
    </PaymentConfirmed>
  );
}
