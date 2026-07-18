"use client";

import { createContext, createElement, useContext } from "react";
import type { ComponentProps, ImgHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Post } from "./types";

export type { Post } from "./types";

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

interface PostCardContextValue {
  onReadMore?: (post: Post) => void;
  post: Post;
  showAuthor: boolean;
  showCategory: boolean;
  showImage: boolean;
  variant: "compact" | "covered" | "default" | "horizontal";
}

const PostCardContext = createContext<PostCardContextValue | null>(null);

export const usePostCard = () => {
  const context = useContext(PostCardContext);
  if (!context) {
    throw new Error("PostCard components must be used within PostCard");
  }
  return context;
};

const DEFAULT_POST: Post = {
  author: {
    avatar: "https://picsum.photos/seed/sarah/150/150",
    name: "Sarah Chen",
  },
  category: "Tutorial",
  coverImage: "https://picsum.photos/seed/post-card/800/450",
  excerpt:
    "Learn how to build conversational interfaces with our comprehensive component library designed for AI-powered applications.",
  publishedAt: "2024-01-15",
  readTime: "5 min read",
  tags: ["Tutorial", "Components"],
  title: "Getting Started with Agentic UI Components",
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export interface PostCardProps extends ComponentProps<"article"> {
  actions?: {
    onReadMore?: (post: Post) => void;
  };
  appearance?: {
    showAuthor?: boolean;
    showCategory?: boolean;
    showImage?: boolean;
    variant?: "default" | "compact" | "horizontal" | "covered";
  };
  data?: {
    post?: Post;
  };
}

export const PostCardImage = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const { post, showImage } = usePostCard();
  if (!showImage) {
    return null;
  }
  return (
    <div className={cn("overflow-hidden bg-muted", className)} {...props}>
      {post.coverImage ? (
        <BlockImage
          alt={post.title ?? ""}
          className="size-full object-cover"
          src={post.coverImage}
        />
      ) : (
        <div className="size-full bg-muted" />
      )}
    </div>
  );
};

export const PostCardCategory = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => {
  const { post, showCategory } = usePostCard();
  if (!(showCategory && (children || post.category))) {
    return null;
  }
  return (
    <p
      className={cn(
        "font-medium text-[10px] text-muted-foreground uppercase tracking-wide",
        className
      )}
      {...props}
    >
      {children ?? post.category}
    </p>
  );
};

export const PostCardTags = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { post } = usePostCard();
  const tags = post.tags?.slice(0, 2) ?? [];
  if (!(children || tags.length > 0)) {
    return null;
  }
  return (
    <div className={cn("flex flex-wrap gap-1", className)} {...props}>
      {children ??
        tags.map((tag) => (
          <span
            className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs"
            key={tag}
          >
            {tag}
          </span>
        ))}
    </div>
  );
};

export const PostCardAuthor = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { post, showAuthor } = usePostCard();
  if (!showAuthor) {
    return null;
  }
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children ?? (
        <>
          {post.author?.avatar && (
            <BlockImage
              alt={post.author.name ?? ""}
              className="size-6 rounded-full object-cover"
              src={post.author.avatar}
            />
          )}
          <div className="text-xs">
            {post.author?.name && (
              <p className="font-medium">{post.author.name}</p>
            )}
            {post.publishedAt && (
              <p className="text-muted-foreground">
                {formatDate(post.publishedAt)}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const PostCardAction = ({
  children,
  ...props
}: ComponentProps<typeof Button>) => {
  const { onReadMore, post } = usePostCard();
  return (
    <Button onClick={() => onReadMore?.(post)} size="sm" {...props}>
      {children ?? "Read"}
    </Button>
  );
};

export const PostCardText = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { post } = usePostCard();
  return (
    <div className={className} {...props}>
      {children ?? (
        <>
          <PostCardCategory />
          {post.title && (
            <h3 className="line-clamp-2 font-medium text-sm leading-tight">
              {post.title}
            </h3>
          )}
          {post.excerpt && (
            <p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
              {post.excerpt}
            </p>
          )}
          <PostCardTags className="mt-1.5" />
        </>
      )}
    </div>
  );
};

const CoveredPostCard = () => {
  const { post } = usePostCard();
  return (
    <div className="relative overflow-hidden rounded-lg border">
      <PostCardImage className="min-h-[280px] w-full sm:aspect-[16/9] sm:min-h-0" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <PostCardCategory className="text-white/70" />
        {post.title && (
          <h2 className="mt-1 font-semibold text-lg leading-tight">
            {post.title}
          </h2>
        )}
        {post.excerpt && (
          <p className="mt-1 line-clamp-2 text-sm text-white/80">
            {post.excerpt}
          </p>
        )}
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PostCardAuthor className="[&_p:last-child]:text-white/60" />
          <PostCardAction className="w-full sm:w-auto" variant="secondary">
            Read article
          </PostCardAction>
        </div>
      </div>
    </div>
  );
};

const HorizontalPostCard = () => (
  <div className="flex flex-col gap-4 rounded-lg border bg-card p-3 sm:flex-row">
    <PostCardImage className="aspect-video shrink-0 rounded-md sm:aspect-square sm:size-24" />
    <div className="flex flex-1 flex-col justify-between">
      <PostCardText />
      <div className="mt-2 flex items-center justify-between">
        <PostCardAuthor />
        <PostCardAction />
      </div>
    </div>
  </div>
);

const CompactPostCard = () => (
  <div className="rounded-lg border bg-card p-3">
    <PostCardText />
    <div className="mt-3 flex items-center justify-between">
      <PostCardAuthor />
      <PostCardAction />
    </div>
  </div>
);

const DefaultPostCard = () => (
  <div className="overflow-hidden rounded-lg border bg-card">
    <PostCardImage className="aspect-video w-full" />
    <div className="p-4">
      <PostCardText />
      <div className="mt-4 flex items-center justify-between">
        <PostCardAuthor />
        <PostCardAction />
      </div>
    </div>
  </div>
);

export const PostCardContent = () => {
  const { variant } = usePostCard();
  if (variant === "covered") {
    return <CoveredPostCard />;
  }
  if (variant === "horizontal") {
    return <HorizontalPostCard />;
  }
  if (variant === "compact") {
    return <CompactPostCard />;
  }
  return <DefaultPostCard />;
};

const PostCardRoot = ({
  actions,
  appearance,
  children,
  className,
  data,
  ...props
}: PostCardProps) => {
  const context: PostCardContextValue = {
    onReadMore: actions?.onReadMore,
    post: data?.post ?? DEFAULT_POST,
    showAuthor: appearance?.showAuthor ?? true,
    showCategory: appearance?.showCategory ?? true,
    showImage: appearance?.showImage ?? true,
    variant: appearance?.variant ?? "default",
  };
  return (
    <PostCardContext.Provider value={context}>
      <article className={className} {...props}>
        {children ?? <PostCardContent />}
      </article>
    </PostCardContext.Provider>
  );
};

export const PostCard = PostCardRoot;
