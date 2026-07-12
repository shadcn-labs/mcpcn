"use client";

import { XPost } from "@/registry/social/x-post";

export default function XPostDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <XPost />
      <XPost>
        <div className="space-y-3">
          <p className="font-medium text-sm">Custom heading</p>
          <XPost.Content />
        </div>
      </XPost>
    </div>
  );
}
