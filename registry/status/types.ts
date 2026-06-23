export type SharePlatform = "facebook" | "twitter" | "messenger" | "email";

export interface CompoundItem {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  price?: number;
  status?: "completed" | "current" | "pending" | string;
}
