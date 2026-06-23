"use client";

import { AddressForm } from "@/registry/form/address-form";

export default function AddressFormDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <AddressForm />
      <AddressForm>
        <AddressForm.Header>
          <div>
            <p className="font-semibold">Custom Address Form</p>
            <p className="text-sm text-muted-foreground">
              A composed path with swapped children.
            </p>
          </div>
        </AddressForm.Header>
        <AddressForm.CityInput>
          <div className="flex items-center justify-between gap-3">
            <span>Injected slot content</span>
            <span className="text-sm text-muted-foreground">mcpcn</span>
          </div>
        </AddressForm.CityInput>
      </AddressForm>
    </div>
  );
}
