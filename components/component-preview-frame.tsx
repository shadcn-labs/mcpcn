"use client";

import { Maximize2, MessageSquare, PictureInPicture2 } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PreviewMode = "inline" | "pip" | "full-width";

const modes: {
  icon: typeof MessageSquare;
  label: string;
  value: PreviewMode;
}[] = [
  { icon: MessageSquare, label: "Inline", value: "inline" },
  { icon: PictureInPicture2, label: "Picture in picture", value: "pip" },
  { icon: Maximize2, label: "Full-width", value: "full-width" },
];

export const ComponentPreviewFrame = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [mode, setMode] = useState<PreviewMode>("inline");

  return (
    <div className="not-prose my-6">
      <div
        aria-label="Preview layout"
        className="mb-2 flex items-center gap-1"
        role="group"
      >
        {modes.map(({ icon: Icon, label, value }) => (
          <button
            key={value}
            aria-label={label}
            aria-pressed={mode === value}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              mode === value &&
                "bg-foreground text-background hover:bg-foreground hover:text-background"
            )}
            onClick={() => setMode(value)}
            title={label}
            type="button"
          >
            <Icon className="size-3.5" />
          </button>
        ))}
      </div>

      <div className="min-h-[360px] overflow-hidden rounded-xl border bg-background p-4 sm:p-8">
        <div
          className={cn(
            "mx-auto flex min-h-[294px] w-full items-center transition-[max-width,padding] duration-200",
            mode === "inline" && "max-w-3xl",
            mode === "pip" &&
              "ml-auto mr-0 max-w-sm rounded-xl bg-muted/30 p-3 shadow-lg",
            mode === "full-width" && "max-w-none"
          )}
        >
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};
