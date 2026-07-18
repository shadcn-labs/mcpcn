"use client";

import {
  Bookmark,
  Code,
  Flag,
  Heart,
  Link,
  MessageCircle,
  MoreHorizontal,
  Send,
  UserMinus,
} from "lucide-react";
import { createContext, createElement, useContext } from "react";
import type { ComponentProps, ImgHTMLAttributes } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

interface InstagramPostData {
  author?: string;
  avatar?: string;
  caption?: string;
  image?: string;
  likes?: string;
  time?: string;
  verified?: boolean;
}

const DEFAULT_POST: InstagramPostData = {
  author: "mcpcn",
  avatar: "M",
  caption: "Building the future of agentic UIs, one component at a time.",
  image: "https://picsum.photos/seed/instagram-post/800/800",
  likes: "2,847",
  time: "2h",
  verified: true,
};

const InstagramPostContext = createContext<InstagramPostData | null>(null);

export const useInstagramPost = () => {
  const context = useContext(InstagramPostContext);
  if (!context) {
    throw new Error(
      "InstagramPost components must be used within InstagramPost"
    );
  }
  return context;
};

export interface InstagramPostProps extends ComponentProps<"article"> {
  data?: InstagramPostData;
}

const InstagramPostMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <button
          className="cursor-pointer text-foreground transition-colors hover:text-muted-foreground"
          type="button"
        />
      }
    >
      <MoreHorizontal className="size-5" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Flag className="mr-2 size-4" />
        Report
      </DropdownMenuItem>
      <DropdownMenuItem>
        <UserMinus className="mr-2 size-4" />
        Unfollow
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link className="mr-2 size-4" />
        Copy link
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Code className="mr-2 size-4" />
        Embed
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const InstagramPostHeader = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const data = useInstagramPost();
  return (
    <div
      className={cn("flex items-center justify-between p-3", className)}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex items-center gap-2">
            {data.avatar && (
              <div className="size-8 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-0.5">
                <div className="flex size-full items-center justify-center rounded-full bg-card font-semibold text-xs">
                  {data.avatar}
                </div>
              </div>
            )}
            <div className="flex items-center gap-1">
              {data.author && (
                <span className="font-semibold text-sm">{data.author}</span>
              )}
              {data.verified && (
                <span className="flex size-3.5 items-center justify-center rounded-full bg-blue-500 text-[9px] text-white">
                  ✓
                </span>
              )}
            </div>
          </div>
          <InstagramPostMenu />
        </>
      )}
    </div>
  );
};

export const InstagramPostMedia = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const data = useInstagramPost();
  if (!data.image) {
    return null;
  }
  return (
    <div className={cn("aspect-square bg-muted", className)} {...props}>
      <BlockImage
        alt={
          data.author ? `Instagram post by ${data.author}` : "Instagram post"
        }
        className="size-full object-cover"
        src={data.image}
      />
    </div>
  );
};

export const InstagramPostActions = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn("flex items-center justify-between", className)}
    {...props}
  >
    {children ?? (
      <>
        <div className="flex items-center gap-4">
          <button
            aria-label="Like"
            className="cursor-pointer transition-colors hover:text-muted-foreground"
            type="button"
          >
            <Heart className="size-6" />
          </button>
          <button
            aria-label="Comment"
            className="cursor-pointer transition-colors hover:text-muted-foreground"
            type="button"
          >
            <MessageCircle className="size-6" />
          </button>
          <button
            aria-label="Share"
            className="cursor-pointer transition-colors hover:text-muted-foreground"
            type="button"
          >
            <Send className="size-6" />
          </button>
        </div>
        <button
          aria-label="Save"
          className="cursor-pointer transition-colors hover:text-muted-foreground"
          type="button"
        >
          <Bookmark className="size-6" />
        </button>
      </>
    )}
  </div>
);

export const InstagramPostContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const data = useInstagramPost();
  return (
    <div className={cn("space-y-2 p-3", className)} {...props}>
      {children ?? (
        <>
          <InstagramPostActions />
          {data.likes && (
            <p className="font-semibold text-sm">{data.likes} likes</p>
          )}
          {(data.author || data.caption) && (
            <p className="text-sm">
              {data.author && (
                <span className="font-semibold">{data.author}</span>
              )}
              {data.author && data.caption && " "}
              {data.caption}
            </p>
          )}
          {data.time && (
            <p className="text-muted-foreground text-xs">{data.time}</p>
          )}
        </>
      )}
    </div>
  );
};

const InstagramPostRoot = ({
  children,
  className,
  data,
  ...props
}: InstagramPostProps) => {
  const value = data ?? DEFAULT_POST;
  return (
    <InstagramPostContext.Provider value={value}>
      <article
        className={cn("overflow-hidden rounded-xl border bg-card", className)}
        {...props}
      >
        {children ?? (
          <>
            <InstagramPostHeader />
            <InstagramPostMedia />
            <InstagramPostContent />
          </>
        )}
      </article>
    </InstagramPostContext.Provider>
  );
};

export const InstagramPost = InstagramPostRoot;
