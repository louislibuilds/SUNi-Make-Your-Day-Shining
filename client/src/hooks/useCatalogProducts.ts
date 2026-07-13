import { useEffect, useState } from 'react';
import {
  fetchCatalogProducts,
  fetchFeaturedProducts,
  type CatalogResult,
  type DataSource,
} from '../lib/catalogSource';
import type { Product } from '../data/products';

interface UseCatalogOptions {
  category?: string;
  featured?: boolean;
  limit?: number;
}

export function useCatalogProducts(options: UseCatalogOptions = {}) {
  const { category, featured = false, limit } = options;
  const [products, setProducts] = useState<Product[]>([]);
  const [source, setSource] = useState<DataSource>('mock');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const result: CatalogResult = featured
        ? await fetchFeaturedProducts(limit ?? 4)
        : await fetchCatalogProducts({ category, limit });

      if (!cancelled) {
        setProducts(result.products);
        setSource(result.source);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [category, featured, limit]);

  return { products, source, loading };
}
