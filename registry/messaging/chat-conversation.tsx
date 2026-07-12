"use client";

import { createManifestCompound } from "@/components/ui/compound";

import { demoMessages } from "./demo/messaging";
import { ImageMessageBubble, MessageBubble } from "./message-bubble";
// Import types from shared types file to avoid circular dependencies
import type { ChatMessage } from "./types";
// Re-export for backward compatibility
export type { ChatMessage } from "./types";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ChatConversationProps
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Props for configuring a chat conversation component that displays multiple
 * messages with support for text and image message types.
 */
export interface ChatConversationProps {
  data?: {
    /** Array of chat messages to display in the conversation. */
    messages?: ChatMessage[];
  };
}

const ChatConversationView = ({ data }: ChatConversationProps) => {
  const resolved: NonNullable<ChatConversationProps["data"]> = data ?? {
    messages: demoMessages,
  };
  const { messages } = resolved;

  if (!messages || messages.length === 0) {
    return <div className="rounded-xl bg-card p-4" />;
  }

  return (
    <div className="rounded-xl bg-card p-4 space-y-4">
      {messages.map((message, index) => {
        const messageType = message.type ?? "text";
        const isOwn = message.isOwn ?? false;
        const messageKey = message.content
          ? `${message.author || ""}-${message.content.slice(0, 40)}`
          : `msg-${index}`;
        return messageType === "image" ? (
          <ImageMessageBubble
            key={messageKey}
            data={{
              author: message.author,
              avatarFallback: message.avatarFallback,
              avatarUrl: message.avatarUrl,
              content: message.content,
              image: message.image,
              time: message.time,
            }}
            appearance={{ isOwn }}
            control={{ status: message.status }}
          />
        ) : (
          <MessageBubble
            key={messageKey}
            data={{
              author: message.author,
              avatarFallback: message.avatarFallback,
              avatarUrl: message.avatarUrl,
              content: message.content,
              time: message.time,
            }}
            appearance={{ isOwn }}
            control={{ status: message.status }}
          />
        );
      })}
    </div>
  );
};

export const ChatConversation = createManifestCompound(
  ChatConversationView,
  "ChatConversation"
);
