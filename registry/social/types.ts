export interface SocialProfile {
  avatar?: string;
  handle?: string;
  name: string;
}

export interface SocialMetrics {
  likes?: number;
  replies?: number;
  retweets?: number;
}

export interface VideoDetails {
  channel: string;
  description?: string;
  duration?: string;
  title: string;
}
