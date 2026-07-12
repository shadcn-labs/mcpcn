"use client";

import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

interface EmailInputContextValue {
  error?: string;
  setValue: (value: string) => void;
  validateEmail: (value: string) => boolean;
  value: string;
}

const { Provider, useCompoundContext } =
  createCompoundContext<EmailInputContextValue>("EmailInput");

export interface EmailInputProps extends ComponentPropsWithoutRef<"div"> {
  defaultValue?: string;
  invalidMessage?: string;
  onValueChange?: (value: string) => void;
  validateEmail?: (value: string) => boolean;
}

function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  const { error, setValue, value } = useCompoundContext();
  return (
    <input
      type="email"
      value={value}
      aria-invalid={Boolean(error)}
      onChange={(event) => setValue(event.target.value)}
      className={cn(
        "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
        error && "border-destructive",
        className
      )}
      placeholder="you@example.com"
      {...props}
    />
  );
}

function HelpText({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  useCompoundContext();
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children ?? "We’ll only use this address for your receipt."}
    </p>
  );
}

function ErrorMessage({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  const { error } = useCompoundContext();
  if (!(children || error)) {
    return null;
  }
  return (
    <p
      role="alert"
      className={cn("text-xs text-destructive", className)}
      {...props}
    >
      {children ?? error}
    </p>
  );
}

function EmailInputRoot({
  defaultValue = "",
  invalidMessage = "Enter a valid email address.",
  onValueChange,
  validateEmail = (value) => /^\S+@\S+\.\S+$/.test(value),
  className,
  children,
  ...props
}: EmailInputProps) {
  const [value, updateValue] = useState(defaultValue);
  const error = value && !validateEmail(value) ? invalidMessage : undefined;
  const setValue = (next: string) => {
    updateValue(next);
    onValueChange?.(next);
  };
  return (
    <Provider value={{ error, setValue, validateEmail, value }}>
      <div
        className={cn(
          "w-full space-y-2 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <Input />
            <HelpText />
            <ErrorMessage />
          </>
        )}
      </div>
    </Provider>
  );
}

export const EmailInput = Object.assign(EmailInputRoot, {
  ErrorMessage,
  HelpText,
  Input,
});
