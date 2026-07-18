"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { PostCard } from "./post-card";
import type { Post } from "./types";

export interface PostListProps {
  children?: ReactNode;
  data?: {
    /** Array of blog posts to display. */
    posts?: Post[];
  };
  actions?: {
    /** Called when the read more button is clicked on a post. */
    onReadMore?: (post: Post) => void;
  };
  appearance?: {
    /**
     * Layout variant for the post list.
     * @default "list"
     */
    variant?: "list" | "grid" | "carousel" | "fullwidth";
    /**
     * Number of columns for grid and fullwidth variants.
     * @default 2
     */
    columns?: 2 | 3 | 4;
    /**
     * Whether to show author information on post cards.
     * @default true
     */
    showAuthor?: boolean;
    /**
     * Whether to show category labels on post cards.
     * @default true
     */
    showCategory?: boolean;
  };
}

const DEFAULT_POSTS: Post[] = [
  {
    author: {
      avatar: "https://picsum.photos/seed/sarah/150/150",
      name: "Sarah Chen",
    },
    category: "Tutorial",
    coverImage: "https://picsum.photos/seed/post-list-1/800/450",
    excerpt:
      "Learn how to build conversational interfaces for AI-powered applications.",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    tags: ["Tutorial", "Components", "AI"],
    title: "Getting Started with Agentic UI Components",
  },
  {
    author: {
      avatar: "https://picsum.photos/seed/alex/150/150",
      name: "Alex Rivera",
    },
    category: "Design",
    coverImage: "https://picsum.photos/seed/post-list-2/800/450",
    excerpt: "Best practices for intuitive UI components in chat environments.",
    publishedAt: "2024-01-12",
    readTime: "8 min read",
    tags: ["Design", "UX"],
    title: "Designing for Conversational MCP Interfaces",
  },
  {
    author: {
      avatar: "https://picsum.photos/seed/jordan/150/150",
      name: "Jordan Kim",
    },
    category: "Development",
    coverImage: "https://picsum.photos/seed/post-list-3/800/450",
    excerpt: "Use Model Context Protocol for seamless backend communication.",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    tags: ["MCP", "Backend"],
    title: "MCP Integration Patterns",
  },
  {
    author: {
      avatar: "https://picsum.photos/seed/morgan/150/150",
      name: "Morgan Lee",
    },
    category: "Tutorial",
    coverImage: "https://picsum.photos/seed/post-list-4/800/450",
    excerpt:
      "A guide to secure payment experiences in conversational interfaces.",
    publishedAt: "2024-01-08",
    readTime: "10 min read",
    tags: ["Payments", "Security"],
    title: "Building Payment Flows in Chat",
  },
  {
    author: {
      avatar: "https://picsum.photos/seed/casey/150/150",
      name: "Casey Taylor",
    },
    category: "Development",
    coverImage: "https://picsum.photos/seed/post-list-5/800/450",
    excerpt:
      "Implement real-time updates for collaborative agentic experiences.",
    publishedAt: "2024-01-06",
    readTime: "15 min read",
    tags: ["WebSocket", "Real-time"],
    title: "Real-time Collaboration in AI Apps",
  },
];

const PostListContext = createContext<PostListProps | null>(null);

export const usePostList = () => {
  const context = useContext(PostListContext);
  if (!context) {
    throw new Error("PostList components must be used within PostList");
  }
  return context;
};

const PostListView = ({ data, actions, appearance }: PostListProps) => {
  const resolved: NonNullable<PostListProps["data"]> = data ?? {
    posts: DEFAULT_POSTS,
  };
  const posts = resolved.posts ?? [];
  const onReadMore = actions?.onReadMore;
  const variant = appearance?.variant ?? "list";
  const columns = appearance?.columns ?? 2;
  const showAuthor = appearance?.showAuthor ?? true;
  const showCategory = appearance?.showCategory ?? true;
  const [currentIndex, setCurrentIndex] = useState(0);
  if (variant === "list") {
    return (
      <div className="space-y-3 m-3 bg-card rounded-lg p-3">
        {posts.slice(0, 3).map((post) => (
          <PostCard
            key={post.title || post.url}
            data={{ post }}
            appearance={{ showAuthor, showCategory, variant: "horizontal" }}
            actions={{ onReadMore }}
          />
        ))}
      </div>
    );
  }
  if (variant === "grid") {
    return (
      <div
        className={cn(
          "grid gap-4 grid-cols-1",
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
        )}
      >
        {posts.slice(0, 4).map((post) => (
          <PostCard
            key={post.title || post.url}
            data={{ post }}
            appearance={{
              showAuthor,
              showCategory,
              showImage: false,
              variant: "compact",
            }}
            actions={{ onReadMore }}
          />
        ))}
      </div>
    );
  }
  if (variant === "fullwidth") {
    const getGridColsClass = () => {
      switch (columns) {
        case 2: {
          return "sm:grid-cols-2";
        }
        case 3: {
          return "sm:grid-cols-2 lg:grid-cols-3";
        }
        case 4: {
          return "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
        }
        default: {
          return "sm:grid-cols-2";
        }
      }
    };

    return (
      <div className="space-y-6 p-6">
        <div className={cn("grid gap-6 grid-cols-1", getGridColsClass())}>
          {posts.map((post) => (
            <PostCard
              key={post.title || post.url}
              data={{ post }}
              appearance={{ showAuthor, showCategory, variant: "default" }}
              actions={{ onReadMore }}
            />
          ))}
        </div>
      </div>
    );
  }
  const maxIndexMobile = posts.length - 1;
  const maxIndexTablet = Math.max(0, posts.length - 2);
  const maxIndexDesktop = Math.max(0, posts.length - 3);

  const prev = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const next = () => {
    setCurrentIndex((i) => i + 1);
  };

  const isAtStart = currentIndex === 0;
  const isAtEndMobile = currentIndex >= maxIndexMobile;
  const isAtEndTablet = currentIndex >= maxIndexTablet;
  const isAtEndDesktop = currentIndex >= maxIndexDesktop;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        {/* Mobile: 1 card, slides by 100% */}
        <div
          className="flex transition-transform duration-300 ease-out md:hidden"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {posts.map((post) => (
            <div
              key={post.title || post.url}
              className="w-full shrink-0 px-0.5"
            >
              <PostCard
                data={{ post }}
                appearance={{ showAuthor, showCategory, variant: "compact" }}
                actions={{ onReadMore }}
              />
            </div>
          ))}
        </div>

        {/* Tablet: 2 cards visible, slides by 50% */}
        <div
          className="hidden md:flex lg:hidden transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {posts.map((post) => (
            <div key={post.title || post.url} className="w-1/2 shrink-0 px-1.5">
              <PostCard
                data={{ post }}
                appearance={{ showAuthor, showCategory, variant: "compact" }}
                actions={{ onReadMore }}
              />
            </div>
          ))}
        </div>

        {/* Desktop: 3 cards visible, slides by 33.333% */}
        <div
          className="hidden lg:flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {posts.map((post) => (
            <div key={post.title || post.url} className="w-1/3 shrink-0 px-1.5">
              <PostCard
                data={{ post }}
                appearance={{ showAuthor, showCategory, variant: "compact" }}
                actions={{ onReadMore }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between px-2">
        <div className="flex gap-1">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all cursor-pointer",
                i === currentIndex
                  ? "w-4 bg-foreground"
                  : "w-1.5 bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
        {/* Mobile navigation */}
        <div className="flex gap-1 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={prev}
            disabled={isAtStart}
            aria-label="Previous post"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={next}
            disabled={isAtEndMobile}
            aria-label="Next post"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        {/* Tablet navigation */}
        <div className="hidden md:flex lg:hidden gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={prev}
            disabled={isAtStart}
            aria-label="Previous post"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={next}
            disabled={isAtEndTablet}
            aria-label="Next post"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        {/* Desktop navigation */}
        <div className="hidden lg:flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={prev}
            disabled={isAtStart}
            aria-label="Previous post"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={next}
            disabled={isAtEndDesktop}
            aria-label="Next post"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const PostListContent = (props: PostListProps) => {
  const context = usePostList();
  return <PostListView {...context} {...props} />;
};

const PostListRoot = ({ children, ...props }: PostListProps) => (
  <PostListContext.Provider value={props}>
    {children ?? <PostListContent />}
  </PostListContext.Provider>
);

export const PostList = PostListRoot;
