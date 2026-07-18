"use client";

import { Check, CheckCheck, Smile } from "lucide-react";
import {
  createContext,
  createElement,
  useContext,
  useRef,
  useState,
} from "react";
import type { ImgHTMLAttributes, ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const BlockImage = (props: ImgHTMLAttributes<HTMLImageElement>) =>
  createElement("img", props);

/**
 * Internal avatar component options.
 * @interface InternalAvatarOptions
 * @property {string} [src] - Avatar image URL
 * @property {string} fallback - Fallback letter when image fails or is missing
 * @property {string} [className] - Additional CSS classes
 */
interface InternalAvatarOptions {
  src?: string;
  fallback: string;
  className?: string;
}

const Avatar = ({ src, fallback, className }: InternalAvatarOptions) => {
  const [imgError, setImgError] = useState(false);

  if (src && !imgError) {
    return (
      <BlockImage
        src={src}
        alt={fallback}
        onError={() => setImgError(true)}
        className={cn("size-8 rounded-full object-cover shrink-0", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0",
        className
      )}
    >
      {fallback}
    </div>
  );
};

interface MessageMetadataProps {
  isOwn: boolean;
  status?: "sent" | "delivered" | "read";
  time?: string;
}

const MessageMetadata = ({ isOwn, status, time }: MessageMetadataProps) => (
  <div className={cn("mt-1 flex items-center gap-1", isOwn && "justify-end")}>
    {time && <span className="text-[10px] text-muted-foreground">{time}</span>}
    {isOwn && status && (
      <span className="text-muted-foreground">
        {status === "sent" && <Check className="size-3" />}
        {status === "delivered" && <CheckCheck className="size-3" />}
        {status === "read" && <CheckCheck className="size-3 text-foreground" />}
      </span>
    )}
  </div>
);

export interface MessageBubbleProps {
  children?: ReactNode;
  data?: {
    /** Message text content to display. */
    content?: string;
    /** URL for the sender's avatar image. */
    avatarUrl?: string;
    /** Fallback letter to display when avatar image is unavailable. */
    avatarFallback?: string;
    /** Display name of the message author. */
    author?: string;
    /** Time display string (e.g., "10:30 AM"). */
    time?: string;
  };
  appearance?: {
    /**
     * Whether this message is from the current user.
     * @default false
     */
    isOwn?: boolean;
  };
  control?: {
    /** Message delivery status indicator. */
    status?: "sent" | "delivered" | "read";
  };
}

const DEFAULT_TEXT_MESSAGE = {
  avatarFallback: "S",
  avatarUrl: "https://picsum.photos/seed/sarah/150/150",
  content: "Hey! How are you doing today?",
  time: "Dec 8, 10:30 AM",
} satisfies NonNullable<MessageBubbleProps["data"]>;

const MessageBubbleContext = createContext<MessageBubbleProps | null>(null);

export const useMessageBubble = () => {
  const context = useContext(MessageBubbleContext);
  if (!context) {
    throw new Error(
      "MessageBubble components must be used within MessageBubble"
    );
  }
  return context;
};

const MessageBubbleView = ({
  data,
  appearance,
  control,
}: MessageBubbleProps) => {
  const resolved: NonNullable<MessageBubbleProps["data"]> =
    data ?? DEFAULT_TEXT_MESSAGE;
  const { content } = resolved;
  const { avatarFallback } = resolved;
  const { avatarUrl } = resolved;
  const { time } = resolved;
  const { isOwn = false } = appearance ?? {};
  const { status } = control ?? {};
  return (
    <div className={cn("flex gap-2", isOwn && "flex-row-reverse")}>
      {!isOwn && avatarFallback && (
        <Avatar src={avatarUrl} fallback={avatarFallback} />
      )}
      <div className={cn("max-w-[75%]", isOwn && "items-end")}>
        {content && (
          <div
            className={cn(
              "rounded-2xl px-4 py-2",
              isOwn
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-muted rounded-bl-md"
            )}
          >
            <p className="text-sm">{content}</p>
          </div>
        )}
        <MessageMetadata isOwn={isOwn} status={status} time={time} />
      </div>
    </div>
  );
};

export const MessageBubbleContent = (props: MessageBubbleProps) => {
  const context = useMessageBubble();
  return <MessageBubbleView {...context} {...props} />;
};

const MessageBubbleRoot = ({ children, ...props }: MessageBubbleProps) => (
  <MessageBubbleContext.Provider value={props}>
    {children ?? <MessageBubbleContent />}
  </MessageBubbleContext.Provider>
);

export const MessageBubble = MessageBubbleRoot;

export interface ImageMessageBubbleProps {
  data?: {
    /** URL of the image to display. */
    image?: string;
    /** Optional caption text below the image. */
    content?: string;
    /** URL for the sender's avatar image. */
    avatarUrl?: string;
    /** Fallback letter to display when avatar image is unavailable. */
    avatarFallback?: string;
    /** Display name of the message author. */
    author?: string;
    /** Time display string (e.g., "10:32 AM"). */
    time?: string;
  };
  appearance?: {
    /**
     * Whether this message is from the current user.
     * @default false
     */
    isOwn?: boolean;
  };
  control?: {
    /** Message delivery status indicator. */
    status?: "sent" | "delivered" | "read";
  };
}

const DEFAULT_IMAGE_MESSAGE = {
  avatarFallback: "A",
  avatarUrl: "https://picsum.photos/seed/alex/150/150",
  content: "Check out this view!",
  image: "https://picsum.photos/seed/message-attachment/400/300",
  time: "Dec 8, 2:45 PM",
} satisfies NonNullable<ImageMessageBubbleProps["data"]>;

export const ImageMessageBubble = ({
  data,
  appearance,
  control,
}: ImageMessageBubbleProps) => {
  const resolved: NonNullable<ImageMessageBubbleProps["data"]> =
    data ?? DEFAULT_IMAGE_MESSAGE;
  const { image } = resolved;
  const { content } = resolved;
  const { avatarFallback } = resolved;
  const { avatarUrl } = resolved;
  const { time } = resolved;
  const { isOwn = false } = appearance ?? {};
  const { status } = control ?? {};
  return (
    <div className={cn("flex gap-2", isOwn && "flex-row-reverse")}>
      {!isOwn && avatarFallback && (
        <Avatar src={avatarUrl} fallback={avatarFallback} />
      )}
      <div className={cn("max-w-[75%]", isOwn && "items-end")}>
        {image && (
          <div
            className={cn(
              "rounded-2xl overflow-hidden",
              isOwn ? "rounded-br-md" : "rounded-bl-md"
            )}
          >
            <BlockImage
              src={image}
              alt={content || "Shared image in chat"}
              className="w-full max-w-[280px] h-auto object-cover"
            />
            {content && (
              <div
                className={cn(
                  "px-3 py-2",
                  isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                <p className="text-sm">{content}</p>
              </div>
            )}
          </div>
        )}
        <MessageMetadata isOwn={isOwn} status={status} time={time} />
      </div>
    </div>
  );
};

export interface MessageWithReactionsProps {
  data?: {
    /** Message text content to display. */
    content?: string;
    /** URL for the sender's avatar image. */
    avatarUrl?: string;
    /** Fallback letter to display when avatar image is unavailable. */
    avatarFallback?: string;
    /** Display name of the message author. */
    author?: string;
    /** Time display string (e.g., "2:45 PM"). */
    time?: string;
    /** Array of reactions with emoji and count. */
    reactions?: { emoji: string; count: number }[];
  };
  actions?: {
    /** Called when the user adds or toggles a reaction emoji. */
    onReact?: (emoji: string) => void;
  };
  appearance?: {
    /**
     * Whether this message is from the current user.
     * @default false
     */
    isOwn?: boolean;
  };
}

const DEFAULT_REACTION_MESSAGE = {
  avatarFallback: "T",
  content: "We just hit 10,000 users!",
  reactions: [
    { count: 5, emoji: "🎉" },
    { count: 3, emoji: "❤️" },
    { count: 2, emoji: "👏" },
  ],
  time: "Dec 8, 4:20 PM",
} satisfies NonNullable<MessageWithReactionsProps["data"]>;

/**
 * Available emoji options for reactions.
 * @constant
 */
const availableEmojis = [
  "❤️",
  "👍",
  "👎",
  "😂",
  "😮",
  "😢",
  "🎉",
  "🔥",
  "👏",
  "💯",
];

export const MessageWithReactions = ({
  data,
  actions,
  appearance,
}: MessageWithReactionsProps) => {
  const resolved: NonNullable<MessageWithReactionsProps["data"]> =
    data ?? DEFAULT_REACTION_MESSAGE;
  const { content } = resolved;
  const { avatarFallback } = resolved;
  const { avatarUrl } = resolved;
  const { time } = resolved;
  const initialReactions = resolved.reactions ?? [];
  const { onReact } = actions ?? {};
  const { isOwn = false } = appearance ?? {};
  const [reactions, setReactions] = useState(initialReactions);
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());

  const handleReact = (emoji: string) => {
    const hasUserReacted = userReactions.has(emoji);
    const existingIndex = reactions.findIndex((r) => r.emoji === emoji);

    if (hasUserReacted) {
      if (existingIndex !== -1) {
        const updated = [...reactions];
        if (updated[existingIndex].count <= 1) {
          updated.splice(existingIndex, 1);
        } else {
          updated[existingIndex] = {
            ...updated[existingIndex],
            count: updated[existingIndex].count - 1,
          };
        }
        setReactions(updated);
      }
      setUserReactions((prev) => {
        const next = new Set(prev);
        next.delete(emoji);
        return next;
      });
    } else {
      if (existingIndex === -1) {
        setReactions([...reactions, { count: 1, emoji }]);
      } else {
        const updated = [...reactions];
        updated[existingIndex] = {
          ...updated[existingIndex],
          count: updated[existingIndex].count + 1,
        };
        setReactions(updated);
      }
      setUserReactions((prev) => new Set(prev).add(emoji));
    }
    onReact?.(emoji);
  };

  return (
    <div className={cn("flex gap-2", isOwn && "flex-row-reverse")}>
      {!isOwn && avatarFallback && (
        <Avatar src={avatarUrl} fallback={avatarFallback} />
      )}
      <div className={cn("max-w-[75%]", isOwn && "items-end")}>
        {content && (
          <div
            className={cn(
              "rounded-2xl px-4 py-2",
              isOwn
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-muted rounded-bl-md"
            )}
          >
            <p className="text-sm">{content}</p>
          </div>
        )}
        <div
          className={cn(
            "flex items-center gap-1 mt-1.5",
            isOwn ? "justify-end" : "justify-start"
          )}
        >
          {reactions && reactions.length > 0 && (
            <>
              {reactions.map((reaction, index) => (
                <button
                  key={index}
                  onClick={() => handleReact(reaction.emoji)}
                  aria-label={`${userReactions.has(reaction.emoji) ? "Remove" : "Add"} ${reaction.emoji} reaction, ${reaction.count} ${reaction.count === 1 ? "reaction" : "reactions"}`}
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs transition-colors cursor-pointer",
                    userReactions.has(reaction.emoji)
                      ? "bg-primary/15 border border-primary/50"
                      : "bg-card border hover:bg-muted"
                  )}
                >
                  {reaction.emoji}
                  <span
                    className={cn(
                      userReactions.has(reaction.emoji)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {reaction.count}
                  </span>
                </button>
              ))}
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  aria-label="Add reaction"
                  className="inline-flex items-center justify-center size-6 bg-card border rounded-full hover:bg-muted transition-colors cursor-pointer"
                />
              }
            >
              <Smile className="size-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-2">
              <div className="grid grid-cols-5 gap-1">
                {availableEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReact(emoji)}
                    aria-label={`React with ${emoji}`}
                    className="size-8 flex items-center justify-center text-lg hover:bg-muted rounded transition-colors cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          className={cn("flex items-center gap-1 mt-1", isOwn && "justify-end")}
        >
          {time && (
            <span className="text-[10px] text-muted-foreground">{time}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export interface VoiceMessageBubbleProps {
  data?: {
    /** Total duration display string (e.g., "0:42"). */
    duration?: string;
    /** URL for the sender's avatar image. */
    avatarUrl?: string;
    /** Fallback letter to display when avatar image is unavailable. */
    avatarFallback?: string;
    /** Display name of the message author. */
    author?: string;
    /** Time display string (e.g., "3:15 PM"). */
    time?: string;
    /** URL of the audio file to play. */
    audioSrc?: string;
  };
  appearance?: {
    /**
     * Whether this message is from the current user.
     * @default false
     */
    isOwn?: boolean;
  };
  control?: {
    /** Message delivery status indicator. */
    status?: "sent" | "delivered" | "read";
  };
}

const DEFAULT_VOICE_MESSAGE = {
  avatarFallback: "M",
  avatarUrl: "https://picsum.photos/seed/mickael/150/150",
  duration: "0:42",
  time: "Dec 8, 3:15 PM",
} satisfies NonNullable<VoiceMessageBubbleProps["data"]>;

export const VoiceMessageBubble = ({
  data,
  appearance,
  control,
}: VoiceMessageBubbleProps) => {
  const resolved: NonNullable<VoiceMessageBubbleProps["data"]> =
    data ?? DEFAULT_VOICE_MESSAGE;
  const { duration } = resolved;
  const { avatarFallback } = resolved;
  const { avatarUrl } = resolved;
  const { time } = resolved;
  const { audioSrc } = resolved;
  const { isOwn = false } = appearance ?? {};
  const { status } = control ?? {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      setProgress((current / total) * 100);
      const mins = Math.floor(current / 60);
      const secs = Math.floor(current % 60);
      setCurrentTime(`${mins}:${secs.toString().padStart(2, "0")}`);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
  };

  return (
    <div className={cn("flex gap-2", isOwn && "flex-row-reverse")}>
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="metadata"
      >
        <track kind="captions" />
      </audio>
      {!isOwn && avatarFallback && (
        <Avatar src={avatarUrl} fallback={avatarFallback} />
      )}
      <div className={cn("max-w-[75%]", isOwn && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 flex items-center gap-3",
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted rounded-bl-md"
          )}
        >
          <button
            onClick={togglePlay}
            aria-label={
              isPlaying ? "Pause voice message" : "Play voice message"
            }
            className={cn(
              "size-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer",
              isOwn
                ? "bg-primary-foreground/20 hover:bg-primary-foreground/30"
                : "bg-foreground/10 hover:bg-foreground/20"
            )}
          >
            {isPlaying ? (
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="size-4 ml-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-1 bg-current/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-current rounded-full transition-all duration-100"
                style={{ width: `${progress || 33}%` }}
              />
            </div>
            <span className="text-xs font-medium">
              {isPlaying ? currentTime : (duration ?? "0:00")}
            </span>
          </div>
        </div>
        <MessageMetadata isOwn={isOwn} status={status} time={time} />
      </div>
    </div>
  );
};
