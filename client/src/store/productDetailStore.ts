import { create } from 'zustand';
import type { Product } from '../data/products';

interface ProductDetailState {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const useProductDetailStore = create<ProductDetailState>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
