import type {
  Category,
  FAQ,
  Feature,
  GalleryImage,
  NavItem,
  Product,
  Testimonial,
} from "@/types";

export const siteConfig = {
  name: "Haniball Hunza",
  tagline: "Premium Dry Fruits from the Mountains of Hunza",
  description:
    "Premium organic dry fruits, Hunzai chocolate, and Hunza organic shilajit—sourced from the pristine valleys of Hunza for authentic taste, purity, and wellness.",
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

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Our Products", href: "/our-honey" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export const categories: Category[] = [
  {
    id: "1",
    slug: "dry-apricots",
    name: "Dry Apricots",
    description: "100% organic Hunza apricots — sun-dried & naturally sweet",
    image: "/images/dry-apricot.png",
  },
  {
    id: "2",
    slug: "dry-almonds",
    name: "Dry Almonds",
    description: "100% organic Hunza almonds — pure, crunchy & nutrient-rich",
    image: "/images/dry-almond.jpg",
  },
  {
    id: "3",
    slug: "hunzai-chocolate",
    name: "Hunzai Chocolate",
    description: "Premium walnuts dipped in natural grape syrup — Kilawo",
    image: "/images/hunzai-chocolate.png",
  },
  {
    id: "4",
    slug: "shilajit",
    name: "Organic Shilajit",
    description: "Pure Hunza shilajit for strength and vitality",
    image:
      "/images/hunza-shilajit.png",
  },
  {
    id: "5",
    slug: "gift-boxes",
    name: "Gift Boxes",
    description: "Curated dry fruit & wellness gift sets",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "dry-apricot",
    name: "Dry Apricot",
    shortDescription: "100% organic Hunza apricots, sun-dried & naturally sweet",
    description:
      "Unlock the golden secret of the Himalayas. 100% organic Hunza dried apricots—sun-dried, naturally sweet, and packed with goodness. Chemical-free with no added sugar. Rich in Vitamin A, iron, fiber, and vitamins; supports digestion and natural energy. Pure Hunza origin, perfect for everyone.",
    price: 1899,
    compareAtPrice: 2299,
    weight: "500g",
    rating: 4.9,
    reviewCount: 142,
    image: "/images/dry-apricot.png",
    category: "dry-apricots",
    badge: "Bestseller",
    featured: true,
    bestseller: true,
    inStock: true,
  },
  {
    id: "2",
    slug: "hunzai-chocolate",
    name: "Hunzai Chocolate (Kilawo)",
    shortDescription: "Premium walnuts dipped in natural grape syrup",
    description:
      "A tradition. A taste of Hunza. Premium walnuts dipped in natural grape syrup—Kilawo is a rich, authentic delight from the heart of Hunza. 100% natural, made with premium walnuts, and an authentic Hunza product. Pure. Natural. Irresistible.",
    price: 2499,
    compareAtPrice: 2899,
    weight: "250g",
    rating: 4.8,
    reviewCount: 96,
    image: "/images/hunzai-chocolate.png",
    category: "hunzai-chocolate",
    badge: "New",
    featured: true,
    bestseller: true,
    inStock: true,
  },
  {
    id: "3",
    slug: "dry-almond",
    name: "Dry Almond",
    shortDescription: "100% organic Hunza almonds — pure, crunchy & nutrient-rich",
    description:
      "Unlock the golden secret of the Himalayas. 100% organic Hunza almonds—pure, crunchy, and nutrient-rich. Chemical-free with no added sugar. Rich in Vitamin E, magnesium, protein, fiber, and healthy fats. Heart-healthy, brain-boosting natural energy from the pristine valleys of Hunza.",
    price: 2199,
    compareAtPrice: 2599,
    weight: "500g",
    rating: 4.9,
    reviewCount: 118,
    image: "/images/dry-almond.jpg",
    category: "dry-almonds",
    badge: "20% OFF",
    featured: true,
    bestseller: true,
    inStock: true,
  },
  {
    id: "4",
    slug: "hunza-organic-shilajit",
    name: "Hunza Organic Shilajit",
    shortDescription: "Pure organic shilajit from Hunza highlands",
    description:
      "Hunza Organic Shilajit is carefully collected and purified for authenticity and potency. Lab-tested, 100% pure & natural—rich in essential minerals to boost energy, stamina, immunity, and wellness. A small dose for a stronger, better you.",
    price: 4499,
    compareAtPrice: 4999,
    weight: "30g",
    rating: 5.0,
    reviewCount: 74,
    image: "/images/hunza-shilajit.png",
    category: "shilajit",
    badge: "Premium",
    featured: true,
    bestseller: true,
    inStock: true,
  },
  {
    id: "5",
    slug: "hunza-dry-fruit-gift-box",
    name: "Hunza Dry Fruit Gift Box",
    shortDescription: "Apricots, almonds & treats in a premium set",
    description:
      "A curated gift box featuring Dry Apricot, Dry Almond, and Hunzai Chocolate—beautifully packed for Eid, corporate gifting, and celebrations.",
    price: 5999,
    compareAtPrice: 6999,
    weight: "Assorted",
    rating: 4.9,
    reviewCount: 52,
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    category: "gift-boxes",
    badge: "Gift",
    featured: true,
    bestseller: false,
    inStock: true,
  },
  {
    id: "6",
    slug: "mixed-mountain-dry-fruits",
    name: "Mix Dry Fruits",
    shortDescription: "Almond, apricot, walnut, cashew & raisin — nature’s best blend",
    description:
      "Unlock the golden secret of the Himalayas. 100% organic mix dry fruits—almond, apricot, walnut, cashew, and raisin. No added sugar, chemical-free, and rich in nutrients. A perfect blend packed with vitamins, minerals, natural energy, and brain-supporting goodness for the whole family.",
    price: 2799,
    compareAtPrice: 3299,
    weight: "750g",
    rating: 4.7,
    reviewCount: 63,
    image: "/images/mix-dry-fruits.jpg",
    category: "dry-apricots",
    badge: "Bestseller",
    featured: true,
    bestseller: true,
    inStock: true,
  },
  {
    id: "7",
    slug: "premium-walnut-kernels",
    name: "Hunza Walnuts",
    shortDescription: "100% organic premium kernels — rich in Omega-3",
    description:
      "Unlock the golden secret of the Himalayas. 100% organic Hunza walnuts—premium kernels rich in Omega-3. Pure, crunchy, and nutrient-rich with no added preservatives. Supports brain health, heart health, memory, and focus. A nutritious snack for kids, adults, and the whole family.",
    price: 2399,
    compareAtPrice: 2799,
    weight: "500g",
    rating: 4.8,
    reviewCount: 81,
    image: "/images/hunza-walnuts.jpg",
    category: "dry-almonds",
    badge: "Premium",
    featured: true,
    bestseller: true,
    inStock: true,
  },
  {
    id: "8",
    slug: "shilajit-wellness-set",
    name: "Shilajit Wellness Set",
    shortDescription: "Organic shilajit with dry fruit companions",
    description:
      "Pair Hunza Organic Shilajit with a selection of dry fruits for a complete wellness gift—rooted in mountain tradition.",
    price: 6999,
    compareAtPrice: 7999,
    weight: "Set",
    rating: 4.9,
    reviewCount: 28,
    image: "/images/hunza-shilajit.png",
    category: "shilajit",
    badge: "Limited",
    featured: false,
    bestseller: false,
    inStock: true,
  },
];

export const features: Feature[] = [
  {
    id: "1",
    title: "100% Natural",
    description: "Clean dry fruits and wellness products with no unnecessary additives.",
    icon: "Droplets",
  },
  {
    id: "2",
    title: "No Artificial Sugar",
    description: "Naturally sweet apricots and snacks—never syrup-coated fillers.",
    icon: "Ban",
  },
  {
    id: "3",
    title: "Lab Tested",
    description: "Shilajit and key products verified for purity and authenticity.",
    icon: "FlaskConical",
  },
  {
    id: "4",
    title: "Sustainably Sourced",
    description: "Ethical sourcing that supports mountain farming communities.",
    icon: "Leaf",
  },
  {
    id: "5",
    title: "Direct From Hunza",
    description: "Sourced at origin from trusted Hunza growers and partners.",
    icon: "Mountain",
  },
  {
    id: "6",
    title: "Fast Nationwide Delivery",
    description: "Secure packaging and swift delivery across Pakistan.",
    icon: "Truck",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ayesha Khan",
    city: "Islamabad",
    rating: 5,
    review:
      "The Dry Apricots taste exactly like the ones from the north—soft, sweet, and pure. Haniball Hunza is now our go-to for dry fruits.",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: "2",
    name: "Omar Siddiqui",
    city: "Karachi",
    rating: 5,
    review:
      "Packaging is elegant, delivery was prompt, and the Hunzai Chocolate is exceptional. You can tell this brand cares about quality.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: "3",
    name: "Fatima Rehman",
    city: "Lahore",
    rating: 5,
    review:
      "I gifted the Dry Fruit Gift Box for Eid and it was a showstopper. Beautiful presentation and premium products throughout.",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: "4",
    name: "Hassan Ali",
    city: "Peshawar",
    rating: 4,
    review:
      "As someone from the north, I'm picky about dry almonds. These are fresh, crunchy, and carefully packed—highly recommend.",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    id: "5",
    name: "Sara Malik",
    city: "Rawalpindi",
    rating: 5,
    review:
      "Hunza Organic Shilajit feels authentic and well-purified. Combined with their dry fruits, it's a complete wellness pantry.",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How long does shipping take?",
    answer:
      "Orders within major cities typically arrive in 2–4 business days. Remote areas may take 4–7 business days. You'll receive tracking details as soon as your order ships.",
    category: "shipping",
  },
  {
    id: "2",
    question: "Are your dry fruits 100% natural?",
    answer:
      "Yes. Haniball Hunza dry fruits are carefully selected for purity and quality. We do not use artificial colors or unnecessary additives. Shilajit is organic and lab-checked for authenticity.",
    category: "purity",
  },
  {
    id: "3",
    question: "How should I store dry fruits and shilajit?",
    answer:
      "Keep dry fruits in an airtight container in a cool, dry place away from sunlight. Refrigerate in humid climates. Store shilajit sealed, cool, and dry—follow the label for daily use guidance.",
    category: "storage",
  },
  {
    id: "4",
    question: "What is your return policy?",
    answer:
      "If your order arrives damaged or incorrect, contact us within 7 days with photos and we'll arrange a replacement or refund. Opened food products cannot be returned for hygiene reasons unless defective.",
    category: "returns",
  },
  {
    id: "5",
    question: "Do you deliver nationwide?",
    answer:
      "Yes. We deliver across Pakistan via trusted courier partners. International shipping is available on select products—reach out via WhatsApp for a custom quote.",
    category: "delivery",
  },
  {
    id: "6",
    question: "Can I order on WhatsApp?",
    answer:
      "Absolutely. Message us on WhatsApp for personalized recommendations, gift wrapping, or bulk orders. Our team typically responds within a few hours during business days.",
    category: "delivery",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/images/hunza-shilajit.png",
    alt: "Haniball Hunza Organic Shilajit product",
    span: "tall",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    alt: "Hunza mountain landscape at sunrise",
    span: "wide",
  },
  {
    id: "3",
    src: "/images/dry-almond.jpg",
    alt: "Haniball Hunza dried almonds — 100% organic pouch",
    span: "normal",
  },
  {
    id: "4",
    src: "/images/hunzai-chocolate.png",
    alt: "Hunzai Chocolate Kilawo — walnuts in grape syrup",
    span: "normal",
  },
  {
    id: "5",
    src: "/images/mix-dry-fruits.jpg",
    alt: "Haniball Hunza 100% organic mix dry fruits",
    span: "tall",
  },
  {
    id: "6",
    src: "/images/hunza-walnuts.jpg",
    alt: "Haniball Hunza organic walnuts — premium Omega-3 kernels",
    span: "normal",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Pristine Hunza peaks",
    span: "wide",
  },
  {
    id: "8",
    src: "/images/dry-apricot.png",
    alt: "Haniball Hunza dried apricots — sun-dried organic pouch",
    span: "normal",
  },
];

export const stats = [
  { id: "1", label: "Happy Customers", value: 12000, suffix: "+" },
  { id: "2", label: "Years of Experience", value: 15, suffix: "+" },
  { id: "3", label: "Dry Fruits Sold (kg)", value: 38000, suffix: "+" },
  { id: "4", label: "Customer Rating", value: 4.9, suffix: "★", decimals: 1 },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getBestsellers() {
  return products.filter((p) => p.bestseller);
}
