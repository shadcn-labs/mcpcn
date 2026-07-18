"use client";

import { createContext, useContext } from "react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { ImageMessageBubble, MessageBubble } from "./message-bubble";
import type { ChatMessage } from "./types";

export type { ChatMessage } from "./types";

interface ChatConversationContextValue {
  messages: ChatMessage[];
}

const ChatConversationContext =
  createContext<ChatConversationContextValue | null>(null);

export const useChatConversation = () => {
  const context = useContext(ChatConversationContext);

  if (!context) {
    throw new Error(
      "ChatConversation components must be used within ChatConversation"
    );
  }

  return context;
};

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    author: "Sarah",
    avatarFallback: "S",
    content: "Hey! Check out this new feature we just shipped",
    time: "10:30 AM",
    type: "text",
  },
  {
    author: "You",
    avatarFallback: "Y",
    content: "Oh wow, that looks amazing! How long did it take to build?",
    isOwn: true,
    status: "read",
    time: "10:31 AM",
    type: "text",
  },
  {
    author: "Sarah",
    avatarFallback: "S",
    content: "Here's a preview of the dashboard",
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop",
    time: "10:32 AM",
    type: "image",
  },
  {
    author: "You",
    avatarFallback: "Y",
    content: "This is incredible! The UI is so clean",
    isOwn: true,
    status: "delivered",
    time: "10:33 AM",
    type: "text",
  },
];

export interface ChatConversationProps extends ComponentProps<"div"> {
  data?: {
    messages?: ChatMessage[];
  };
}

interface ChatConversationMessageProps extends ComponentProps<"div"> {
  message: ChatMessage;
}

export const ChatConversationMessage = ({
  children,
  message,
}: ChatConversationMessageProps) => {
  if (children) {
    return children;
  }

  const data = {
    author: message.author,
    avatarFallback: message.avatarFallback,
    avatarUrl: message.avatarUrl,
    content: message.content,
    time: message.time,
  };

  if ((message.type ?? "text") === "image") {
    return (
      <ImageMessageBubble
        appearance={{ isOwn: message.isOwn ?? false }}
        control={{ status: message.status }}
        data={{ ...data, image: message.image }}
      />
    );
  }

  return (
    <MessageBubble
      appearance={{ isOwn: message.isOwn ?? false }}
      control={{ status: message.status }}
      data={data}
    />
  );
};

export const ChatConversationMessages = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { messages } = useChatConversation();

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children ??
        messages.map((message, index) => (
          <ChatConversationMessage
            key={`${message.author ?? "message"}-${message.time ?? index}`}
            message={message}
          />
        ))}
    </div>
  );
};

const ChatConversationRoot = ({
  children,
  className,
  data,
  ...props
}: ChatConversationProps) => {
  const context: ChatConversationContextValue = {
    messages: data?.messages ?? DEFAULT_MESSAGES,
  };

  return (
    <ChatConversationContext.Provider value={context}>
      <div className={cn("rounded-xl bg-card p-4", className)} {...props}>
        {children ?? <ChatConversationMessages />}
      </div>
    </ChatConversationContext.Provider>
  );
};

export const ChatConversation = ChatConversationRoot;
