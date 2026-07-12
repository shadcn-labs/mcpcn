"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

interface RatingContextValue {
  feedback: string;
  onSubmit?: (rating: number, feedback?: string) => void;
  rating: number;
  setFeedback: (value: string) => void;
  setRating: (value: number) => void;
}
const { Provider, useCompoundContext } =
  createCompoundContext<RatingContextValue>("RatingCard");

export interface RatingCardProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSubmit"
> {
  defaultRating?: number;
  onSubmit?: (rating: number, feedback?: string) => void;
}

function Stars({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { rating, setRating } = useCompoundContext();
  return (
    <div
      className={cn("flex gap-1", className)}
      role="radiogroup"
      aria-label="Rating"
      {...props}
    >
      {children ??
        Array.from({ length: 5 }).map((_, index) => {
          const value = index + 1;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} stars`}
              onClick={() => setRating(value)}
            >
              <Star
                className={cn(
                  "h-6 w-6",
                  value <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                )}
              />
            </button>
          );
        })}
    </div>
  );
}

function FeedbackInput({
  className,
  ...props
}: ComponentPropsWithoutRef<"textarea">) {
  const { feedback, setFeedback } = useCompoundContext();
  return (
    <textarea
      value={feedback}
      onChange={(event) => setFeedback(event.target.value)}
      className={cn(
        "min-h-20 w-full rounded-md border bg-background px-3 py-2 text-sm",
        className
      )}
      placeholder="What could we improve?"
      {...props}
    />
  );
}

function SubmitButton({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  const { feedback, onSubmit, rating } = useCompoundContext();
  return (
    <Button
      className={className}
      disabled={!rating}
      onClick={() => onSubmit?.(rating, feedback || undefined)}
      {...props}
    >
      {children ?? "Submit feedback"}
    </Button>
  );
}

function RatingCardRoot({
  defaultRating = 0,
  onSubmit,
  className,
  children,
  ...props
}: RatingCardProps) {
  const [rating, setRating] = useState(defaultRating);
  const [feedback, setFeedback] = useState("");
  return (
    <Provider value={{ feedback, onSubmit, rating, setFeedback, setRating }}>
      <div
        className={cn(
          "w-full space-y-4 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <div>
              <h2 className="font-semibold">How was your experience?</h2>
              <p className="text-sm text-muted-foreground">
                Your feedback helps us improve.
              </p>
            </div>
            <Stars />
            <FeedbackInput />
            <SubmitButton />
          </>
        )}
      </div>
    </Provider>
  );
}
export const RatingCard = Object.assign(RatingCardRoot, {
  FeedbackInput,
  Stars,
  SubmitButton,
});
