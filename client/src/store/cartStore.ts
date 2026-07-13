import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../data/products';
import type { Order } from '../data/users';

export interface CartLine {
  key: string;
  id: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
  quantity: number;
}

export interface PlaceOrderInput {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  shippingMethod: string;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

interface CartState {
  items: CartLine[];
  lastOrder: Order | null;
  addItem: (product: Product, variant?: string, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  placeOrder: (input: PlaceOrderInput) => Order;
}

function makeKey(id: string, variant?: string): string {
  return `${id}::${variant ?? ''}`;
}

function paymentType(method: string): 'card' | 'paypal' | 'apple_pay' {
  if (method === 'paypal') return 'paypal';
  if (method === 'apple') return 'apple_pay';
  return 'card';
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      lastOrder: null,

      addItem: (product, variant, quantity = 1) => {
        const id = String(product.id);
        const chosenVariant = variant ?? product.colors?.[0];
        const key = makeKey(id, chosenVariant);

        set((state) => {
          const existing = state.items.find((item) => item.key === key);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.key === key
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }
          const line: CartLine = {
            key,
            id,
            name: product.name,
            price: product.price,
            image: product.image,
            variant: chosenVariant,
            quantity,
          };
          return { items: [...state.items, line] };
        });
      },

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((item) => item.key !== key) })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.key !== key)
              : state.items.map((item) =>
                  item.key === key ? { ...item, quantity } : item,
                ),
        })),

      clear: () => set({ items: [] }),

      placeOrder: (input) => {
        const { items } = get();
        const now = new Date();
        const deliveryDays = input.shippingMethod === 'express' ? 3 : 7;

        const address = {
          firstName: input.firstName,
          lastName: input.lastName,
          address1: input.address1,
          address2: input.address2,
          city: input.city,
          state: input.state,
          zipCode: input.zipCode,
          country: input.country,
          phone: input.phone,
        };

        const order: Order = {
          id: `SUNI-${now.getTime().toString().slice(-8)}`,
          guestEmail: input.email,
          status: 'processing',
          items: items.map((item) => ({
            productId: Number.isNaN(Number(item.id)) ? 0 : Number(item.id),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            variant: item.variant,
          })),
          subtotal: input.subtotal,
          tax: input.tax,
          shipping: input.shipping,
          total: input.total,
          shippingAddress: { id: 'ship-1', type: 'shipping', isDefault: true, ...address },
          billingAddress: { id: 'bill-1', type: 'billing', isDefault: true, ...address },
          paymentMethod: {
            id: 'pm-1',
            type: paymentType(input.paymentMethod),
            isDefault: true,
          },
          orderDate: now.toISOString().slice(0, 10),
          estimatedDelivery: new Date(now.getTime() + deliveryDays * 86_400_000)
            .toISOString()
            .slice(0, 10),
        };

        set({ lastOrder: order, items: [] });
        return order;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, lastOrder: state.lastOrder }),
    },
  ),
);
