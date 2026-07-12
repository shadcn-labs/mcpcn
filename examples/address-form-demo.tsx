"use client";

import { AddressForm } from "@/registry/form/address-form";

export default function AddressFormDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <AddressForm />
      <AddressForm>
        <label className="text-sm font-medium">Shipping address</label>
        <AddressForm.StreetInput defaultValue="42 Compound Lane" />
        <div className="grid gap-3 sm:grid-cols-2">
          <AddressForm.CityInput defaultValue="Bengaluru" />
          <AddressForm.StateInput defaultValue="Karnataka" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <AddressForm.ZipInput defaultValue="560001" />
          <AddressForm.CountrySelect defaultValue="IN" />
        </div>
      </AddressForm>
    </div>
  );
}
