"use client";

import { Maximize2, MessageSquare, PictureInPicture2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

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
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isPipOpen, setIsPipOpen] = useState(false);

  useEffect(() => {
    if (!(isFullscreenOpen || isPipOpen)) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreenOpen(false);
        setIsPipOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isFullscreenOpen, isPipOpen]);

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

      <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-xl border bg-background p-4 sm:p-8">
        {mode === "inline" ? (
          <div className="mx-auto w-full max-w-3xl">{children}</div>
        ) : (
          <button
            className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => {
              if (mode === "pip") {
                setIsPipOpen(true);
              } else {
                setIsFullscreenOpen(true);
              }
            }}
            type="button"
          >
            {mode === "pip" ? "Open PiP" : "Open full-width"}
          </button>
        )}
      </div>

      {isPipOpen
        ? createPortal(
            <section
              aria-label="Picture in picture preview"
              className="fixed right-4 bottom-4 z-100 w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-xl border bg-background shadow-2xl"
            >
              <header className="flex h-11 items-center justify-between border-b px-3">
                <span className="text-sm font-medium">Component preview</span>
                <button
                  aria-label="Close picture in picture"
                  className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => setIsPipOpen(false)}
                  type="button"
                >
                  <X className="size-4" />
                </button>
              </header>
              <div className="max-h-[min(70vh,640px)] overflow-auto p-4">
                {children}
              </div>
            </section>,
            document.body
          )
        : null}

      {isFullscreenOpen
        ? createPortal(
            <section
              aria-label="Full-width preview"
              aria-modal="true"
              className="fixed inset-0 z-100 flex flex-col bg-background"
              role="dialog"
            >
              <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 sm:px-6">
                <span className="font-medium">Component preview</span>
                <button
                  aria-label="Close full-width preview"
                  className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => setIsFullscreenOpen(false)}
                  type="button"
                >
                  <X className="size-4" />
                </button>
              </header>
              <div className="flex min-h-0 flex-1 items-center overflow-auto p-4 sm:p-8">
                <div className="w-full">{children}</div>
              </div>
            </section>,
            document.body
          )
        : null}
    </div>
  );
};
