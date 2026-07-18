"use client";

import {
  ChatConversation,
  ChatConversationMessages,
} from "@/registry/messaging/chat-conversation";

export default function ChatConversationDemo() {
  return (
    <ChatConversation>
      <ChatConversationMessages />
    </ChatConversation>
  );
}
