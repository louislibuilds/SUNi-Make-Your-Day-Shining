import 'dotenv/config';
import connectDB from '../config/database';
import { User, UserRole } from '../models/User';
import { Product, ProductCategory, ProductStatus, ProductType } from '../models/Product';

const LEGACY_SKUS = ['BT-CLSC-001', 'SNORK-EX-1'];
// Served from the frontend `public/products/<slug>.webp` (Vercel / Vite dev).
const PRODUCT_IMAGE_BASE = '/products';

type SeedProduct = {
  name: string;
  description: string;
  category: ProductCategory;
  sku: string;
  price: number;
  salePrice?: number;
  brand: string;
  features: string[];
  rating: number;
  reviews: number;
  featured?: boolean;
  isNew?: boolean;
  colors?: string[];
};

const LIFESTYLE_PRODUCTS: SeedProduct[] = [
  {
    name: 'Luminous Home Diffuser',
    description: 'Transform your space with this elegant ultrasonic diffuser that combines style and functionality.',
    category: ProductCategory.HOME_LIVING,
    sku: 'SUNI-HL-001',
    price: 119.99,
    salePrice: 89.99,
    brand: 'Lumina',
    features: ['Ultrasonic technology', '7-color LED lighting', 'Auto shut-off', 'Whisper quiet'],
    rating: 4.8,
    reviews: 156,
    featured: true,
    colors: ['White', 'Black', 'Wood'],
  },
  {
    name: 'Minimalist Ceramic Vase Set',
    description: 'Set of three handcrafted ceramic vases perfect for fresh flowers or dried arrangements.',
    category: ProductCategory.HOME_LIVING,
    sku: 'SUNI-HL-002',
    price: 45.99,
    brand: 'Artisan Craft',
    features: ['Handcrafted ceramic', 'Set of 3 sizes', 'Matte finish', 'Dishwasher safe'],
    rating: 4.7,
    reviews: 89,
    colors: ['White', 'Sage', 'Terracotta'],
  },
  {
    name: 'Smart Storage Organizer',
    description: 'Versatile modular storage system that adapts to any space and organizing need.',
    category: ProductCategory.HOME_LIVING,
    sku: 'SUNI-HL-003',
    price: 34.99,
    brand: 'OrganizeIt',
    features: ['Modular design', 'Easy assembly', 'Multiple configurations', 'Durable plastic'],
    rating: 4.9,
    reviews: 203,
    isNew: true,
    colors: ['Clear', 'White', 'Grey'],
  },
  {
    name: 'Smart Kitchen Organizer',
    description: 'Revolutionary kitchen organization system that maximizes counter space and efficiency.',
    category: ProductCategory.KITCHEN_ESSENTIALS,
    sku: 'SUNI-KE-001',
    price: 64.99,
    brand: 'KitchenSmart',
    features: ['Space-saving design', 'Non-slip base', 'Easy clean', 'Bamboo construction'],
    rating: 4.9,
    reviews: 203,
    isNew: true,
    colors: ['Natural', 'White'],
  },
  {
    name: 'Ceramic Spice Jar Set',
    description: 'Set of 12 airtight ceramic spice jars with magnetic lids for easy access and storage.',
    category: ProductCategory.KITCHEN_ESSENTIALS,
    sku: 'SUNI-KE-002',
    price: 54.99,
    salePrice: 39.99,
    brand: 'SpiceKeeper',
    features: ['Airtight seal', 'Magnetic lids', 'Set of 12', 'Labels included'],
    rating: 4.6,
    reviews: 124,
    colors: ['White', 'Black'],
  },
  {
    name: 'Minimalist Desk Set',
    description: 'Complete desk organization set featuring premium materials and thoughtful design.',
    category: ProductCategory.WORK_PRODUCTIVITY,
    sku: 'SUNI-WP-001',
    price: 159.99,
    salePrice: 129.99,
    brand: 'WorkSpace Pro',
    features: ['Premium materials', 'Wireless charging pad', 'Cable management', 'Non-slip base'],
    rating: 4.7,
    reviews: 89,
    colors: ['Walnut', 'Oak', 'Black'],
  },
  {
    name: 'Modern Desk Accessories',
    description: 'Sleek desk accessories set designed to enhance productivity and maintain clean workspace.',
    category: ProductCategory.WORK_PRODUCTIVITY,
    sku: 'SUNI-WP-002',
    price: 79.99,
    brand: 'DeskCraft',
    features: ['Modular design', 'High-quality materials', 'Multiple compartments', 'Stackable'],
    rating: 4.8,
    reviews: 156,
    featured: true,
    colors: ['Silver', 'Black', 'Rose Gold'],
  },
  {
    name: 'Wellness Essential Kit',
    description: 'Complete wellness kit featuring natural products for daily self-care rituals.',
    category: ProductCategory.WELLNESS_SELF_CARE,
    sku: 'SUNI-WC-001',
    price: 94.99,
    brand: 'Pure Wellness',
    features: ['Natural ingredients', 'Complete kit', 'Travel-friendly', 'Sustainable packaging'],
    rating: 5.0,
    reviews: 67,
    isNew: true,
  },
  {
    name: 'Luxury Bath Set',
    description: 'Luxurious bath essentials set for the ultimate relaxation experience.',
    category: ProductCategory.WELLNESS_SELF_CARE,
    sku: 'SUNI-WC-002',
    price: 149.99,
    salePrice: 119.99,
    brand: 'Luxe Bath',
    features: ['Organic ingredients', 'Gift box included', 'Long-lasting', 'Aromatherapy blend'],
    rating: 4.8,
    reviews: 198,
    featured: true,
    colors: ['Lavender', 'Eucalyptus', 'Vanilla'],
  },
  {
    name: 'Bathroom Organizer Set',
    description: 'Elegant bathroom organization set with multiple compartments for all your essentials.',
    category: ProductCategory.WELLNESS_SELF_CARE,
    sku: 'SUNI-WC-003',
    price: 56.99,
    brand: 'BathCraft',
    features: ['Water-resistant', 'Multiple sizes', 'Easy install', 'Modern design'],
    rating: 4.5,
    reviews: 142,
    colors: ['White', 'Bamboo', 'Grey'],
  },
  {
    name: 'Plant Care Essentials',
    description: 'Complete plant care kit with all essential tools for healthy, thriving plants.',
    category: ProductCategory.GARDEN_OUTDOOR,
    sku: 'SUNI-GO-001',
    price: 42.99,
    brand: 'GreenThumb',
    features: ['Complete tool set', 'Beginner friendly', 'Durable materials', 'Storage case'],
    rating: 4.7,
    reviews: 89,
    isNew: true,
    colors: ['Green', 'Terracotta'],
  },
  {
    name: 'Ceramic Planters Set',
    description: 'Set of beautiful ceramic planters perfect for indoor and outdoor plants.',
    category: ProductCategory.GARDEN_OUTDOOR,
    sku: 'SUNI-GO-002',
    price: 89.99,
    salePrice: 68.99,
    brand: 'PlantCraft',
    features: ['Drainage holes', 'Set of 3', 'Weather resistant', 'Modern design'],
    rating: 4.9,
    reviews: 156,
    colors: ['White', 'Sage', 'Charcoal'],
  },
];

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildProductDoc(item: SeedProduct) {
  return {
    name: item.name,
    description: item.description,
    type: ProductType.PHYSICAL,
    category: item.category,
    sku: item.sku,
    price: {
      base: item.price,
      ...(item.salePrice ? { sale: item.salePrice } : {}),
      currency: 'USD',
    },
    inventory: {
      quantity: 100,
      lowStockThreshold: 5,
      trackInventory: true,
      allowBackorder: false,
    },
    images: {
      primary: `${PRODUCT_IMAGE_BASE}/${toSlug(item.name)}.webp`,
      gallery: [],
    },
    seo: {
      slug: toSlug(item.name),
    },
    tags: [item.brand.toLowerCase(), ...item.features.map((f) => f.toLowerCase())],
    status: ProductStatus.ACTIVE,
    featured: Boolean(item.featured || item.isNew),
    isDigital: false,
    reviews: {
      averageRating: item.rating,
      totalReviews: item.reviews,
    },
    variants: item.colors?.map((color) => ({
      name: 'Color',
      options: { color },
    })),
  };
}

async function seedUsers() {
  const adminEmail = 'admin@suni.com';
  const memberEmail = 'member@suni.com';

  const admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    await new User({
      email: adminEmail,
      name: 'Suni Admin',
      password: 'admin123456',
      role: UserRole.ADMIN,
      isEmailVerified: true,
      isActive: true,
    }).save();
    console.log('✓ Admin user created');
  } else {
    console.log('• Admin user exists');
  }

  const member = await User.findOne({ email: memberEmail });
  if (!member) {
    await new User({
      email: memberEmail,
      name: 'Demo Member',
      password: 'member123456',
      role: UserRole.MEMBER,
      isEmailVerified: true,
      isActive: true,
    }).save();
    console.log('✓ Demo member created');
  } else {
    console.log('• Demo member exists');
  }
}

async function seedProducts() {
  const removed = await Product.deleteMany({ sku: { $in: LEGACY_SKUS } });
  if (removed.deletedCount > 0) {
    console.log(`✓ Removed ${removed.deletedCount} legacy beach product(s)`);
  }

  let upserted = 0;
  for (const item of LIFESTYLE_PRODUCTS) {
    const doc = buildProductDoc(item);
    await Product.findOneAndUpdate({ sku: item.sku }, doc, { upsert: true, new: true });
    upserted += 1;
  }

  console.log(`✓ Upserted ${upserted} lifestyle products`);
}

(async () => {
  try {
    await connectDB();
    await seedUsers();
    await seedProducts();
    console.log('✅ Seed completed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
})();
