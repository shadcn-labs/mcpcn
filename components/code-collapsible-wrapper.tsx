"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const CodeCollapsibleWrapper = ({
  className,
  children,
  navTriggerClassName,
  ...props
}: React.ComponentProps<"div"> & {
  navTriggerClassName?: string;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const contentId = useId();

  return (
    <div
      data-state={isOpened ? "open" : "closed"}
      className={cn("group/collapsible relative md:-mx-1", className)}
      {...props}
    >
      <div
        className={cn(
          "absolute top-1.5 right-9 z-10 flex items-center",
          navTriggerClassName
        )}
      >
        <Button
          aria-controls={contentId}
          aria-expanded={isOpened}
          variant="ghost"
          size="sm"
          className="h-7 rounded-md px-2 text-muted-foreground"
          onClick={() => setIsOpened((value) => !value)}
        >
          {isOpened ? "Collapse" : "Expand"}
        </Button>
        <Separator orientation="vertical" className="mx-1.5 h-4!" />
      </div>
      <div
        id={contentId}
        className={cn(
          "relative mt-6 overflow-hidden [&>figure]:mt-0 [&>figure]:md:mx-0!",
          !isOpened && "max-h-64 [content-visibility:auto]"
        )}
      >
        {children}
      </div>

      {isOpened ? null : (
        <div className="absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-linear-to-b from-code/70 to-code">
          <Button
            aria-controls={contentId}
            aria-expanded={false}
            variant="outline"
            size="sm"
            onClick={() => setIsOpened(true)}
          >
            Expand
          </Button>
        </div>
      )}
    </div>
  );
};
