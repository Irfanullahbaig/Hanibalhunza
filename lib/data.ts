import type { Category, FAQ, NavItem, Product, Testimonial } from "@/types";

export const siteConfig = {
  name: "Haniball Hunza",
  tagline: "Dried Fruits & Nuts from the Valleys of Hunza",
  description:
    "Sun-dried apricots, almonds, walnuts, Hunzai chocolate and organic shilajit from Hunza Valley—for everyday snacking, gifting and wholesale supply across Pakistan.",
  url: "https://haniballhunza.com",
  phone: "+92 3555380038",
  whatsapp: "923555380038",
  address: "Karimabad, Hunza Valley, Gilgit-Baltistan, Pakistan",
  social: {
    instagram: "https://instagram.com/haniballhunza",
    facebook: "https://facebook.com/haniballhunza",
    twitter: "https://twitter.com/haniballhunza",
  },
};

/**
 * Commerce settings. Values left null are not yet confirmed by the business
 * and are shown to customers as "confirmed with your order" rather than
 * guessed. Fill them in to show them on the cart and checkout.
 */
export const commerceConfig = {
  currency: "PKR",
  /** Flat delivery charge in PKR, or null when quoted per order */
  shippingFlatRate: null as number | null,
  /** Order subtotal (PKR) above which delivery is free, or null */
  freeShippingThreshold: null as number | null,
  /** e.g. ["Cash on delivery", "Bank transfer"]. Empty = confirmed on WhatsApp */
  paymentMethods: [] as string[],
  deliveryEstimate:
    "2–4 business days to major cities, 4–7 business days to remote areas.",
  deliveryCoverage: "Nationwide delivery across Pakistan",
  maxQuantityPerLine: 50,
};

/**
 * Wholesale programme settings. Nothing here is invented: everything not yet
 * confirmed is null/empty and the site says it is quoted per inquiry.
 */
export const wholesaleConfig = {
  /** Generic minimum order text, e.g. "From 10 kg per product". null = per quote */
  minimumOrder: null as string | null,
  /** Volume discount tiers. Empty = quoted per inquiry */
  volumePricing: [] as { from: string; discount: string }[],
  /** Set true once custom packaging / private label is offered */
  privateLabel: null as boolean | null,
  /** Dedicated wholesale email, if one exists */
  email: null as string | null,
  businessTypes: [
    "Retail store",
    "Supermarket / chain",
    "Distributor / wholesaler",
    "Restaurant / café",
    "Hotel / hospitality",
    "Corporate gifting",
    "Exporter / importer",
    "Other",
  ],
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const categories: Category[] = [
  {
    slug: "dried-fruits",
    name: "Dried Fruits",
    description: "Sun-dried Hunza apricots and mountain blends",
    image: "/images/products/dry-apricot.jpg",
  },
  {
    slug: "nuts",
    name: "Nuts & Kernels",
    description: "Hunza almonds and Omega-3 rich walnut kernels",
    image: "/images/products/dry-almond.jpg",
  },
  {
    slug: "hunza-specialties",
    name: "Hunza Specialties",
    description: "Kilawo walnut chocolate and organic shilajit",
    image: "/images/products/kilawo.jpg",
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    description: "Curated boxes for Eid, family and corporate gifting",
    image: "/images/products/mix-dry-fruits.jpg",
  },
];

const DRY_STORAGE =
  "Keep in an airtight container in a cool, dry place away from sunlight. Refrigerate in humid weather.";
const HUNZA_ORIGIN = "Hunza Valley, Gilgit-Baltistan, Pakistan";

export const products: Product[] = [
  {
    id: "1",
    slug: "dry-apricot",
    name: "Hunza Dried Apricots",
    shortDescription: "Sun-dried, naturally sweet apricots with no added sugar",
    description:
      "Hunza's best-known harvest. Our apricots are sun-dried in the high valleys and packed without added sugar or chemical treatment, keeping their natural sweetness and deep amber colour. Rich in vitamin A, iron and fibre—an easy snack for the whole family.",
    category: "dried-fruits",
    image: "/images/products/dry-apricot.jpg",
    gallery: ["/images/dry-apricot.png"],
    variants: [
      { id: "500g", label: "500 g", price: 1899, compareAtPrice: 2299, inStock: true },
    ],
    highlights: ["Sun-dried", "No added sugar", "Chemical-free"],
    ingredients: "Sun-dried apricots.",
    origin: HUNZA_ORIGIN,
    storage: DRY_STORAGE,
    featured: true,
    bestseller: true,
    addedOrder: 1,
    wholesale: { available: true, bulkFormats: [], moq: null },
  },
  {
    id: "3",
    slug: "dry-almond",
    name: "Hunza Almonds",
    shortDescription: "Crunchy, nutrient-rich almonds from Hunza orchards",
    description:
      "Crisp, sweet almonds grown in the mountain climate of Hunza. Naturally rich in vitamin E, magnesium, protein and healthy fats, with no added preservatives. Enjoy them raw, soaked overnight or in your baking.",
    category: "nuts",
    image: "/images/products/dry-almond.jpg",
    gallery: ["/images/dry-almond.jpg"],
    variants: [
      { id: "500g", label: "500 g", price: 2199, compareAtPrice: 2599, inStock: true },
    ],
    highlights: ["Rich in vitamin E", "No preservatives", "Hand-sorted"],
    ingredients: "Almonds.",
    allergens: "Contains tree nuts (almonds).",
    origin: HUNZA_ORIGIN,
    storage: DRY_STORAGE,
    featured: true,
    bestseller: true,
    addedOrder: 3,
    wholesale: { available: true, bulkFormats: [], moq: null },
  },
  {
    id: "7",
    slug: "premium-walnut-kernels",
    name: "Hunza Walnut Kernels",
    shortDescription: "Premium kernels rich in Omega-3",
    description:
      "Light, buttery walnut kernels from Hunza, rich in Omega-3 fatty acids. Packed without preservatives and ideal for snacking, breakfast bowls and baking.",
    category: "nuts",
    image: "/images/products/walnuts.jpg",
    gallery: ["/images/hunza-walnuts.jpg"],
    variants: [
      { id: "500g", label: "500 g", price: 2399, compareAtPrice: 2799, inStock: true },
    ],
    highlights: ["Rich in Omega-3", "No preservatives", "Premium kernels"],
    ingredients: "Walnut kernels.",
    allergens: "Contains tree nuts (walnuts).",
    origin: HUNZA_ORIGIN,
    storage: DRY_STORAGE,
    featured: true,
    bestseller: true,
    addedOrder: 7,
    wholesale: { available: true, bulkFormats: [], moq: null },
  },
  {
    id: "6",
    slug: "mixed-mountain-dry-fruits",
    name: "Mountain Mix",
    shortDescription: "Almonds, apricots, walnuts, cashews and raisins",
    description:
      "A balanced everyday blend of almonds, dried apricots, walnuts, cashews and raisins. No added sugar and no chemical treatment—just a handful of natural energy for work, school or travel.",
    category: "dried-fruits",
    image: "/images/products/mix-dry-fruits.jpg",
    gallery: ["/images/mix-dry-fruits.jpg"],
    variants: [
      { id: "750g", label: "750 g", price: 2799, compareAtPrice: 3299, inStock: true },
    ],
    highlights: ["Five-fruit blend", "No added sugar", "Family size"],
    ingredients: "Almonds, dried apricots, walnuts, cashews, raisins.",
    allergens: "Contains tree nuts (almonds, walnuts, cashews).",
    storage: DRY_STORAGE,
    featured: true,
    bestseller: true,
    addedOrder: 6,
    wholesale: { available: true, bulkFormats: [], moq: null },
  },
  {
    id: "2",
    slug: "hunzai-chocolate",
    name: "Hunzai Chocolate (Kilawo)",
    shortDescription: "Walnuts set in natural grape syrup—a Hunza tradition",
    description:
      "Kilawo is a traditional Hunza sweet: whole walnuts coated and set in natural grape syrup. Rich, chewy and only lightly sweet, it is made the way families in the valley have made it for generations.",
    category: "hunza-specialties",
    image: "/images/products/kilawo.jpg",
    gallery: ["/images/hunzai-chocolate.png"],
    variants: [
      { id: "250g", label: "250 g", price: 2499, compareAtPrice: 2899, inStock: true },
    ],
    highlights: ["Traditional recipe", "Natural grape syrup", "100% natural"],
    ingredients: "Walnuts, natural grape syrup.",
    allergens: "Contains tree nuts (walnuts).",
    origin: HUNZA_ORIGIN,
    storage: "Store sealed in a cool, dry place. Refrigerate after opening in warm weather.",
    featured: true,
    bestseller: true,
    addedOrder: 2,
    wholesale: { available: true, bulkFormats: [], moq: null },
  },
  {
    id: "4",
    slug: "hunza-organic-shilajit",
    name: "Hunza Organic Shilajit",
    shortDescription: "Purified mountain shilajit resin",
    description:
      "Collected in the Hunza highlands and carefully purified, our shilajit is a mineral-rich resin traditionally taken in small daily amounts. Follow the label for serving guidance and consult your doctor if you are pregnant, nursing or taking medication.",
    category: "hunza-specialties",
    image: "/images/products/shilajit.jpg",
    gallery: ["/images/hunza-shilajit.png"],
    variants: [
      { id: "30g", label: "30 g", price: 4499, compareAtPrice: 4999, inStock: true },
    ],
    highlights: ["Purified resin", "Mineral-rich", "Small daily serving"],
    ingredients: "Purified shilajit resin.",
    origin: HUNZA_ORIGIN,
    storage: "Keep the jar tightly closed in a cool, dry place away from direct sunlight.",
    featured: true,
    bestseller: false,
    addedOrder: 4,
    wholesale: { available: true, bulkFormats: [], moq: null },
  },
  {
    id: "5",
    slug: "hunza-dry-fruit-gift-box",
    name: "Hunza Dry Fruit Gift Box",
    shortDescription: "Apricots, almonds and Kilawo in one gift set",
    description:
      "A curated gift box with Hunza Dried Apricots, Hunza Almonds and Hunzai Chocolate—packed for Eid, weddings, family visits and corporate gifting.",
    category: "gift-sets",
    image: "/images/products/mix-dry-fruits.jpg",
    gallery: [],
    variants: [
      { id: "assorted", label: "Assorted set", price: 5999, compareAtPrice: 6999, inStock: true },
    ],
    highlights: ["Ready to gift", "Three Hunza favourites"],
    ingredients: "Dried apricots, almonds, walnuts, natural grape syrup.",
    allergens: "Contains tree nuts (almonds, walnuts).",
    storage: DRY_STORAGE,
    featured: true,
    bestseller: false,
    addedOrder: 5,
    wholesale: { available: true, bulkFormats: [], moq: null },
    placeholderImage: true,
  },
  {
    id: "8",
    slug: "shilajit-wellness-set",
    name: "Shilajit Wellness Set",
    shortDescription: "Organic shilajit paired with Hunza dry fruits",
    description:
      "Hunza Organic Shilajit paired with a selection of our dry fruits—a thoughtful wellness gift rooted in mountain tradition.",
    category: "gift-sets",
    image: "/images/products/shilajit.jpg",
    gallery: [],
    variants: [
      { id: "set", label: "Gift set", price: 6999, compareAtPrice: 7999, inStock: true },
    ],
    highlights: ["Gift ready", "Limited quantities"],
    allergens: "Dry fruit selection may contain tree nuts.",
    storage: DRY_STORAGE,
    featured: false,
    bestseller: false,
    addedOrder: 8,
    wholesale: { available: true, bulkFormats: [], moq: null },
    placeholderImage: true,
  },
];

/**
 * These reviews came with the original site template and could not be
 * confirmed as genuine. They are kept for reference but hidden until each one
 * is verified (set `verified: true`).
 */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ayesha Khan",
    city: "Islamabad",
    rating: 5,
    review:
      "The Dry Apricots taste exactly like the ones from the north—soft, sweet, and pure.",
    verified: false,
  },
  {
    id: "2",
    name: "Omar Siddiqui",
    city: "Karachi",
    rating: 5,
    review:
      "Packaging is elegant, delivery was prompt, and the Hunzai Chocolate is exceptional.",
    verified: false,
  },
  {
    id: "3",
    name: "Fatima Rehman",
    city: "Lahore",
    rating: 5,
    review:
      "I gifted the Dry Fruit Gift Box for Eid and it was a showstopper.",
    verified: false,
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How long does delivery take?",
    answer:
      "Orders to major cities typically arrive in 2–4 business days; remote areas may take 4–7 business days. We share tracking details once your order ships.",
  },
  {
    id: "2",
    question: "How do I place and pay for an order?",
    answer:
      "Add products to your cart and check out with your delivery details. We then confirm your order, delivery charge and payment options with you on WhatsApp before dispatch.",
  },
  {
    id: "3",
    question: "Are your dry fruits natural?",
    answer:
      "Yes. Our apricots are sun-dried without added sugar, and our nuts are packed without artificial colours or preservatives.",
  },
  {
    id: "4",
    question: "How should I store dry fruits?",
    answer:
      "Keep them in an airtight container in a cool, dry place away from sunlight, and refrigerate in humid weather.",
  },
  {
    id: "5",
    question: "Do you supply businesses in bulk?",
    answer:
      "Yes. Retailers, distributors, restaurants, hotels and corporate buyers can request a wholesale quote. Quantities, packaging and pricing are confirmed per inquiry.",
  },
  {
    id: "6",
    question: "What if my order arrives damaged?",
    answer:
      "Contact us within 7 days with photos and we'll arrange a replacement or refund. Opened food products can't be returned for hygiene reasons unless defective.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getBestsellers() {
  return products.filter((p) => p.bestseller);
}

export function getVariant(product: Product, variantId: string) {
  return product.variants.find((v) => v.id === variantId);
}

export function getDefaultVariant(product: Product) {
  return product.variants.find((v) => v.inStock) ?? product.variants[0];
}

export function isProductInStock(product: Product) {
  return product.variants.some((v) => v.inStock);
}

/** Lowest available retail price, used for listing and sorting */
export function getFromPrice(product: Product) {
  return Math.min(...product.variants.map((v) => v.price));
}

export function getDiscountPercent(price: number, compareAtPrice?: number) {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
