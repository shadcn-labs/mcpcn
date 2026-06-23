"use client";

import { Play } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundBlock } from "../_lib/compound";

interface ActionContext {
  [key: string]: unknown;
  onPlay?: () => void;
  onSubscribe?: () => void;
}

export interface YoutubeEmbedProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "onSelect" | "onToggle" | "onSubmit"
> {
  onPlay?: () => void;
  onSubscribe?: () => void;
}

export const YoutubeEmbed = createCompoundBlock<
  ActionContext,
  YoutubeEmbedProps
>({
  buildContext: (props) => ({
    onPlay: props.onPlay,
    onSubscribe: props.onSubscribe,
  }),
  className: "w-full rounded-xl border bg-card p-4 sm:p-6",
  name: "YoutubeEmbed",
  renderDefault: () => (
    <div className="space-y-4">
      <YoutubeEmbed.Header>
        <div className="flex items-center gap-3">
          <Play className="h-5 w-5" />
          <div>
            <p className="font-semibold">Youtubeembed</p>
            <p className="text-sm text-muted-foreground">
              Composition-first MCP app block
            </p>
          </div>
        </div>
      </YoutubeEmbed.Header>
      <YoutubeEmbed.VideoThumbnail>
        <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
          <Play className="h-8 w-8 text-muted-foreground" />
        </div>
      </YoutubeEmbed.VideoThumbnail>
      <YoutubeEmbed.Description>
        <p className="text-sm text-muted-foreground">
          Sample description content that can be fully replaced by children.
        </p>
      </YoutubeEmbed.Description>
      <YoutubeEmbed.Actions />
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
    Description: { className: "text-sm text-muted-foreground" },
    Header: { className: "rounded-lg bg-muted/40 p-4" },
    VideoThumbnail: {
      className: "relative overflow-hidden rounded-lg bg-muted",
    },
  },
});
