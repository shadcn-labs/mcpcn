"use client";

import { Bookmark, EyeOff, Flag, MoreHorizontal, Share } from "lucide-react";
import { createContext, createElement, useContext, useState } from "react";
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

interface YouTubePostData {
  avatar?: string;
  channel?: string;
  duration?: string;
  subscribers?: string;
  thumbnail?: string;
  time?: string;
  title?: string;
  verified?: boolean;
  videoId?: string;
  views?: string;
}

interface YouTubePostContextValue {
  data: YouTubePostData;
  isPlaying: boolean;
  play: () => void;
}

const DEFAULT_POST: YouTubePostData = {
  avatar: "M",
  channel: "mcpcn",
  duration: "15:42",
  thumbnail: "https://picsum.photos/seed/youtube-post/800/450",
  time: "3 days ago",
  title: "Building Agentic UIs with mcpcn",
  views: "12K",
};

const YouTubePostContext = createContext<YouTubePostContextValue | null>(null);

export const useYouTubePost = () => {
  const context = useContext(YouTubePostContext);
  if (!context) {
    throw new Error("YouTubePost components must be used within YouTubePost");
  }
  return context;
};

export interface YouTubePostProps extends ComponentProps<"article"> {
  data?: YouTubePostData;
}

const PlayButton = () => (
  <svg
    className="h-10 w-14 transition-transform hover:scale-105"
    viewBox="0 0 1024 721"
  >
    <path
      d="M1013 156.3s-10-70.4-40.6-101.4C933.6 14.2 890 14 870.1 11.6 727.1 1.3 512.7 1.3 512.7 1.3h-.4s-214.4 0-357.4 10.3C135 14 91.4 14.2 52.6 54.9 22 85.9 12 156.3 12 156.3S1.8 238.9 1.8 321.6v77.5C1.8 481.8 12 564.4 12 564.4s10 70.4 40.6 101.4c38.9 40.7 89.9 39.4 112.6 43.7 81.7 7.8 347.3 10.3 347.3 10.3s214.6-.3 357.6-10.7c20-2.4 63.5-2.6 102.3-43.3 30.6-31 40.6-101.4 40.6-101.4s10.2-82.7 10.2-165.3v-77.5c0-82.7-10.2-165.3-10.2-165.3zM407 493V206l276 144-276 143z"
      fill="#f00"
    />
    <path d="m407 493 276-143-276-144v287z" fill="#fff" />
  </svg>
);

export const YouTubePostPlayer = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const { data, isPlaying, play } = useYouTubePost();
  if (!(data.thumbnail || data.videoId)) {
    return null;
  }
  return (
    <div className={cn("relative aspect-video bg-black", className)} {...props}>
      {isPlaying && data.videoId ? (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="size-full"
          src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1`}
          title="YouTube video"
        />
      ) : (
        <>
          {data.thumbnail && (
            <BlockImage
              alt={
                data.title
                  ? `Video thumbnail: ${data.title}`
                  : "Video thumbnail"
              }
              className="size-full object-cover"
              src={data.thumbnail}
            />
          )}
          {data.videoId && (
            <button
              aria-label="Play video"
              className="absolute inset-0 flex cursor-pointer items-center justify-center"
              onClick={play}
              type="button"
            >
              <PlayButton />
            </button>
          )}
          {data.duration && (
            <div className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 font-medium text-white text-xs">
              {data.duration}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const YouTubePostMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <button
          className="shrink-0 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          type="button"
        />
      }
    >
      <MoreHorizontal className="size-5" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Bookmark className="mr-2 size-4" />
        Save to Watch later
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Share className="mr-2 size-4" />
        Share
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <EyeOff className="mr-2 size-4" />
        Not interested
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Flag className="mr-2 size-4" />
        Report
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const YouTubePostInfo = ({
  children,
  className,
  ...props
}: ComponentProps<"div"> & { children: React.ReactNode }) => (
  <div className={cn("p-3", className)} {...props}>
    {children}
  </div>
);

export const YouTubePostAvatar = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { data } = useYouTubePost();
  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-red-600 font-semibold text-sm text-white",
        className
      )}
      {...props}
    >
      {children ?? data.avatar}
    </div>
  );
};

export const YouTubePostDetails = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { data } = useYouTubePost();
  return (
    <div className={cn("min-w-0 flex-1", className)} {...props}>
      {children ?? (
        <>
          <h3 className="line-clamp-2 font-semibold text-sm leading-tight">
            {data.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1 text-muted-foreground text-xs">
            <span>{data.channel}</span>
            {data.verified && <span>✓</span>}
          </div>
          <p className="text-muted-foreground text-xs">
            {data.views}
            {data.views && data.time && " • "}
            {data.time}
          </p>
        </>
      )}
    </div>
  );
};

const YouTubePostRoot = ({
  children,
  className,
  data,
  ...props
}: YouTubePostProps & { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const context: YouTubePostContextValue = {
    data: { ...DEFAULT_POST, ...data },
    isPlaying,
    play: () => setIsPlaying(true),
  };
  return (
    <YouTubePostContext.Provider value={context}>
      <article
        className={cn("overflow-hidden rounded-xl border bg-card", className)}
        {...props}
      >
        {children}
      </article>
    </YouTubePostContext.Provider>
  );
};

export const YouTubePost = YouTubePostRoot;
