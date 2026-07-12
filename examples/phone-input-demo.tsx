"use client";

import { PhoneInput } from "@/registry/form/phone-input";

export default function PhoneInputDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PhoneInput />
      <PhoneInput defaultCountry="IN">
        <label className="text-sm font-medium">Contact number</label>
        <div className="flex gap-2">
          <PhoneInput.CountrySelect>
            <option value="IN">India +91</option>
            <option value="SG">Singapore +65</option>
          </PhoneInput.CountrySelect>
          <PhoneInput.Input placeholder="98765 43210" />
        </div>
        <PhoneInput.FormatHint />
      </PhoneInput>
    </div>
  );
}
