"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";
import type { AddressValue } from "./types";

export type { AddressValue } from "./types";

interface AddressContextValue {
  validateAddress?: (address: AddressValue) => boolean;
}

const { Provider, useCompoundContext } =
  createCompoundContext<AddressContextValue>("AddressForm");

export interface AddressFormProps extends ComponentPropsWithoutRef<"div"> {
  validateAddress?: (address: AddressValue) => boolean;
}

type FieldProps = ComponentPropsWithoutRef<"input">;

function Field({ className, ...props }: FieldProps) {
  return (
    <input
      className={cn(
        "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  );
}

function StreetInput(props: FieldProps) {
  useCompoundContext();
  return (
    <Field
      name="street"
      autoComplete="street-address"
      placeholder="Street address"
      {...props}
    />
  );
}
function CityInput(props: FieldProps) {
  useCompoundContext();
  return (
    <Field
      name="city"
      autoComplete="address-level2"
      placeholder="City"
      {...props}
    />
  );
}
function StateInput(props: FieldProps) {
  useCompoundContext();
  return (
    <Field
      name="state"
      autoComplete="address-level1"
      placeholder="State or province"
      {...props}
    />
  );
}
function ZipInput(props: FieldProps) {
  useCompoundContext();
  return (
    <Field
      name="zip"
      autoComplete="postal-code"
      placeholder="Postal code"
      {...props}
    />
  );
}

function CountrySelect({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  useCompoundContext();
  return (
    <select
      name="country"
      autoComplete="country"
      className={cn(
        "w-full rounded-md border bg-background px-3 py-2 text-sm",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <option value="">Select country</option>
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="IN">India</option>
        </>
      )}
    </select>
  );
}

function AddressFormRoot({
  validateAddress,
  className,
  children,
  ...props
}: AddressFormProps) {
  return (
    <Provider value={{ validateAddress }}>
      <div
        className={cn(
          "w-full space-y-3 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <StreetInput />
            <div className="grid gap-3 sm:grid-cols-2">
              <CityInput />
              <StateInput />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ZipInput />
              <CountrySelect />
            </div>
          </>
        )}
      </div>
    </Provider>
  );
}

export const AddressForm = Object.assign(AddressFormRoot, {
  CityInput,
  CountrySelect,
  StateInput,
  StreetInput,
  ZipInput,
});
