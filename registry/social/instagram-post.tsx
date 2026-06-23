"use client";

import { Heart } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundBlock } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export interface InstagramPostProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export const InstagramPost = createCompoundBlock<
  ActionContext,
  InstagramPostProps
>({
  buildContext: (props) => ({
    onComment: props.onComment,
    onLike: props.onLike,
    onShare: props.onShare,
  }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "InstagramPost",
  renderDefault: () => (
    <div className="space-y-4">
      <InstagramPost.Header>
        <div className="flex items-center gap-3">
          <Heart className="h-5 w-5" />
          <div>
            <p className="font-semibold">Instagrampost</p>
            <p className="text-sm text-muted-foreground">
              Composition-first MCP app block
            </p>
          </div>
        </div>
      </InstagramPost.Header>
      <InstagramPost.Image>
        <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
      </InstagramPost.Image>
      <InstagramPost.Caption>
        <p className="text-sm text-muted-foreground">
          Sample caption content that can be fully replaced by children.
        </p>
      </InstagramPost.Caption>
      <InstagramPost.Actions />
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
    Caption: { className: "text-sm" },
    Header: { className: "rounded-lg bg-muted/40 p-4" },
    Image: { className: "overflow-hidden rounded-lg bg-muted" },
  },
});
