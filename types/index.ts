export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  weight: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  badge?: string;
  featured?: boolean;
  bestseller?: boolean;
  inStock: boolean;
};

export type Category = {
  id: string;
  slug: string;
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
  photo: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: "shipping" | "purity" | "storage" | "returns" | "delivery";
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  span?: "tall" | "wide" | "normal";
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type NavItem = {
  label: string;
  href: string;
};
