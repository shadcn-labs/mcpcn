"use client";

import { Check } from "lucide-react";
import { createContext, useContext } from "react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export interface Step {
  label?: string;
  status?: "completed" | "current" | "pending";
}

interface ProgressStepsContextValue {
  steps: Step[];
}

const ProgressStepsContext = createContext<ProgressStepsContextValue | null>(
  null
);

export const useProgressSteps = () => {
  const context = useContext(ProgressStepsContext);

  if (!context) {
    throw new Error(
      "ProgressSteps components must be used within ProgressSteps"
    );
  }

  return context;
};

const DEFAULT_STEPS: Step[] = [
  { label: "Cart", status: "completed" },
  { label: "Shipping", status: "current" },
  { label: "Payment", status: "pending" },
  { label: "Confirm", status: "pending" },
];

export interface ProgressStepsProps extends ComponentProps<"div"> {
  data?: {
    steps?: Step[];
  };
}

interface ProgressStepProps extends ComponentProps<"div"> {
  index: number;
  step: Step;
}

export const ProgressStep = ({
  children,
  className,
  index,
  step,
  ...props
}: ProgressStepProps) => {
  const { steps } = useProgressSteps();
  const status = step.status ?? "pending";

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children ?? (
        <>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full text-xs",
                status === "completed" && "bg-foreground text-background",
                status === "current" && "border-2 border-foreground",
                status === "pending" && "border border-muted-foreground/40"
              )}
            >
              {status === "completed" && <Check className="size-3" />}
            </div>
            {step.label && (
              <span
                className={cn(
                  "text-xs sm:text-sm",
                  status === "current" && "font-medium",
                  status === "pending" && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div className="hidden h-px w-4 bg-border sm:block" />
          )}
        </>
      )}
    </div>
  );
};

export const ProgressStepsList = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { steps } = useProgressSteps();

  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-center",
        className
      )}
      {...props}
    >
      {children ??
        steps.map((step, index) => (
          <ProgressStep
            index={index}
            key={`${step.label ?? "step"}-${index}`}
            step={step}
          />
        ))}
    </div>
  );
};

const ProgressStepsRoot = ({
  children,
  className,
  data,
  ...props
}: ProgressStepsProps & { children: React.ReactNode }) => {
  const context: ProgressStepsContextValue = {
    steps: data?.steps ?? DEFAULT_STEPS,
  };

  return (
    <ProgressStepsContext.Provider value={context}>
      <div className={cn("rounded-lg bg-card p-4", className)} {...props}>
        {children}
      </div>
    </ProgressStepsContext.Provider>
  );
};

export const ProgressSteps = ProgressStepsRoot;
