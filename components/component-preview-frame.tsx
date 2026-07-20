"use client";

import { Maximize2, MessageSquare, PictureInPicture2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type PreviewMode = "inline" | "pip" | "full-width";

const modes: {
  icon: typeof MessageSquare;
  label: string;
  shortLabel?: string;
  value: PreviewMode;
}[] = [
  { icon: MessageSquare, label: "Inline", value: "inline" },
  {
    icon: PictureInPicture2,
    label: "Picture in picture",
    shortLabel: "PiP",
    value: "pip",
  },
  { icon: Maximize2, label: "Full-width", value: "full-width" },
];

export const ComponentPreviewFrame = ({
  children,
  className,
  showcase = false,
  title,
}: {
  children: ReactNode;
  className?: string;
  showcase?: boolean;
  title?: string;
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

  if (showcase) {
    return (
      <div
        data-apps-sdk-ui=""
        className={cn(
          "not-prose h-full overflow-hidden rounded-xl border bg-background",
          className
        )}
      >
        <div className="flex h-10 items-center border-b px-4 text-sm font-medium">
          {title}
        </div>
        <div className="flex min-h-40 items-center justify-center p-4 sm:p-6">
          <div className="w-full">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="component-preview"
      className={cn("not-prose my-6", className)}
    >
      <Tabs
        className="gap-0"
        value={mode}
        onValueChange={(value) => setMode(value as PreviewMode)}
      >
        <TabsList aria-label="Preview layout" className="mb-2">
          {modes.map(({ icon: Icon, label, shortLabel, value }) => (
            <TabsTrigger
              key={value}
              aria-label={label}
              title={label}
              value={value}
            >
              <Icon />
              {shortLabel ? (
                <>
                  <span className="sm:hidden">{shortLabel}</span>
                  <span className="hidden sm:inline">{label}</span>
                </>
              ) : (
                label
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <div
          data-apps-sdk-ui=""
          className="flex min-h-90 items-center justify-center overflow-hidden rounded-xl border bg-background p-4 sm:p-8"
        >
          <TabsContent className="w-full" value="inline">
            <div className="mx-auto w-full max-w-3xl">{children}</div>
          </TabsContent>
          <TabsContent className="w-full text-center" value="pip">
            <button
              className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setIsPipOpen(true)}
              type="button"
            >
              Open PiP
            </button>
          </TabsContent>
          <TabsContent className="w-full text-center" value="full-width">
            <button
              className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setIsFullscreenOpen(true)}
              type="button"
            >
              Open full-width
            </button>
          </TabsContent>
        </div>
      </Tabs>

      {isPipOpen
        ? createPortal(
            <section
              aria-label="Picture in picture preview"
              data-apps-sdk-ui=""
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
              data-apps-sdk-ui=""
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
