"use client";

import { EmailInput } from "@/registry/form/email-input";

export default function EmailInputDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <EmailInput />
      <EmailInput>
        <EmailInput.Header>
          <div>
            <p className="font-semibold">Custom Email Input</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </EmailInput.Header>
        <EmailInput.HelpText>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </EmailInput.HelpText>
      </EmailInput>
    </div>
  );
}
