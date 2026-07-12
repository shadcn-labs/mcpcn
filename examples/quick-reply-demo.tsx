"use client";

import { QuickReply } from "@/registry/selection/quick-reply";

export default function QuickReplyDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <QuickReply />
      <QuickReply>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <QuickReply.Content />
        </div>
      </QuickReply>
    </div>
  );
}
