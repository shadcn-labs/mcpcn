"use client";

import { MessageBubble } from "@/registry/messaging/message-bubble";

export default function MessageBubbleDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <MessageBubble />
      <MessageBubble>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <MessageBubble.Content />
        </div>
      </MessageBubble>
    </div>
  );
}
