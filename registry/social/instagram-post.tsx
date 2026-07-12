"use client";

import { Heart, MessageCircle, Send } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { createCompoundContext } from "../_lib/compound";

interface InstagramContextValue {
  onComment?: () => void;
  onLike?: () => void;
  onShare?: () => void;
}

const { Provider, useCompoundContext } =
  createCompoundContext<InstagramContextValue>("InstagramPost");

export interface InstagramPostProps extends ComponentPropsWithoutRef<"article"> {
  onComment?: () => void;
  onLike?: () => void;
  onShare?: () => void;
}

interface HeaderProps extends ComponentPropsWithoutRef<"div"> {
  avatar?: string;
  handle?: string;
  name?: string;
}
function Header({
  avatar,
  handle = "@manifestui",
  name = "Manifest UI",
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
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">{handle}</p>
      </div>
      {children}
    </div>
  );
}

interface ImageProps extends ComponentPropsWithoutRef<"div"> {
  alt?: string;
  src?: string;
}
function Image({
  alt = "Post image",
  src,
  className,
  children,
  ...props
}: ImageProps) {
  useCompoundContext();
  return (
    <div
      className={cn("overflow-hidden rounded-lg bg-muted", className)}
      {...props}
    >
      {children ??
        (src ? (
          <img
            src={src}
            alt={alt}
            className="aspect-square w-full object-cover"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center text-sm text-muted-foreground">
            Post image
          </div>
        ))}
    </div>
  );
}

interface CaptionProps extends ComponentPropsWithoutRef<"p"> {
  handle?: string;
  text?: string;
}
function Caption({
  handle = "manifestui",
  text = "Building interfaces that agents and people can understand.",
  className,
  children,
  ...props
}: CaptionProps) {
  useCompoundContext();
  return (
    <p className={cn("text-sm", className)} {...props}>
      {children ?? (
        <>
          <span className="font-semibold">{handle}</span> {text}
        </>
      )}
    </p>
  );
}

function Actions({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { onComment, onLike, onShare } = useCompoundContext();
  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      {children ?? (
        <>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Like"
            onClick={onLike}
          >
            <Heart />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Comment"
            onClick={onComment}
          >
            <MessageCircle />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Share"
            onClick={onShare}
          >
            <Send />
          </Button>
        </>
      )}
    </div>
  );
}

function InstagramPostRoot({
  onComment,
  onLike,
  onShare,
  className,
  children,
  ...props
}: InstagramPostProps) {
  return (
    <Provider value={{ onComment, onLike, onShare }}>
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
            <Image />
            <Actions />
            <Caption />
          </>
        )}
      </article>
    </Provider>
  );
}

export const InstagramPost = Object.assign(InstagramPostRoot, {
  Actions,
  Caption,
  Header,
  Image,
});
