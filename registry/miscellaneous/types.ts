export interface RatingValue {
  feedback?: string;
  rating: number;
}

export interface Testimonial {
  author: string;
  company?: string;
  quote: string;
  rating?: number;
  role?: string;
}
