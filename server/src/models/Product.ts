import mongoose, { Schema, Document } from 'mongoose';

// Product types enum
export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital'
}

// Product categories enum (aligned with frontend lifestyle catalog)
export enum ProductCategory {
  HOME_LIVING = 'home-living',
  KITCHEN_ESSENTIALS = 'kitchen-essentials',
  WORK_PRODUCTIVITY = 'work-productivity',
  WELLNESS_SELF_CARE = 'wellness-self-care',
  GARDEN_OUTDOOR = 'garden-outdoor'
}

// Product status enum
export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out-of-stock',
  DISCONTINUED = 'discontinued'
}

// Product interface
export interface IProduct extends Document {
  name: string;
  description: string;
  shortDescription?: string;
  type: ProductType;
  category: ProductCategory;
  subcategory?: string;
  sku: string;
  price: {
    base: number;
    sale?: number;
    currency: string;
  };
  inventory: {
    quantity: number;
    lowStockThreshold: number;
    trackInventory: boolean;
    allowBackorder: boolean;
  };
  images: {
    primary: string;
    gallery: string[];
    alt?: string;
  };
  specifications?: {
    [key: string]: any;
  };
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
    unit: string;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    slug: string;
    keywords?: string[];
  };
  tags: string[];
  status: ProductStatus;
  featured: boolean;
  isDigital: boolean;
  digitalDelivery?: {
    type: 'email' | 'download' | 'streaming';
    files?: string[];
    instructions?: string;
  };
  variants?: {
    name: string;
    options: {
      [key: string]: string;
    };
    price?: number;
    sku?: string;
    inventory?: number;
  }[];
  relatedProducts?: mongoose.Types.ObjectId[];
  reviews?: {
    averageRating: number;
    totalReviews: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Product schema
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  type: {
    type: String,
    enum: Object.values(ProductType),
    required: [true, 'Product type is required']
  },
  category: {
    type: String,
    enum: Object.values(ProductCategory),
    required: [true, 'Product category is required']
  },
  subcategory: {
    type: String,
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  price: {
    base: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative']
    },
    sale: {
      type: Number,
      min: [0, 'Sale price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'TWD', 'CNY', 'JPY', 'KRW']
    }
  },
  inventory: {
    quantity: {
      type: Number,
      required: [true, 'Inventory quantity is required'],
      min: [0, 'Inventory cannot be negative'],
      default: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
      min: [0, 'Low stock threshold cannot be negative']
    },
    trackInventory: {
      type: Boolean,
      default: true
    },
    allowBackorder: {
      type: Boolean,
      default: false
    }
  },
  images: {
    primary: {
      type: String,
      required: [true, 'Primary image is required']
    },
    gallery: [{
      type: String
    }],
    alt: {
      type: String,
      maxlength: [100, 'Alt text cannot exceed 100 characters']
    }
  },
  specifications: {
    type: Map,
    of: Schema.Types.Mixed
  },
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    weight: { type: Number, min: 0 },
    unit: { 
      type: String, 
      default: 'cm',
      enum: ['cm', 'in', 'kg', 'lb', 'g', 'oz']
    }
  },
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title cannot exceed 60 characters']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    slug: {
      type: String,
      required: [true, 'SEO slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    keywords: [{
      type: String,
      trim: true
    }]
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  status: {
    type: String,
    enum: Object.values(ProductStatus),
    default: ProductStatus.ACTIVE
  },
  featured: {
    type: Boolean,
    default: false
  },
  isDigital: {
    type: Boolean,
    default: false
  },
  digitalDelivery: {
    type: {
      type: String,
      enum: ['email', 'download', 'streaming']
    },
    files: [String],
    instructions: String
  },
  variants: [{
    name: {
      type: String,
      required: true
    },
    options: {
      type: Map,
      of: String
    },
    price: Number,
    sku: String,
    inventory: Number
  }],
  relatedProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  reviews: {
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for current price (sale price if available, otherwise base price)
productSchema.virtual('currentPrice').get(function() {
  return this.price.sale || this.price.base;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.price.sale && this.price.sale < this.price.base) {
    return Math.round(((this.price.base - this.price.sale) / this.price.base) * 100);
  }
  return 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (!this.inventory.trackInventory) return 'unlimited';
  if (this.inventory.quantity === 0) return 'out-of-stock';
  if (this.inventory.quantity <= this.inventory.lowStockThreshold) return 'low-stock';
  return 'in-stock';
});

// Virtual for availability
productSchema.virtual('isAvailable').get(function() {
  if (this.status !== ProductStatus.ACTIVE) return false;
  if (!this.inventory.trackInventory) return true;
  return this.inventory.quantity > 0 || this.inventory.allowBackorder;
});

// Indexes for performance (avoid duplicating indexes already defined via `unique` on paths)
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ status: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ 'price.base': 1 });
productSchema.index({ tags: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ 'reviews.averageRating': -1 });

// Text search index
productSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  'seo.keywords': 'text'
});

// Pre-save middleware to generate slug if not provided
productSchema.pre('save', function(next) {
  if (!this.seo.slug && this.name) {
    this.seo.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Static method to find active products
productSchema.statics.findActiveProducts = function() {
  return this.find({ status: ProductStatus.ACTIVE });
};

// Static method to find featured products
productSchema.statics.findFeaturedProducts = function() {
  return this.find({ featured: true, status: ProductStatus.ACTIVE });
};

// Static method to find products by category
productSchema.statics.findByCategory = function(category: ProductCategory) {
  return this.find({ category, status: ProductStatus.ACTIVE });
};

// Static method to search products
productSchema.statics.searchProducts = function(query: string) {
  return this.find({
    $text: { $search: query },
    status: ProductStatus.ACTIVE
  }, {
    score: { $meta: 'textScore' }
  }).sort({ score: { $meta: 'textScore' } });
};

export const Product = mongoose.model<IProduct>('Product', productSchema);
