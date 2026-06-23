"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundBlock } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  validateAddress?: () => boolean;
}

export interface AddressFormProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  validateAddress?: () => boolean;
}

export const AddressForm = createCompoundBlock<ActionContext, AddressFormProps>(
  {
    buildContext: (props) => ({ validateAddress: props.validateAddress }),
    className: "w-full rounded-xl border bg-card p-4 sm:p-6",
    name: "AddressForm",
    renderDefault: () => (
      <div className="space-y-4">
        <AddressForm.StreetInput />
        <AddressForm.CityInput />
        <AddressForm.StateInput />
        <AddressForm.ZipInput />
        <AddressForm.CountrySelect />
      </div>
    ),
    slots: {
      CityInput: {
        render: ({ className, children }) =>
          children ?? (
            <input
              className={cn(
                "w-full rounded-md border bg-background px-3 py-2 text-sm",
                className
              )}
              placeholder="City"
            />
          ),
      },
      CountrySelect: {
        render: ({ className, children }) =>
          children ?? (
            <input
              className={cn(
                "w-full rounded-md border bg-background px-3 py-2 text-sm",
                className
              )}
              placeholder="Country select"
            />
          ),
      },
      StateInput: {
        render: ({ className, children }) =>
          children ?? (
            <input
              className={cn(
                "w-full rounded-md border bg-background px-3 py-2 text-sm",
                className
              )}
              placeholder="State"
            />
          ),
      },
      StreetInput: {
        render: ({ className, children }) =>
          children ?? (
            <input
              className={cn(
                "w-full rounded-md border bg-background px-3 py-2 text-sm",
                className
              )}
              placeholder="Street"
            />
          ),
      },
      ZipInput: {
        render: ({ className, children }) =>
          children ?? (
            <input
              className={cn(
                "w-full rounded-md border bg-background px-3 py-2 text-sm",
                className
              )}
              placeholder="Zip"
            />
          ),
      },
    },
  }
);
