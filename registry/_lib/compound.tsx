"use client";

import { createContext, createElement, useContext } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface CompoundProviderProps<T> {
  children: ReactNode;
  value: T;
}

export const createCompoundContext = <T,>(name: string) => {
  const Context = createContext<T | null>(null);

  const Provider = ({ value, children }: CompoundProviderProps<T>) =>
    createElement(Context.Provider, { value }, children);

  const useCompoundContext = () => {
    const context = useContext(Context);

    if (!context) {
      throw new Error(`${name} subcomponents must be rendered inside ${name}.`);
    }

    return context;
  };

  return { Provider, useCompoundContext };
};

export const formatPrice = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    currency,
    style: "currency",
  }).format(value);

export type StepStatus = "completed" | "current" | "pending";

export interface TimelineStep {
  description?: string;
  label: string;
  status?: StepStatus;
}

export const statusClasses = (status: StepStatus = "pending") =>
  cn(
    "flex h-6 w-6 items-center justify-center rounded-full text-xs",
    status === "completed" && "bg-foreground text-background",
    status === "current" && "border-2 border-foreground bg-card",
    status === "pending" && "border border-muted-foreground/40 bg-card"
  );
