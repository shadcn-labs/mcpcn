"use client";

import { Play } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

interface YoutubeContextValue {
  onPlay?: () => void;
  onSubscribe?: () => void;
}
const { Provider, useCompoundContext } =
  createCompoundContext<YoutubeContextValue>("YoutubeEmbed");

export interface YoutubeEmbedProps extends ComponentPropsWithoutRef<"article"> {
  onPlay?: () => void;
  onSubscribe?: () => void;
}

interface HeaderProps extends ComponentPropsWithoutRef<"div"> {
  avatar?: string;
  channel?: string;
  subscribers?: string;
}
function Header({
  avatar,
  channel = "Manifest UI",
  subscribers = "12.4K subscribers",
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
          {channel.charAt(0)}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{channel}</p>
        <p className="text-xs text-muted-foreground">{subscribers}</p>
      </div>
      {children}
    </div>
  );
}

interface ThumbnailProps extends ComponentPropsWithoutRef<"div"> {
  alt?: string;
  duration?: string;
  src?: string;
}
function VideoThumbnail({
  alt = "Video thumbnail",
  duration = "8:24",
  src,
  className,
  children,
  ...props
}: ThumbnailProps) {
  const { onPlay } = useCompoundContext();
  return (
    <div
      className={cn("relative overflow-hidden rounded-lg bg-muted", className)}
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
          <div className="aspect-video" />
        ))}
      <button
        type="button"
        aria-label="Play video"
        onClick={onPlay}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/75 text-white">
          <Play className="h-5 w-5 fill-current" />
        </span>
      </button>
      <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-xs text-white">
        {duration}
      </span>
    </div>
  );
}

interface DescriptionProps extends ComponentPropsWithoutRef<"div"> {
  description?: string;
  title?: string;
}
function Description({
  description = "Learn how composition-first blocks keep MCP App interfaces extensible.",
  title = "Build compound components for MCP Apps",
  className,
  children,
  ...props
}: DescriptionProps) {
  useCompoundContext();
  return (
    <div className={cn("text-sm", className)} {...props}>
      {children ?? (
        <>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-muted-foreground">{description}</p>
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
    <div className={cn("flex gap-2", className)} {...props}>
      {children ?? (
        <>
          <Button onClick={context.onPlay}>
            <Play />
            Play
          </Button>
          <Button variant="outline" onClick={context.onSubscribe}>
            Subscribe
          </Button>
        </>
      )}
    </div>
  );
}

function YoutubeEmbedRoot({
  onPlay,
  onSubscribe,
  className,
  children,
  ...props
}: YoutubeEmbedProps) {
  return (
    <Provider value={{ onPlay, onSubscribe }}>
      <article
        className={cn(
          "w-full space-y-4 rounded-xl border bg-card p-4 sm:p-6",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <Header />
            <VideoThumbnail />
            <Description />
            <Actions />
          </>
        )}
      </article>
    </Provider>
  );
}

export const YoutubeEmbed = Object.assign(YoutubeEmbedRoot, {
  Actions,
  Description,
  Header,
  VideoThumbnail,
});
