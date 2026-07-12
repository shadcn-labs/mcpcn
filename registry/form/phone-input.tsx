"use client";

import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

interface PhoneInputContextValue {
  country: string;
  formatPhone: (value: string) => string;
  setCountry: (country: string) => void;
  setValue: (value: string) => void;
  value: string;
}

const { Provider, useCompoundContext } =
  createCompoundContext<PhoneInputContextValue>("PhoneInput");

export interface PhoneInputProps extends ComponentPropsWithoutRef<"div"> {
  defaultCountry?: string;
  defaultValue?: string;
  formatPhone?: (value: string) => string;
  onValueChange?: (value: string) => void;
}

function CountrySelect({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  const { country, setCountry } = useCompoundContext();
  return (
    <select
      value={country}
      onChange={(event) => setCountry(event.target.value)}
      className={cn(
        "rounded-md border bg-background px-3 py-2 text-sm",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <option value="US">US +1</option>
          <option value="GB">UK +44</option>
          <option value="IN">IN +91</option>
        </>
      )}
    </select>
  );
}

function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  const { formatPhone, setValue, value } = useCompoundContext();
  return (
    <input
      type="tel"
      value={value}
      onChange={(event) => setValue(formatPhone(event.target.value))}
      className={cn(
        "min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm",
        className
      )}
      placeholder="(555) 123-4567"
      {...props}
    />
  );
}

function FormatHint({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  const { country } = useCompoundContext();
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children ?? `Use the local phone format for ${country}.`}
    </p>
  );
}

function PhoneInputRoot({
  defaultCountry = "US",
  defaultValue = "",
  formatPhone = (value) => value.replaceAll(/[^\d+()\-\s]/g, ""),
  onValueChange,
  className,
  children,
  ...props
}: PhoneInputProps) {
  const [country, setCountry] = useState(defaultCountry);
  const [value, updateValue] = useState(defaultValue);
  const setValue = (next: string) => {
    updateValue(next);
    onValueChange?.(next);
  };
  return (
    <Provider value={{ country, formatPhone, setCountry, setValue, value }}>
      <div
        className={cn(
          "w-full space-y-2 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <div className="flex gap-2">
              <CountrySelect />
              <Input />
            </div>
            <FormatHint />
          </>
        )}
      </div>
    </Provider>
  );
}

export const PhoneInput = Object.assign(PhoneInputRoot, {
  CountrySelect,
  FormatHint,
  Input,
});
