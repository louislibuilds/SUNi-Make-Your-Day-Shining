import { PRODUCT_PLACEHOLDER_IMAGE } from '../lib/media';

export interface Product {
  id: number | string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  colors?: string[];
  brand: string;
}

export const products: Product[] = [
  // Home & Living
  {
    id: 1,
    name: "Luminous Home Diffuser",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 156,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Home & Living",
    description: "Transform your space with this elegant ultrasonic diffuser that combines style and functionality.",
    features: ["Ultrasonic technology", "7-color LED lighting", "Auto shut-off", "Whisper quiet"],
    inStock: true,
    isBestSeller: true,
    colors: ["White", "Black", "Wood"],
    brand: "Lumina"
  },
  {
    id: 2,
    name: "Minimalist Ceramic Vase Set",
    price: 45.99,
    rating: 4.7,
    reviews: 89,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Home & Living",
    description: "Set of three handcrafted ceramic vases perfect for fresh flowers or dried arrangements.",
    features: ["Handcrafted ceramic", "Set of 3 sizes", "Matte finish", "Dishwasher safe"],
    inStock: true,
    colors: ["White", "Sage", "Terracotta"],
    brand: "Artisan Craft"
  },
  {
    id: 3,
    name: "Smart Storage Organizer",
    price: 34.99,
    rating: 4.9,
    reviews: 203,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Home & Living",
    description: "Versatile modular storage system that adapts to any space and organizing need.",
    features: ["Modular design", "Easy assembly", "Multiple configurations", "Durable plastic"],
    inStock: true,
    isNew: true,
    colors: ["Clear", "White", "Grey"],
    brand: "OrganizeIt"
  },

  // Kitchen Essentials
  {
    id: 4,
    name: "Smart Kitchen Organizer",
    price: 64.99,
    rating: 4.9,
    reviews: 203,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Kitchen Essentials",
    description: "Revolutionary kitchen organization system that maximizes counter space and efficiency.",
    features: ["Space-saving design", "Non-slip base", "Easy clean", "Bamboo construction"],
    inStock: true,
    isNew: true,
    colors: ["Natural", "White"],
    brand: "KitchenSmart"
  },
  {
    id: 5,
    name: "Ceramic Spice Jar Set",
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.6,
    reviews: 124,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Kitchen Essentials",
    description: "Set of 12 airtight ceramic spice jars with magnetic lids for easy access and storage.",
    features: ["Airtight seal", "Magnetic lids", "Set of 12", "Labels included"],
    inStock: true,
    colors: ["White", "Black"],
    brand: "SpiceKeeper"
  },

  // Work & Productivity
  {
    id: 6,
    name: "Minimalist Desk Set",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviews: 89,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Work & Productivity",
    description: "Complete desk organization set featuring premium materials and thoughtful design.",
    features: ["Premium materials", "Wireless charging pad", "Cable management", "Non-slip base"],
    inStock: true,
    colors: ["Walnut", "Oak", "Black"],
    brand: "WorkSpace Pro"
  },
  {
    id: 7,
    name: "Modern Desk Accessories",
    price: 79.99,
    rating: 4.8,
    reviews: 156,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Work & Productivity",
    description: "Sleek desk accessories set designed to enhance productivity and maintain clean workspace.",
    features: ["Modular design", "High-quality materials", "Multiple compartments", "Stackable"],
    inStock: true,
    isBestSeller: true,
    colors: ["Silver", "Black", "Rose Gold"],
    brand: "DeskCraft"
  },

  // Wellness & Self-Care
  {
    id: 8,
    name: "Wellness Essential Kit",
    price: 94.99,
    rating: 5.0,
    reviews: 67,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Wellness & Self-Care",
    description: "Complete wellness kit featuring natural products for daily self-care rituals.",
    features: ["Natural ingredients", "Complete kit", "Travel-friendly", "Sustainable packaging"],
    inStock: true,
    isNew: true,
    brand: "Pure Wellness"
  },
  {
    id: 9,
    name: "Luxury Bath Set",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviews: 198,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Wellness & Self-Care",
    description: "Luxurious bath essentials set for the ultimate relaxation experience.",
    features: ["Organic ingredients", "Gift box included", "Long-lasting", "Aromatherapy blend"],
    inStock: true,
    isBestSeller: true,
    colors: ["Lavender", "Eucalyptus", "Vanilla"],
    brand: "Luxe Bath"
  },
  {
    id: 10,
    name: "Bathroom Organizer Set",
    price: 56.99,
    rating: 4.5,
    reviews: 142,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Wellness & Self-Care",
    description: "Elegant bathroom organization set with multiple compartments for all your essentials.",
    features: ["Water-resistant", "Multiple sizes", "Easy install", "Modern design"],
    inStock: true,
    colors: ["White", "Bamboo", "Grey"],
    brand: "BathCraft"
  },

  // Garden & Outdoor
  {
    id: 11,
    name: "Plant Care Essentials",
    price: 42.99,
    rating: 4.7,
    reviews: 89,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Garden & Outdoor",
    description: "Complete plant care kit with all essential tools for healthy, thriving plants.",
    features: ["Complete tool set", "Beginner friendly", "Durable materials", "Storage case"],
    inStock: true,
    isNew: true,
    colors: ["Green", "Terracotta"],
    brand: "GreenThumb"
  },
  {
    id: 12,
    name: "Ceramic Planters Set",
    price: 68.99,
    originalPrice: 89.99,
    rating: 4.9,
    reviews: 156,
    image: PRODUCT_PLACEHOLDER_IMAGE,
    category: "Garden & Outdoor",
    description: "Set of beautiful ceramic planters perfect for indoor and outdoor plants.",
    features: ["Drainage holes", "Set of 3", "Weather resistant", "Modern design"],
    inStock: true,
    colors: ["White", "Sage", "Charcoal"],
    brand: "PlantCraft"
  }
];

// Map each product to its generated image in `public/products/<slug>.webp`.
// The slug mirrors the backend seed (server/src/scripts/seed.ts) so mock and
// API data resolve to the same asset.
function toImageSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

for (const product of products) {
  product.image = `/products/${toImageSlug(product.name)}.webp`;
}

export const categories = [
  "All Products",
  "Home & Living", 
  "Kitchen Essentials",
  "Work & Productivity",
  "Wellness & Self-Care",
  "Garden & Outdoor"
];

export const brands = [
  "All Brands",
  ...Array.from(new Set(products.map(p => p.brand))).sort()
];

export const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $150", min: 100, max: 150 },
  { label: "Over $150", min: 150, max: Infinity }
];