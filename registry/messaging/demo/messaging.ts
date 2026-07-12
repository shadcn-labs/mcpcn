// Demo data for Messaging category components
// This file contains sample data used for component previews and documentation

import type { ChatMessage } from "../types";

// Default messages for ChatConversation
export const demoMessages: ChatMessage[] = [
  {
    author: "Sarah",
    avatarFallback: "S",
    content: "Hey! Check out this new feature we just shipped",
    isOwn: false,
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
    isOwn: false,
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

// Text message bubble data
export const demoTextMessages = [
  {
    avatarFallback: "S",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    content: "Hey! How are you doing today?",
    time: "Dec 8, 10:30 AM",
  },
  {
    avatarFallback: "Y",
    content: "I'm doing great, thanks for asking!",
    isOwn: true,
    status: "read" as const,
    time: "Dec 8, 10:31 AM",
  },
];

// Image message bubble data
export const demoImageMessages = [
  {
    avatarFallback: "A",
    avatarUrl: "https://i.pravatar.cc/150?u=alex",
    content: "Check out this view!",
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop",
    time: "Dec 8, 2:45 PM",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop",
    isOwn: true,
    status: "delivered" as const,
    time: "Dec 8, 2:46 PM",
  },
];

// Voice message bubble data
export const demoVoiceMessage = {
  avatarFallback: "M",
  avatarUrl: "https://i.pravatar.cc/150?u=mickael",
  duration: "0:42",
  time: "Dec 8, 3:15 PM",
};

// Reaction message data
export const demoReactionMessage = {
  avatarFallback: "T",
  content: "We just hit 10,000 users!",
  reactions: [
    { count: 5, emoji: "🎉" },
    { count: 3, emoji: "❤️" },
    { count: 2, emoji: "👏" },
  ],
  time: "Dec 8, 4:20 PM",
};
