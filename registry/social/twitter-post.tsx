"use client";

import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

interface TwitterContextValue {
  onLike?: () => void;
  onReply?: () => void;
  onRetweet?: () => void;
}
const { Provider, useCompoundContext } =
  createCompoundContext<TwitterContextValue>("TwitterPost");

export interface TwitterPostProps extends ComponentPropsWithoutRef<"article"> {
  onLike?: () => void;
  onReply?: () => void;
  onRetweet?: () => void;
}

interface HeaderProps extends ComponentPropsWithoutRef<"div"> {
  avatar?: string;
  handle?: string;
  name?: string;
  timestamp?: string;
}
function Header({
  avatar,
  handle = "@manifestui",
  name = "Manifest UI",
  timestamp = "2h",
  className,
  children,
  ...props
}: HeaderProps) {
  useCompoundContext();
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {avatar ? (
        <img
          src={avatar}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold">
          {name.charAt(0)}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">
          <span className="font-semibold">{name}</span>{" "}
          <span className="text-muted-foreground">
            {handle} · {timestamp}
          </span>
        </p>
      </div>
      {children}
    </div>
  );
}

interface TextProps extends ComponentPropsWithoutRef<"p"> {
  text?: string;
}
function Text({
  text = "Compound components make the extension points visible in JSX.",
  className,
  children,
  ...props
}: TextProps) {
  useCompoundContext();
  return (
    <p className={cn("text-sm leading-relaxed", className)} {...props}>
      {children ?? text}
    </p>
  );
}

interface MediaProps extends ComponentPropsWithoutRef<"div"> {
  alt?: string;
  src?: string;
}
function Media({
  alt = "Tweet media",
  src,
  className,
  children,
  ...props
}: MediaProps) {
  useCompoundContext();
  return (
    <div
      className={cn("overflow-hidden rounded-xl border bg-muted", className)}
      {...props}
    >
      {children ??
        (src ? (
          <img
            src={src}
            alt={alt}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center text-sm text-muted-foreground">
            Media preview
          </div>
        ))}
    </div>
  );
}

interface MetricsProps extends ComponentPropsWithoutRef<"div"> {
  likes?: number;
  replies?: number;
  retweets?: number;
}
function Metrics({
  likes = 128,
  replies = 12,
  retweets = 34,
  className,
  children,
  ...props
}: MetricsProps) {
  useCompoundContext();
  return (
    <div
      className={cn("flex gap-4 text-xs text-muted-foreground", className)}
      {...props}
    >
      {children ?? (
        <>
          <span>{replies} replies</span>
          <span>{retweets} reposts</span>
          <span>{likes} likes</span>
        </>
      )}
    </div>
  );
}

function Actions({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const context = useCompoundContext();
  return (
    <div
      className={cn("flex justify-between border-t pt-2", className)}
      {...props}
    >
      {children ?? (
        <>
          <Button variant="ghost" size="sm" onClick={context.onReply}>
            <MessageCircle />
            Reply
          </Button>
          <Button variant="ghost" size="sm" onClick={context.onRetweet}>
            <Repeat2 />
            Repost
          </Button>
          <Button variant="ghost" size="sm" onClick={context.onLike}>
            <Heart />
            Like
          </Button>
        </>
      )}
    </div>
  );
}

function TwitterPostRoot({
  onLike,
  onReply,
  onRetweet,
  className,
  children,
  ...props
}: TwitterPostProps) {
  return (
    <Provider value={{ onLike, onReply, onRetweet }}>
      <article
        className={cn(
          "w-full space-y-3 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <Header />
            <Text />
            <Media />
            <Metrics />
            <Actions />
          </>
        )}
      </article>
    </Provider>
  );
}

export const TwitterPost = Object.assign(TwitterPostRoot, {
  Actions,
  Header,
  Media,
  Metrics,
  Text,
});
