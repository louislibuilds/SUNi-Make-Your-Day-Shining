import api from '../services/api';
import {
  products as mockProducts,
  categories as mockCategories,
  brands as mockBrands,
  type Product,
} from '../data/products';
import { resolveProductImage } from './media';

export type DataSource = 'api' | 'mock';

export interface CatalogResult {
  products: Product[];
  source: DataSource;
}

function apiRoot(): string {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  return base.replace(/\/api\/?$/, '');
}

export async function isApiReachable(): Promise<boolean> {
  try {
    const res = await fetch(`${apiRoot()}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApiProduct(raw: any): Product {
  const priceBase = raw.price?.base ?? raw.price ?? 0;
  const priceSale = raw.price?.sale;
  const rating = raw.reviews?.averageRating ?? raw.rating ?? 0;
  const reviewCount = raw.reviews?.totalReviews ?? raw.reviews ?? 0;

  return {
    id: raw._id ?? raw.id ?? String(Math.random()),
    name: raw.name ?? 'Product',
    price: priceSale ?? priceBase,
    originalPrice: priceSale ? priceBase : raw.originalPrice,
    rating,
    reviews: typeof reviewCount === 'number' ? reviewCount : 0,
    image: resolveProductImage(raw.images?.primary ?? raw.image),
    category: raw.category ?? 'Uncategorized',
    description: raw.description ?? raw.shortDescription ?? '',
    features: raw.features ?? raw.tags ?? [],
    inStock: (raw.inventory?.quantity ?? 1) > 0,
    isNew: raw.isNew,
    isBestSeller: raw.featured ?? raw.isBestSeller,
    colors: raw.colors ?? raw.variants?.map((v: { options?: Record<string, string> }) => v.options?.color).filter(Boolean),
    brand: raw.brand ?? raw.tags?.[0] ?? 'SUNi',
  };
}

export async function fetchCatalogProducts(options?: {
  category?: string;
  limit?: number;
}): Promise<CatalogResult> {
  const useMock = (): CatalogResult => ({
    products: mockProducts.map((p) => ({
      ...p,
      image: resolveProductImage(p.image),
    })),
    source: 'mock',
  });

  try {
    if (!(await isApiReachable())) {
      return useMock();
    }

    const params: Record<string, string> = {
      limit: String(options?.limit ?? 100),
      status: 'active',
    };
    if (options?.category && options.category !== 'All Products') {
      params.category = options.category;
    }

    const res = await api.get('/products', { params });
    const list = res.data?.data?.products;

    if (!res.data?.success || !Array.isArray(list) || list.length === 0) {
      return useMock();
    }

    return {
      products: list.map(mapApiProduct),
      source: 'api',
    };
  } catch {
    return useMock();
  }
}

export async function fetchFeaturedProducts(limit = 4): Promise<CatalogResult> {
  const useMock = (): CatalogResult => ({
    products: mockProducts
      .filter((p) => p.isBestSeller || p.isNew)
      .slice(0, limit)
      .map((p) => ({ ...p, image: resolveProductImage(p.image) })),
    source: 'mock',
  });

  try {
    if (!(await isApiReachable())) {
      return useMock();
    }

    const res = await api.get('/products/featured', { params: { limit } });
    const list = res.data?.data?.products;

    if (!res.data?.success || !Array.isArray(list) || list.length === 0) {
      return useMock();
    }

    return {
      products: list.map(mapApiProduct),
      source: 'api',
    };
  } catch {
    return useMock();
  }
}

export { mockCategories, mockBrands };
