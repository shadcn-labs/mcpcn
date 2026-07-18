"use client";

import { createContext, useContext } from "react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface QuickReplyOption {
  icon?: ReactNode;
  label?: string;
}

interface QuickReplyContextValue {
  onSelectReply?: (reply: QuickReplyOption) => void;
  replies: QuickReplyOption[];
}

const QuickReplyContext = createContext<QuickReplyContextValue | null>(null);

export const useQuickReply = () => {
  const context = useContext(QuickReplyContext);

  if (!context) {
    throw new Error("QuickReply components must be used within QuickReply");
  }

  return context;
};

const DEFAULT_REPLIES: QuickReplyOption[] = [
  { label: "Yes, please" },
  { label: "No, thanks" },
  { label: "Tell me more" },
];

export interface QuickReplyProps extends ComponentProps<"div"> {
  actions?: {
    onSelectReply?: (reply: QuickReplyOption) => void;
  };
  data?: {
    replies?: QuickReplyOption[];
  };
}

interface QuickReplyItemProps extends Omit<
  ComponentProps<"button">,
  "onClick"
> {
  reply: QuickReplyOption;
}

export const QuickReplyItem = ({
  children,
  className,
  reply,
  ...props
}: QuickReplyItemProps) => {
  const { onSelectReply } = useQuickReply();

  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-sm",
        className
      )}
      onClick={() => onSelectReply?.(reply)}
      type="button"
      {...props}
    >
      {children ?? (
        <>
          {reply.icon}
          {reply.label && <span>{reply.label}</span>}
        </>
      )}
    </button>
  );
};

export const QuickReplyList = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { replies } = useQuickReply();

  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {children ??
        replies.map((reply, index) => (
          <QuickReplyItem
            key={`${reply.label ?? "reply"}-${index}`}
            reply={reply}
          />
        ))}
    </div>
  );
};

const QuickReplyRoot = ({
  actions,
  children,
  className,
  data,
  ...props
}: QuickReplyProps & { children: React.ReactNode }) => {
  const context: QuickReplyContextValue = {
    onSelectReply: actions?.onSelectReply,
    replies: data?.replies ?? DEFAULT_REPLIES,
  };

  return (
    <QuickReplyContext.Provider value={context}>
      <div
        className={cn("w-full rounded-lg bg-card p-4", className)}
        {...props}
      >
        {children}
      </div>
    </QuickReplyContext.Provider>
  );
};

export const QuickReply = QuickReplyRoot;
