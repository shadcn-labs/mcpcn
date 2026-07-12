"use client";

import { Quote as QuoteIcon, Star } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

const { Provider, useCompoundContext } =
  createCompoundContext<Record<string, never>>("TestimonialCard");
export type TestimonialCardProps = ComponentPropsWithoutRef<"figure">;

interface QuoteProps extends ComponentPropsWithoutRef<"blockquote"> {
  text?: string;
}
function Quote({
  text = "mcpcn gave us strong defaults without locking our product into somebody else’s assumptions.",
  className,
  children,
  ...props
}: QuoteProps) {
  useCompoundContext();
  return (
    <blockquote
      className={cn("text-base font-medium leading-relaxed", className)}
      {...props}
    >
      <QuoteIcon className="mb-3 h-6 w-6 text-muted-foreground" />
      {children ?? text}
    </blockquote>
  );
}

interface AvatarProps extends ComponentPropsWithoutRef<"div"> {
  alt?: string;
  name?: string;
  src?: string;
}
function Avatar({
  alt,
  name = "Avery Morgan",
  src,
  className,
  children,
  ...props
}: AvatarProps) {
  useCompoundContext();
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-muted font-semibold",
        className
      )}
      {...props}
    >
      {children ??
        (src ? (
          <img
            src={src}
            alt={alt ?? name}
            className="h-full w-full object-cover"
          />
        ) : (
          name.charAt(0)
        ))}
    </div>
  );
}

interface AuthorProps extends ComponentPropsWithoutRef<"figcaption"> {
  name?: string;
}
function Author({
  name = "Avery Morgan",
  className,
  children,
  ...props
}: AuthorProps) {
  useCompoundContext();
  return (
    <figcaption className={cn("font-semibold", className)} {...props}>
      {children ?? name}
    </figcaption>
  );
}

interface MetadataProps extends ComponentPropsWithoutRef<"div"> {
  company?: string;
  jobTitle?: string;
  rating?: number;
}
function Metadata({
  company = "Acme",
  jobTitle = "Product lead",
  rating = 5,
  className,
  children,
  ...props
}: MetadataProps) {
  useCompoundContext();
  return (
    <div className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children ?? (
        <>
          <p>
            {jobTitle} · {company}
          </p>
          <div className="mt-1 flex" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "h-3.5 w-3.5",
                  index < rating && "fill-yellow-400 text-yellow-400"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TestimonialCardRoot({
  className,
  children,
  ...props
}: TestimonialCardProps) {
  return (
    <Provider value={{}}>
      <figure
        className={cn(
          "w-full space-y-4 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <Quote />
            <div className="flex items-center gap-3">
              <Avatar />
              <div>
                <Author />
                <Metadata />
              </div>
            </div>
          </>
        )}
      </figure>
    </Provider>
  );
}
export const TestimonialCard = Object.assign(TestimonialCardRoot, {
  Author,
  Avatar,
  Metadata,
  Quote,
});
