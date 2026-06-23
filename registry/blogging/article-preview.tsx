"use client";

import { ArrowRight, Newspaper } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";

import { createCompoundBlock } from "../_lib/compound";

type ActionContext = Record<string, unknown>;

export type ArticlePreviewProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
>;

export const ArticlePreview = createCompoundBlock<
  ActionContext,
  ArticlePreviewProps
>({
  buildContext: () => ({}),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "ArticlePreview",
  renderDefault: () => (
    <div className="space-y-4">
      <ArticlePreview.Header>
        <div className="flex items-center gap-3">
          <Newspaper className="h-5 w-5" />
          <div>
            <p className="font-semibold">Articlepreview</p>
            <p className="text-sm text-muted-foreground">
              Composition-first MCP app block
            </p>
          </div>
        </div>
      </ArticlePreview.Header>
      <ArticlePreview.Excerpt>
        <p className="text-sm text-muted-foreground">
          Sample excerpt content that can be fully replaced by children.
        </p>
      </ArticlePreview.Excerpt>
      <ArticlePreview.Tags>
        <p className="text-sm text-muted-foreground">
          Sample tags content that can be fully replaced by children.
        </p>
      </ArticlePreview.Tags>
      <ArticlePreview.CTA />
    </div>
  ),
  slots: {
    CTA: {
      render: ({ className, children }) => (
        <Button className={className} variant="outline">
          {children ?? "Read more"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    Excerpt: { className: "text-sm text-muted-foreground" },
    Header: { className: "rounded-lg bg-muted/40 p-4" },
    Tags: { className: "flex flex-wrap gap-2" },
  },
});
