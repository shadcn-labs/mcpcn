"use client";

import {
  InstagramPost,
  InstagramPostActions,
  InstagramPostCaption,
  InstagramPostContent,
  InstagramPostFooter,
  InstagramPostHeader,
  InstagramPostLikes,
  InstagramPostMedia,
} from "@/registry/social/instagram-post";

export default function InstagramPostDemo() {
  return (
    <InstagramPost>
      <InstagramPostHeader />
      <InstagramPostMedia />
      <InstagramPostContent>
        <InstagramPostActions />
        <InstagramPostLikes />
        <InstagramPostCaption />
        <InstagramPostFooter />
      </InstagramPostContent>
    </InstagramPost>
  );
}
