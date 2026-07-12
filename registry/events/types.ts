// Shared types for Events category components

/**
 * Status indicators for events.
 * @typedef {"going-fast" | "popular" | "just-added" | "sales-end-soon" | "few-tickets-left" | "canceled" | "ended" | "postponed"} EventSignal
 */
export type EventSignal =
  | "going-fast"
  | "popular"
  | "just-added"
  | "sales-end-soon"
  | "few-tickets-left"
  | "canceled"
  | "ended"
  | "postponed";

/**
 * Descriptive tags for event atmosphere and vibe.
 * @typedef VibeTag
 */
export type VibeTag =
  | "All night"
  | "Beginner-friendly"
  | "Casual"
  | "Chill"
  | "Classic"
  | "Cocktails"
  | "Creative"
  | "Date night"
  | "Discover"
  | "Dressy"
  | "Educational"
  | "Exciting"
  | "Exclusive"
  | "Family-friendly"
  | "Fun"
  | "Hands-on"
  | "High energy"
  | "Immersive"
  | "Interactive"
  | "Intimate"
  | "Kids"
  | "Late night"
  | "Legendary"
  | "Outdoor"
  | "Premium"
  | "Relaxing"
  | "Scenic"
  | "Social"
  | "Sophisticated"
  | "Tasting"
  | "Underground"
  | "Upscale"
  | "Views"
  | "Wellness";

/**
 * Represents a basic event with essential information.
 * @interface Event
 * @property {string} id - Unique identifier
 * @property {string} title - Event title
 * @property {string} category - Event category (Music, Comedy, etc.)
 * @property {string} venue - Venue name
 * @property {string | null} [neighborhood] - Neighborhood/district
 * @property {string} city - City name
 * @property {string} dateTime - Display format date/time
 * @property {string} priceRange - Price display (e.g., "$45 - $150", "Free")
 * @property {string} [image] - Cover image URL
 * @property {{ lat: number; lng: number }} [coordinates] - Map coordinates
 * @property {VibeTag[]} [vibeTags] - Atmosphere/vibe tags
 * @property {string} [vibeDescription] - Vibe description text
 * @property {string} [aiSummary] - AI-generated summary
 * @property {string[]} [lineup] - Performer lineup
 * @property {string[]} [ticketTiers] - Available ticket tiers
 * @property {EventSignal} [eventSignal] - Status signal
 * @property {number} [organizerRating] - Organizer rating
 * @property {number} [reviewCount] - Number of reviews
 * @property {number} [venueRating] - Venue rating
 * @property {string | null} [ageRestriction] - Age restriction
 * @property {boolean} [hasMultipleDates] - Whether event has multiple dates
 * @property {string} [discount] - Discount text
 */
export interface Event {
  title?: string;
  // "Music", "Comedy", "Classes", "Nightlife", "Sports", "Food & Drink", "Arts", "Film", "Networking", "Festivals", "Wellness", "Social", "Games", "Gallery"
  category?: string;
  venue?: string;
  neighborhood?: string | null;
  city?: string;
  // Display format: "Tonight 9:00 PM - 3:00 AM", "Tomorrow 6:00 AM", "In 2 days 8:00 PM"
  dateTime: string;
  // "$45 - $150", "Free", "Free - $5"
  priceRange?: string;
  // Cover image URL for the event
  image?: string;
  // For map display in fullscreen mode
  coordinates?: { lat: number; lng: number };
  vibeTags?: VibeTag[];
  vibeDescription?: string;
  // AI-generated match explanation
  aiSummary?: string;
  lineup?: string[];
  // ["General Admission $45", "VIP Access $120"]
  ticketTiers?: string[];
  eventSignal?: EventSignal;
  organizerRating?: number;
  reviewCount?: number;
  venueRating?: number;
  // "21+", "18+", "Ages 5-12", null
  ageRestriction?: string | null;
  hasMultipleDates?: boolean;
  // "TONIGHT ONLY - 40% OFF", "FREE - First 50 Only"
  discount?: string;
}

/**
 * Represents an event organizer.
 * @interface Organizer
 * @property {string} id - Unique identifier
 * @property {string} [name] - Organizer name
 * @property {string} [image] - Profile image URL
 * @property {number} rating - Average rating
 * @property {number} reviewCount - Number of reviews
 * @property {boolean} [verified] - Whether organizer is verified
 * @property {number} [followers] - Follower count
 * @property {number} [eventsCount] - Total events hosted
 * @property {number} [hostingYears] - Years hosting events
 * @property {"very responsive" | "responsive" | "slow"} [responseRate] - Response speed
 * @property {"great" | "good" | "new"} [trackRecord] - Track record rating
 */
export interface Organizer {
  name?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  followers?: number;
  eventsCount?: number;
  hostingYears?: number;
  responseRate?: "very responsive" | "responsive" | "slow";
  trackRecord?: "great" | "good" | "new";
}

/**
 * Represents a ticket selection with tier and quantity.
 * @interface TicketSelection
 * @property {string} tierId - Selected tier ID
 * @property {number} quantity - Number of tickets
 */
export interface TicketSelection {
  tierIndex: number;
  quantity: number;
}

/**
 * Represents a completed event booking.
 * @interface EventBooking
 * @property {string} id - Booking ID
 * @property {Event} event - The booked event
 * @property {{ tierName: string; quantity: number; price: number }[]} tickets - Purchased tickets
 * @property {number} total - Total amount paid
 * @property {number} fees - Service fees
 * @property {string} confirmationCode - Confirmation code
 * @property {string} [qrCode] - QR code image URL
 * @property {string} purchaseDate - Purchase date string
 */
export interface EventBooking {
  event: Event;
  tickets?: { tierName: string; quantity: number; price: number }[];
  total?: number;
  fees?: number;
  confirmationCode?: string;
  qrCode?: string;
  purchaseDate?: string;
}

/**
 * Extended Event with full details for event-detail component.
 * Includes additional fields for comprehensive event display.
 * @interface EventDetails
 * @augments {Omit<Event, 'dateTime'>}
 */
export interface EventDetails extends Omit<Event, "dateTime"> {
  // Override dateTime with ISO format dates for dynamic formatting
  // ISO format: "2025-01-11T21:00:00Z"
  startDateTime?: string;
  // ISO format: "2025-01-12T03:00:00Z"
  endDateTime?: string;
  // Event location type
  locationType?: "physical" | "online" | "hybrid";
  // Multiple images for carousel
  images?: string[];
  description?: string;
  organizer?: Organizer;
  // Street address for the venue
  address?: string;
  venue_details?: {
    name: string;
    address: string;
    city: string;
    coordinates?: { lat: number; lng: number };
  };
  // For map display
  coordinates?: { lat: number; lng: number };
  // "537 going"
  attendeesCount?: number;
  friendsGoing?: { name: string; avatar?: string }[];
  // "2 hours", "In person"
  highlights?: string[];
  tiers?: {
    name: string;
    price: number;
    available: number;
    benefits?: string[];
  }[];
  goodToKnow?: {
    accessibility?: string[];
    dressCode?: string;
    parking?: string;
    duration?: string;
    doorsOpen?: string;
    showtime?: string;
    ageRestriction?: string;
  };
  amenities?: string[];
  policies?: {
    refund?: string;
    entry?: string;
    idRequired?: boolean;
    securityOnSite?: boolean;
    items?: string[];
  };
  faq?: { question: string; answer: string }[];
  relatedEvents?: Event[];
  // "Los Angeles Events", "California Nightlife"
  relatedTags?: string[];
}
