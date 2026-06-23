"use client";

import { PhoneInput } from "@/registry/form/phone-input";

export default function PhoneInputDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PhoneInput />
      <PhoneInput>
        <PhoneInput.Header>
          <div>
            <p className="font-semibold">Custom Phone Input</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </PhoneInput.Header>
        <PhoneInput.Input>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </PhoneInput.Input>
      </PhoneInput>
    </div>
  );
}
