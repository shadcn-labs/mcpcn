"use client";

import { MessageCircle } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundBlock } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  onReply?: () => void;
  onRetweet?: () => void;
  onLike?: () => void;
}

export interface TwitterPostProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  onReply?: () => void;
  onRetweet?: () => void;
  onLike?: () => void;
}

export const TwitterPost = createCompoundBlock<ActionContext, TwitterPostProps>(
  {
    buildContext: (props) => ({
      onLike: props.onLike,
      onReply: props.onReply,
      onRetweet: props.onRetweet,
    }),
    className: "w-full rounded-xl border bg-card p-4 sm:p-6",
    name: "TwitterPost",
    renderDefault: () => (
      <div className="space-y-4">
        <TwitterPost.Header>
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5" />
            <div>
              <p className="font-semibold">Twitterpost</p>
              <p className="text-sm text-muted-foreground">
                Composition-first MCP app block
              </p>
            </div>
          </div>
        </TwitterPost.Header>
        <TwitterPost.Text>
          <p className="text-sm text-muted-foreground">
            Sample text content that can be fully replaced by children.
          </p>
        </TwitterPost.Text>
        <TwitterPost.Media>
          <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
            <MessageCircle className="h-8 w-8 text-muted-foreground" />
          </div>
        </TwitterPost.Media>
        <TwitterPost.Metrics>
          <p className="text-sm text-muted-foreground">
            Sample metrics content that can be fully replaced by children.
          </p>
        </TwitterPost.Metrics>
        <TwitterPost.Actions />
      </div>
    ),
    slots: {
      Actions: {
        render: ({ className, children }, context) =>
          children ? (
            <div className={cn("flex gap-2", className)}>{children}</div>
          ) : (
            <div className={cn("flex gap-2", className)}>
              <Button
                variant="outline"
                onClick={(context as { onCancel?: () => void }).onCancel}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  (context as { onConfirm?: () => void }).onConfirm ??
                  (context as { onLike?: () => void }).onLike ??
                  (context as { onPlay?: () => void }).onPlay
                }
              >
                Continue
              </Button>
            </div>
          ),
      },
      Header: { className: "rounded-lg bg-muted/40 p-4" },
      Media: { className: "overflow-hidden rounded-lg bg-muted" },
      Metrics: { className: "flex gap-4 text-xs text-muted-foreground" },
      Text: { className: "text-sm leading-relaxed" },
    },
  }
);
