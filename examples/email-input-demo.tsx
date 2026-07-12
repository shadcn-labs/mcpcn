"use client";

import { EmailInput } from "@/registry/form/email-input";

export default function EmailInputDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EmailInput />
      <EmailInput defaultValue="not-an-email">
        <label className="text-sm font-medium">Billing email</label>
        <EmailInput.Input />
        <EmailInput.HelpText>
          Receipts and refund notices go here.
        </EmailInput.HelpText>
        <EmailInput.ErrorMessage />
      </EmailInput>
    </div>
  );
}
