"use client";

import { Bookmark, Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { createContext, useContext } from "react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface XPostData {
  author?: string;
  avatar?: string;
  content?: string;
  likes?: string;
  replies?: string;
  retweets?: string;
  time?: string;
  username?: string;
  verified?: boolean;
  views?: string;
}

const DEFAULT_POST: XPostData = {
  author: "mcpcn",
  avatar: "M",
  content:
    "Just shipped a new batch of agentic UI components. Build conversational interfaces faster than ever.",
  likes: "1.2K",
  replies: "56",
  retweets: "234",
  time: "2h",
  username: "mcpcn",
  verified: true,
  views: "45.2K",
};

const XPostContext = createContext<XPostData | null>(null);

export const useXPost = () => {
  const context = useContext(XPostContext);
  if (!context) {
    throw new Error("XPost components must be used within XPost");
  }
  return context;
};

export interface XPostProps extends ComponentProps<"article"> {
  data?: XPostData;
}

export const XPostAvatar = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const data = useXPost();
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground font-semibold text-background text-sm",
        className
      )}
      {...props}
    >
      {children ?? data.avatar}
    </div>
  );
};

const VerifiedBadge = () => (
  <svg className="size-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334-4.334 6.5a.75.75 0 0 1-1.156.134l-2.415-2.415a.75.75 0 1 1 1.06-1.06l1.77 1.767 3.825-5.74a.75.75 0 0 1 1.25.833z" />
  </svg>
);

export const XPostHeader = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const data = useXPost();
  return (
    <div
      className={cn("flex flex-wrap items-center gap-1", className)}
      {...props}
    >
      {children ?? (
        <>
          {data.author && (
            <span className="font-bold text-sm">{data.author}</span>
          )}
          {data.verified && <VerifiedBadge />}
          {data.username && (
            <span className="text-muted-foreground text-sm">
              @{data.username}
            </span>
          )}
          {data.time && (
            <span className="text-muted-foreground text-sm">· {data.time}</span>
          )}
        </>
      )}
    </div>
  );
};

const Metric = ({
  children,
  label,
  value,
}: {
  children: React.ReactNode;
  label: string;
  value?: string;
}) => {
  if (value === undefined) {
    return null;
  }
  return (
    <button
      aria-label={label}
      className="flex cursor-pointer items-center gap-1.5 text-xs transition-colors hover:text-blue-500"
      type="button"
    >
      {children}
      <span>{value}</span>
    </button>
  );
};

export const XPostActions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const data = useXPost();
  return (
    <div
      className={cn(
        "mt-3 flex max-w-md items-center justify-between text-muted-foreground",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <Metric label="Reply" value={data.replies}>
            <MessageCircle className="size-4" />
          </Metric>
          <Metric label="Repost" value={data.retweets}>
            <Repeat2 className="size-4" />
          </Metric>
          <Metric label="Like" value={data.likes}>
            <Heart className="size-4" />
          </Metric>
          <Metric label="Views" value={data.views}>
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 12h4l3 8 4-16 3 8h4" />
            </svg>
          </Metric>
          <button
            aria-label="Bookmark"
            className="cursor-pointer transition-colors hover:text-blue-500"
            type="button"
          >
            <Bookmark className="size-4" />
          </button>
          <button
            aria-label="Share"
            className="cursor-pointer transition-colors hover:text-blue-500"
            type="button"
          >
            <Share className="size-4" />
          </button>
        </>
      )}
    </div>
  );
};

export const XPostContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div"> & { children: React.ReactNode }) => (
  <div className={cn("min-w-0 flex-1", className)} {...props}>
    {children}
  </div>
);

export const XPostText = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => {
  const data = useXPost();
  return (
    <p className={cn("mt-1 whitespace-pre-wrap text-sm", className)} {...props}>
      {children ?? data.content}
    </p>
  );
};

const XPostRoot = ({
  children,
  className,
  data,
  ...props
}: XPostProps & { children: React.ReactNode }) => {
  const value = { ...DEFAULT_POST, ...data };
  return (
    <XPostContext.Provider value={value}>
      <article
        className={cn("rounded-xl border bg-card p-4", className)}
        {...props}
      >
        {children}
      </article>
    </XPostContext.Provider>
  );
};

export const XPost = XPostRoot;
