export type ProductVariant = {
  /** Stable id used in the cart, e.g. "500g" */
  id: string;
  label: string;
  /** Retail price in PKR */
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
};

export type CategorySlug =
  | "dried-fruits"
  | "nuts"
  | "hunza-specialties"
  | "gift-sets";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: CategorySlug;
  /** Square, clean crop used on cards */
  image: string;
  /** Additional images shown on the detail page */
  gallery: string[];
  variants: ProductVariant[];
  highlights: string[];
  ingredients?: string;
  allergens?: string;
  /** Only set where origin is stated by the brand */
  origin?: string;
  storage: string;
  featured?: boolean;
  bestseller?: boolean;
  /** Higher = newer; used for "Newest" sort */
  addedOrder: number;
  wholesale: {
    /** Whether businesses can include this product in a quote request */
    available: boolean;
    /** Bulk pack formats. Empty = confirmed per inquiry. */
    bulkFormats: string[];
    /** Minimum order quantity text. null = quoted per inquiry. */
    moq: string | null;
  };
  /** Marks images that are temporary until authentic photography exists */
  placeholderImage?: boolean;
};

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  city: string;
  rating: number;
  review: string;
  /**
   * Only verified reviews are rendered. Set true once a review is confirmed
   * as a genuine customer review (e.g. from an order or WhatsApp record).
   */
  verified: boolean;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type CartLine = {
  slug: string;
  variantId: string;
  quantity: number;
};
