"use client";

import { AddressForm } from "@/registry/form/address-form";
import { EmailInput } from "@/registry/form/email-input";
import { PhoneInput } from "@/registry/form/phone-input";

export default function FormIntegration() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <EmailInput validateEmail={(value) => value.includes("@")} />
      <PhoneInput formatPhone={(value) => value} />
      <AddressForm validateAddress={() => true} />
    </div>
  );
}
