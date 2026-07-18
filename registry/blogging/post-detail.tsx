"use client";

import { Calendar, Clock, ExternalLink, Maximize2 } from "lucide-react";
import { createContext, createElement, useContext } from "react";
import type { ComponentProps, ImgHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Post } from "./types";

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

interface PostDetailContextValue {
  content?: string;
  displayMode: "fullscreen" | "inline" | "pip";
  onBack?: () => void;
  onReadMore?: () => void;
  onReadRelated?: (post: Post) => void;
  post: Post;
  relatedPosts: Post[];
  showAuthor: boolean;
  showCover: boolean;
}

const PostDetailContext = createContext<PostDetailContextValue | null>(null);

export const usePostDetail = () => {
  const context = useContext(PostDetailContext);
  if (!context) {
    throw new Error("PostDetail components must be used within PostDetail");
  }
  return context;
};

const DEFAULT_POST: Post = {
  author: {
    avatar: "https://i.pravatar.cc/150?u=sarah",
    name: "Sarah Chen",
  },
  category: "Tutorial",
  coverImage:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
  excerpt:
    "Learn how to build conversational interfaces for AI-powered applications.",
  publishedAt: "2024-01-15",
  readTime: "5 min read",
  tags: ["Tutorial", "Components", "AI", "React", "TypeScript"],
  title: "Getting Started with Agentic UI Components",
};

const DEFAULT_CONTENT = `
  <p>Building modern AI-powered applications requires a new approach to UI design. Traditional web components don't always translate well to conversational interfaces, where context and flow are paramount.</p>
  <p>Our Agentic UI component library provides purpose-built components that work seamlessly within chat interfaces.</p>
  <h2>Key Features</h2>
  <p>Each component supports inline, fullscreen, and picture-in-picture display modes while adapting to mobile devices and themes.</p>
`;

const DEFAULT_RELATED: Post[] = [
  {
    excerpt: "Best practices for intuitive UI components in chat environments.",
    readTime: "8 min read",
    title: "Designing for Conversational Interfaces",
    url: "https://example.com/posts/designing-conversational-interfaces",
  },
  {
    excerpt: "Use Model Context Protocol for seamless backend communication.",
    readTime: "12 min read",
    title: "MCP Integration Patterns",
    url: "https://example.com/posts/mcp-integration-patterns",
  },
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export interface PostDetailProps extends ComponentProps<"article"> {
  actions?: {
    onBack?: () => void;
    onReadMore?: () => void;
    onReadRelated?: (post: Post) => void;
  };
  appearance?: {
    displayMode?: "inline" | "pip" | "fullscreen";
    showAuthor?: boolean;
    showCover?: boolean;
  };
  data?: {
    content?: string;
    post?: Post;
    relatedPosts?: Post[];
  };
}

export const PostDetailCover = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const { post, showCover } = usePostDetail();
  if (!showCover) {
    return null;
  }
  return (
    <div className={cn("overflow-hidden bg-muted", className)} {...props}>
      {post.coverImage ? (
        <BlockImage
          alt={post.title ?? "Post cover"}
          className="size-full object-cover"
          src={post.coverImage}
        />
      ) : (
        <div className="size-full bg-muted" />
      )}
    </div>
  );
};

export const PostDetailAuthor = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { post, showAuthor } = usePostDetail();
  if (!showAuthor) {
    return null;
  }
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {children ?? (
        <>
          {post.author?.avatar && (
            <BlockImage
              alt={post.author.name ?? "Author"}
              className="size-9 rounded-full object-cover"
              src={post.author.avatar}
            />
          )}
          <div>
            {post.author?.name && (
              <p className="font-medium text-sm">{post.author.name}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {post.readTime}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const PostDetailHeader = ({
  children,
  className,
  ...props
}: ComponentProps<"header">) => {
  const { post } = usePostDetail();
  return (
    <header className={className} {...props}>
      {children ?? (
        <>
          {post.category && (
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              {post.category}
            </p>
          )}
          {post.title && (
            <h1 className="mt-2 font-bold text-2xl leading-tight sm:text-4xl">
              {post.title}
            </h1>
          )}
          {post.excerpt && (
            <p className="mt-3 text-muted-foreground sm:text-lg">
              {post.excerpt}
            </p>
          )}
          <PostDetailAuthor className="mt-5" />
        </>
      )}
    </header>
  );
};

export const PostDetailBody = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { content } = usePostDetail();
  if (children) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }
  if (!content) {
    return null;
  }
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-p:text-muted-foreground",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    />
  );
};

export const PostDetailRelated = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { onReadRelated, relatedPosts } = usePostDetail();
  if (!(children || relatedPosts.length > 0)) {
    return null;
  }
  return (
    <div className={cn("border-t pt-6", className)} {...props}>
      {children ?? (
        <>
          <h2 className="mb-4 font-semibold text-lg">Related posts</h2>
          <div className="space-y-2">
            {relatedPosts.map((post, index) => (
              <button
                className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted"
                key={`${post.title ?? "post"}-${index}`}
                onClick={() => onReadRelated?.(post)}
                type="button"
              >
                <div className="min-w-0 flex-1">
                  {post.title && <p className="font-medium">{post.title}</p>}
                  {post.excerpt && (
                    <p className="mt-1 line-clamp-1 text-muted-foreground text-sm">
                      {post.excerpt}
                    </p>
                  )}
                  {post.readTime && (
                    <p className="mt-1 text-muted-foreground text-xs">
                      {post.readTime}
                    </p>
                  )}
                </div>
                <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CompactPostDetail = () => {
  const { displayMode, onReadMore, post } = usePostDetail();
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <PostDetailCover className="aspect-video w-full" />
      <div className="p-4">
        {post.category && (
          <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
            {post.category}
          </p>
        )}
        {post.title && (
          <h2 className="mt-1 line-clamp-2 font-semibold text-xl">
            {post.title}
          </h2>
        )}
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-muted-foreground text-sm">
            {post.excerpt}
          </p>
        )}
        <PostDetailAuthor className="mt-4" />
        <Button className="mt-4 w-full" onClick={onReadMore} size="sm">
          {displayMode === "pip" ? "Open article" : "Read article"}
          <Maximize2 className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};

const FullPostDetail = () => (
  <div className="rounded-xl border bg-card">
    <PostDetailCover className="aspect-[21/9] w-full rounded-t-xl" />
    <div className="mx-auto max-w-3xl space-y-8 px-5 py-8 sm:px-8">
      <PostDetailHeader />
      <PostDetailBody />
      <PostDetailRelated />
    </div>
  </div>
);

export const PostDetailContent = () => {
  const { displayMode } = usePostDetail();
  return displayMode === "fullscreen" ? (
    <FullPostDetail />
  ) : (
    <CompactPostDetail />
  );
};

const PostDetailRoot = ({
  actions,
  appearance,
  children,
  className,
  data,
  ...props
}: PostDetailProps) => {
  const context: PostDetailContextValue = {
    content: data?.content ?? DEFAULT_CONTENT,
    displayMode: appearance?.displayMode ?? "inline",
    onBack: actions?.onBack,
    onReadMore: actions?.onReadMore,
    onReadRelated: actions?.onReadRelated,
    post: data?.post ?? DEFAULT_POST,
    relatedPosts: data?.relatedPosts ?? DEFAULT_RELATED,
    showAuthor: appearance?.showAuthor ?? true,
    showCover: appearance?.showCover ?? true,
  };
  return (
    <PostDetailContext.Provider value={context}>
      <article className={className} {...props}>
        {children ?? <PostDetailContent />}
      </article>
    </PostDetailContext.Provider>
  );
};

export const PostDetail = PostDetailRoot;
