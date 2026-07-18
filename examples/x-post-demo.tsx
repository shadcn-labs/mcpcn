"use client";

import {
  XPost,
  XPostActions,
  XPostAvatar,
  XPostContent,
  XPostHeader,
  XPostText,
} from "@/registry/social/x-post";

export default function XPostDemo() {
  return (
    <XPost>
      <div className="flex gap-3">
        <XPostAvatar />
        <XPostContent>
          <XPostHeader />
          <XPostText />
          <XPostActions />
        </XPostContent>
      </div>
    </XPost>
  );
}
