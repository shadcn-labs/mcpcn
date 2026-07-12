export type SharePlatform = "facebook" | "twitter" | "messenger" | "email";

export interface EventDetails {
  eventDate?: string;
  eventLocation?: string;
  eventTitle: string;
  recipientEmail?: string;
  ticketCount?: number;
}

export interface TicketTier {
  description?: string;
  label: string;
  price: number;
  soldOut?: boolean;
  value: string;
}

export interface Seat {
  disabled?: boolean;
  id: string;
}
