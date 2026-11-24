import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState } from '../types/cart';
import { mapProductToCartItem } from '../utils/mapProductToCartItem';
import type { Product } from '../types/product';

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 101,
    title: { rendered: 'Насос циркуляционный Grundfos UPS 25-60' },
    link: '/catalog/101',
    featured_media: 1,
    price_html: '320.00 BYN',
    acf: { pump_power: 60, pump_head: 6, pump_flow: 3.5 },
    _embedded: { 'wp:featuredmedia': [] },
    price_data: {
      currency: 'BYN',
      price: '320',
      regular_price: '320',
    },
  },
  {
    id: 102,
    title: { rendered: 'Насос скважинный Pedrollo 4SR 2/13' },
    link: '/catalog/102',
    featured_media: 2,
    price_html: '650.00 BYN',
    acf: { pump_power: 750, pump_head: 85, pump_flow: 3.6 },
    _embedded: { 'wp:featuredmedia': [] },
    price_data: {
      currency: 'BYN',
      price: '650',
      regular_price: '700',
      sale_price: '650',
    },
  },
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }

          return {
            items: [...state.items, mapProductToCartItem(product, 1)],
          };
        }),

      incrementQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decrementQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'shopping-cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
