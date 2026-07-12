"use client";

import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

const { Provider, useCompoundContext } =
  createCompoundContext<Record<string, never>>("ArticlePreview");
export type ArticlePreviewProps = ComponentPropsWithoutRef<"article">;

interface HeaderProps extends ComponentPropsWithoutRef<"header"> {
  author?: string;
  date?: string;
  title?: string;
}
function Header({
  author = "Maya Chen",
  date = "January 20, 2026",
  title = "Designing interfaces for agents and people",
  className,
  children,
  ...props
}: HeaderProps) {
  useCompoundContext();
  return (
    <header className={cn("space-y-2", className)} {...props}>
      {children ?? (
        <>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">
            By {author} · {date}
          </p>
        </>
      )}
    </header>
  );
}

interface ExcerptProps extends ComponentPropsWithoutRef<"p"> {
  text?: string;
}
function Excerpt({
  text = "Compound components preserve polished defaults while leaving room for requirements the original author could not predict.",
  className,
  children,
  ...props
}: ExcerptProps) {
  useCompoundContext();
  return (
    <p
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    >
      {children ?? text}
    </p>
  );
}

interface TagsProps extends ComponentPropsWithoutRef<"div"> {
  tags?: string[];
}
function Tags({
  tags = ["MCP Apps", "React", "Composition"],
  className,
  children,
  ...props
}: TagsProps) {
  useCompoundContext();
  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {children ??
        tags.map((tag) => (
          <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs">
            {tag}
          </span>
        ))}
    </div>
  );
}

function CTA({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  useCompoundContext();
  return (
    <Button className={className} variant="outline" {...props}>
      {children ?? "Read more"}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

function ArticlePreviewRoot({
  className,
  children,
  ...props
}: ArticlePreviewProps) {
  return (
    <Provider value={{}}>
      <article
        className={cn(
          "w-full space-y-4 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <Header />
            <Excerpt />
            <Tags />
            <CTA />
          </>
        )}
      </article>
    </Provider>
  );
}
export const ArticlePreview = Object.assign(ArticlePreviewRoot, {
  CTA,
  Excerpt,
  Header,
  Tags,
});
