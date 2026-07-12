"use client";

import { ChatConversation } from "@/registry/messaging/chat-conversation";

export default function ChatConversationDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChatConversation />
      <ChatConversation>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <ChatConversation.Content />
        </div>
      </ChatConversation>
    </div>
  );
}
